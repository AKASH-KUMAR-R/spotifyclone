import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { MusicIcon, PlusIcon } from "./Icons/Icons";
import { MoreIcon } from "./Icons/MoreIcon";
import { DisplaySong } from "./DisplaySongs";
import {RemoveIcon} from './Icons/RemoveIcon';
import { ChoosePlaylist } from "./ChoosePlaylist";

const DisplayPlaylist = (props) => {

    const {playlistId} = useParams();
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const [user, setUser] = useState("");

    const [addStatus, setAddStatus] = useState(false);
    const [displayOption , setDisplayOption] = useState(false);
    const [songId, setSongId] = useState(null);

    const [confirmStatus, setConfirmStatus] = useState(false);

    useEffect( () => {
        const user_token = window.localStorage.getItem("user_token");

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

    }, [playlistId, props.access_token]);

    const getDuration = (duration) => {
        const seconds = (( duration % 60000) / 1000).toFixed(0);

        if (seconds >= 10) 
            return (Math.floor( duration / 60000) + ":" + seconds);
        else 
            return (Math.floor( duration / 60000) + ":0" + seconds);

    }

    const deteleLibraryItem = (deleteId, type) => {

        
    }

    return (
        <div className=" w-full h-full mt-10 relative">
            
            {confirmStatus && <div className=" absolute flex justify-center items-center z-10 w-full h-full top-0 backdrop-blur-sm">
                <div className=" w-8/12 h-1/5 flex flex-col items-center justify-center gap-4 spotify-component-bg-color ">
                    <h1 className=" text-center text-sm ">Do you want to delete "{playlistDetails.name}" ? </h1>
                    <div className=" w-full flex justify-around text-black font-semibold">
                        <button className=" w-20 h-8 rounded-lg bg-red-600 text-xs" onClick={() => {
                            setConfirmStatus(false);
                        }}>Cancel</button>
                        <button className=" w-20 h-8 rounded-lg spotify-green-bg-color text-xs" onClick={() => {
                            deteleLibraryItem(playlistDetails.id, "playlist");
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
            
            {user && displayOption && <ChoosePlaylist songId={songId} userId={user.id} setDisplayOption={setDisplayOption} />}
            {addStatus && <DisplaySong user={user} playlistId={playlistId} setAddStatus={setAddStatus}/>}
            {playlistDetails && (playlistDetails.owner.id === user.id) && <div className=" flex  w-full h-12 p-4 ">
                <div className=" flex items-center gap-4 opacity-60">
                    <span onClick={() => {
                        setAddStatus(true);
                    }}><PlusIcon /></span>
                    <span><MoreIcon /></span>
                    {(playlistDetails.owner.id === user.id ) && <span onClick={() => {
                        setConfirmStatus(true);
                    }}><RemoveIcon /></span>}
                </div>
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
                    <img src={eachSong.track.album.images[0].url} loading="lazy" width={40}></img>
                  </div>
                  <div className="title flex flex-col">
                    <div className=" whitespace-nowrap text-ellipsis overflow-hidden">{eachSong.track.name}</div>
                    <div className=" text-slate-100 opacity-70 hover:opacity-100">{eachSong.track.artists[0].name}</div>
                  </div>
                  <div className="album-name">{eachSong.track.album.name}</div>
                  <div className="duration flex gap-6">{getDuration(eachSong.track.duration_ms)}
                    <div className=" flex items-center justify-center gap-2">
                        <span onClick={() => {
                            setSongId(eachSong.track.uri);
                            setDisplayOption(true);
                        }}><PlusIcon /></span>
                    </div>
                  </div>
                </div>
                
              ))}
            
          </div>}

        </div>
    );
}

export default DisplayPlaylist;