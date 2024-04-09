import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { MusicIcon, PlusIcon } from "../Icons/Icons";
import { MoreIcon } from "../Icons/MoreIcon";
import { DisplaySong } from "./DisplaySongs";
import {RemoveIcon} from '../Icons/RemoveIcon';
import { ChoosePlaylist } from "../LibrarySection/ChoosePlaylist";
import { PopUpMessage } from "../../Animation/PopUpMessage";

const DisplayPlaylist = (props) => {

    const {playlistId} = useParams();
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const [user, setUser] = useState("");

    const [addStatus, setAddStatus] = useState(false);
    const [displayOption , setDisplayOption] = useState(false);
    const [songUri, setSongUri] = useState(null);
    const [songId, setSongId] = useState(null);

    const [confirmStatus, setConfirmStatus] = useState(false);
    const [userFollow, setUserFollow] = useState(false);
    const [showPop, setShowPop] = useState(false);
    

    const [showDeletePopMessage, setShowDeletePopMessage] = useState(false); 
    const user_token = window.localStorage.getItem("user_token");

    let intervalId;
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
            console.log(data);
        })
        .catch( (e) => {
            console.log(e.message);
        })

        /*Fetching the playlist details*/
        fetch (`https://api.spotify.com/v1/playlists/${playlistId}`, {
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
            setPlaylistDetails(data);
            console.log(data);
        })
        .catch ( (e) => {
            console.log(e.message);
        })

        /*For getting the user playlist follow status*/
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${user.id}`, {
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
            setUserFollow(data[0]);
            console.log(data[0]);
        })
        .catch( (e) => {
            console.log(e.message);
        })


    }, [playlistId, props.access_token]);

    const getDuration = (duration) => {
        const seconds = (( duration % 60000) / 1000).toFixed(0);

        if (seconds >= 10) 
            return (Math.floor( duration / 60000) + ":" + seconds);
        else 
            return (Math.floor( duration / 60000) + ":0" + seconds);

    }

    const deteleLibraryItem = () => {

        fetch (`https://api.spotify.com/v1/playlists/${playlistId}/followers`,{
            method: 'DELETE',
            headers: {
                'Authorization' :  `Bearer ${user_token}`
            }
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't delete playlist");
            }
            console.log("Playlist deleted");

            setShowPop(true);
            clearInterval(intervalId);
            intervalId = setInterval( () => {
                setShowPop(false);
                clearInterval(intervalId);
            }, 3000);
            
        })
        .catch( (e) => {
            console.log(e.message);
        })
        
        return () => {
            clearInterval(intervalId);
        }
    };

    const setTimeSlice = () => {

        setShowDeletePopMessage(true); /*For temporarily showing a success message*/
            intervalId = setTimeout( () => {
                setShowDeletePopMessage(false);
                clearInterval(intervalId);
            }, 3000);

    }

    const removeTrack = (trackId, trackIndex) => {

        setPlaylistDetails(prev => {
            const newItems = [...prev.tracks.items.slice(0, trackIndex), ...prev.tracks.items.slice(trackIndex + 1)];
            return{
                ...prev,
                tracks: {
                    ...prev.tracks,
                    items: newItems
                }
            }

        })
        fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${user_token}`
            }
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't delete data");
            }
            setTimeSlice();
            console.log("song deleted");
        })
        .catch( (e) => {
            console.log(e.message);
        })
    }

    const ModifyFollowStatus = () =>  {

        fetch (`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
            method: userFollow ? "DELETE" : "PUT",
            headers: {
                'Authorization' : `Bearer ${user_token}`,
            }
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't edit follow status");
            }
            setUserFollow(prev => !prev);
            console.log("Follow status edited");

        })
        .catch( (e) => {
            console.log(e.message);
        })

    }


    return (
        <div className=" w-full h-full mt-10 relative">
            
            <PopUpMessage display={showPop} message="Playlist removed" />
            <PopUpMessage display={showDeletePopMessage} message="song deleted" />
            {confirmStatus && <div className=" absolute flex justify-center items-center z-10 w-full h-full top-0 backdrop-blur-sm">
                <div className=" w-8/12 h-1/5 flex flex-col items-center justify-center gap-4 spotify-component-bg-color ">
                    <h1 className=" text-center text-sm ">Do you want to delete "{playlistDetails.name}" ? </h1>
                    <div className=" w-full flex justify-around text-black font-semibold">
                        <button className=" w-20 h-8 rounded-lg bg-red-600 text-xs" onClick={() => {
                            setConfirmStatus(false);
                        }}>Cancel</button>
                        <button className=" w-20 h-8 rounded-lg spotify-green-bg-color text-xs" onClick={() => {
                            deteleLibraryItem();
                            setConfirmStatus(false);
                        }}>Delete</button>
                    </div>
                </div>
            </div>}

            { playlistDetails && <div className="artist-image w-full h-4/12 flex flex-col items-center p-4  sm:flex-row">
                    {playlistDetails.images.length > 0  ? <img src={playlistDetails.images[0].url} className = " w-40 h-40 sm:w-52 sm:h-52 rounded-lg" alt="playlist-view"></img> : <MusicIcon />}
                    <div className="artist-details w-full items-center sm:items-start sm:ml-6 flex flex-col overflow-hidden mt-1">
                        <span className="text-3xl sm:text-4xl  text-ellipsis">{playlistDetails.name}</span>
                        <span className="text-xl">{playlistDetails.followers.total} followers 
                        <span style={{fontWeight: 'bolder', fontSize: '30px', marginLeft : '4px', marginRight : '4px'}}>.</span>
                        {playlistDetails.tracks.total} songs
                        </span>
                    </div>
                </div>}
            
            {displayOption && user && <ChoosePlaylist songUri={songUri} songId={songId} userId={user.id} setDisplayOption={setDisplayOption} />}
            {addStatus && <DisplaySong user={user} playlistId={playlistId} setAddStatus={setAddStatus}/>}
            {playlistDetails && <div className=" flex  w-full h-12 p-4 ">
                {(playlistDetails.owner.id === user.id) && <div className=" flex items-center gap-4 opacity-60">
                    <span onClick={() => {
                        setAddStatus(true);
                    }}><PlusIcon /></span>
                    <span><MoreIcon /></span>
                    {(playlistDetails.owner.id === user.id ) && <span onClick={() => {
                        setConfirmStatus(true);
                    }}><RemoveIcon /></span>}
                </div>}


                {playlistDetails.owner.id !== user.id && <div className=" flex h-12 p-4">
                    <button className=" w-20 p-2 h-8 border border-white rounded-md font-semibold text-xs button-ani" 
                    style={{
                        borderColor: userFollow ? "rgb(256, 256, 256)" : "rgb(256, 256, 256 , 0.4)",
                    }} 
                    onClick={() => {ModifyFollowStatus()}}>
                        <span>{userFollow ? "Following" : "Follow"}</span>
                    </button>
                </div>}
            </div>}
            
                


            { playlistDetails && <div className="song-list p-6">
                <div className="heading-section">
                <div className="id">#</div>
                <div className="title">Title</div>
                <div className="album-name">Album</div>
                <div className="duration">Duration</div>
                </div>
              {playlistDetails.tracks.items.map( (eachSong, index) => (
                <div 
                className="each-song-details" tabIndex={index}
                >
                  <div className="id">
                    <img src={eachSong.track.album.images[0].url} alt="cover-page" loading="lazy" width={40}></img>
                  </div>
                  <div className="title flex flex-col">
                    <div className=" whitespace-nowrap text-ellipsis overflow-hidden">{eachSong.track.name}</div>
                    <div className=" text-slate-100 opacity-70 hover:opacity-100">{eachSong.track.artists[0].name}</div>
                  </div>
                  <div className="album-name">{eachSong.track.album.name}</div>
                  <div className="duration flex gap-6">{getDuration(eachSong.track.duration_ms)}
                    <div className=" flex items-center justify-center gap-2">
                        <span onClick={() => {
                            setSongUri(eachSong.track.uri);
                            setSongId(eachSong.track.id)
                            setDisplayOption(true);
                        }}><PlusIcon /></span>
                        <span
                        onClick={() => {
                            removeTrack(eachSong.track.id, index);
                        }}><RemoveIcon /></span>
                    </div>
                  </div>
                </div>
                
              ))}
            
          </div>}

        </div>
    );
}

export default DisplayPlaylist;