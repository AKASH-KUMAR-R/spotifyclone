import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ExtractColorFromImage from "../ExtractColorFromImage";
import { PlusIcon } from "../Icons/Icons";
import { ChoosePlaylist } from "../LibrarySection/ChoosePlaylist";

const DisplayAlbum = (props) => {

    const {albumId} = useParams();
    const [albumDetails, setAlbumDetails] = useState(null);
    const [color,setColor] = useState(null);

    const [follow, setFollowStatus] = useState(null);
    const [user, setUser] = useState(null);

    const [songUri, setSongUri] = useState(null);
    const [songId, setSongId] = useState(null);
    const [displayOption, setDisplayOption] = useState(null);

    const user_token = window.localStorage.getItem("user_token");

    useEffect( () => {

        /*Fetching the user details*/
        fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_token}`,
            }
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't fetch user details");
            }

            console.log("user details fetched");
            return res.json();
        })
        .then( (data) => {
            setUser(data);
        })
        .catch( (e) => {
            console.log(e.message);
        })

        fetch ( `https://api.spotify.com/v1/albums/${albumId}`, {
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${props.access_token}`,
            }
        })
        .then ( (res) => {
            if (!res.ok) {
                throw new Error('Failed to feetch album details');
            }
            return res.json();
        })
        .then ( (data) => {
            setAlbumDetails(data);
        })
        .catch ( (e) => {
            console.log(e.message);
        })

        getFollowStatus();
    }, [albumId, props.access_token]);

    const getDuration = (duration) => {
        const seconds = (( duration % 60000) / 1000).toFixed(0);

        if (seconds >= 10) 
            return (Math.floor( duration / 60000) + ":" + seconds);
        else 
            return (Math.floor( duration / 60000) + ":0" + seconds);

    }

    const ModifyFollowStatus = () => {

        if (follow) {
            UnfollowAlbum();
        } else {
            FollowAlbum();
        }

    }

    const UnfollowAlbum = () => {
        
        fetch (`https://api.spotify.com/v1/me/albums?ids=${albumId}`, {
            method:"DELETE",
            headers: {
                'Authorization' : `Bearer ${user_token}`,
            }
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't unfollow album");
            }
            console.log("Follow status edited");
            setFollowStatus(false);
        })
        .catch( (e) => {
            console.log(e.message);
        })

    };

    const FollowAlbum = () =>  {

        fetch (`https://api.spotify.com/v1/me/albums?ids=${albumId}`, {
            method:"PUT",
            headers: {
                'Authorization' : `Bearer ${user_token}`,
            }
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't follow album");
            }
            console.log("Follow status edited");
            setFollowStatus(true);
        })
        .catch( (e) => {
            console.log(e.message);
        })

    }

    const getFollowStatus = () => {

        fetch(`https://api.spotify.com/v1/me/albums/contains?ids=${albumId}`, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${user_token}`,
            }
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't get follow status");
            }
            console.log("follow status got");
            return res.json();
        })
        .then( (data) => {
            setFollowStatus(data[0]);
        })
        .catch( (e) => {
            console.log(e.message);
        })

    };

    return (
        <div className="temp-section mt-10">
            {displayOption && user && <ChoosePlaylist songUri={songUri} songId={songId} userId={user.id} setDisplayOption={setDisplayOption} />}
            {/*Header section for the album page.*/}
            { albumDetails && <div className="artist-image w-full h-4/12 flex flex-col items-center p-4  sm:flex-row" style={ {
                backgroundColor: `${color}`,
                backdropFilter: `blur(10px)`,
            }}>
                 
                {/*To extract prominent colors from the image using some fixed points */}
                <ExtractColorFromImage imageUrl={albumDetails.images[0].url} setColor={setColor}/>
                
                    <img src={albumDetails.images[0].url} alt="cover page" className=" w-40 h-40 sm:w-52 sm:h-52 rounded-lg"></img>
                    <div className="artist-details w-full items-center sm:items-start sm:ml-6 flex flex-col overflow-hidden mt-1">
                        <span className=" text-3xl sm:text-4xl  text-ellipsis">{albumDetails.name}</span>
                        <span className=" text-xl">{albumDetails.artists[0].name}
                        <span style={{fontWeight: 'bolder', marginLeft : '4px', marginRight : '4px'}}>.</span>
                        {(albumDetails.release_date).slice(0, 4)}
                        <span style={{fontWeight: 'bolder', marginLeft : '4px', marginRight : '4px'}}>.</span>
                        {albumDetails.total_tracks} songs
                        </span>
                    </div>
                </div>}

                <div className=" flex h-12 p-4">
                    <button className=" w-20 p-2 h-8 border border-white rounded-md font-semibold text-xs button-ani" 
                    style={{
                        borderColor: follow ? "rgb(256, 256, 256)" : "rgb(256, 256, 256 , 0.4)",
                    }} 
                    onClick={() => {ModifyFollowStatus()}}>
                        <span>{follow ? "Following" : "Follow"}</span>
                    </button>
                </div>
                

            { albumDetails && <div className="song-list p-6">
                <div className="heading-section">
                <div className="id">#</div>
                <div className="title">Title</div>
                <div className="album-name">Artist</div>
                <div className="duration">Duration</div>
                </div>
              {albumDetails.tracks.items.map( (eachSong, index) => (
                <div 
                className="each-song-details"
                key={index}
                >
                  <div className="id">{index + 1}</div>
                  <div className="title">{eachSong.name}</div>
                  <div className="album-name">{eachSong.artists[0].name}</div>
                  <div className="duration flex gap-2">
                    <span>{getDuration(eachSong.duration_ms)}</span>
                    <span onClick={ () => {
                        setSongUri(eachSong.uri);
                        setSongId(eachSong.id);
                        setDisplayOption(true);
                    }}><PlusIcon /></span>
                  </div>
                </div>
              ))}
            
          </div>}

        </div>
    );
}

export default  DisplayAlbum;