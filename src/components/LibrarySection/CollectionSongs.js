import { useEffect, useState } from "react";
import { MoreIcon } from "../Icons/MoreIcon";
import { ChoosePlaylist } from "./ChoosePlaylist";
import { PopUpMessage } from "../../Animation/PopUpMessage";
import image from "../LikedSongCoverPage.png";
import { BottomUpMenu } from "../../Animation/BottomUpMenu";

export const CollectionSongs = () => {

    const [likedSongs, setLikedSongs] = useState(null);
    const user_token = window.localStorage.getItem("user_token");
    const [user, setUser] = useState(null);

    const [songUri, setSongUri] = useState(null);
    const [songId, setSongId] = useState(null);
    const [songIndex, setSongIndex] = useState(null);

    const [displayOption , setDisplayOption] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showPop, setShowPopUp] = useState(false);
    
    let intervalId;


    const getDuration = (duration) => {
        const seconds = (( duration % 60000) / 1000).toFixed(0);

        if (seconds >= 10) 
            return (Math.floor( duration / 60000) + ":" + seconds);
        else 
            return (Math.floor( duration / 60000) + ":0" + seconds);

    }

    const setTimeSlice = () => {

        setShowPopUp(true); /*For temporarily showing a success message*/
            intervalId = setTimeout( () => {
                setShowPopUp(false);
                clearInterval(intervalId);
            }, 3000);

    }
    const removeSavedTrack = () => {

        fetch(`https://api.spotify.com/v1/me/tracks?ids=${songId}`, {
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

        updateTrack();
    }

    const updateTrack = () => {
        setLikedSongs(prev => {
            const newItems = [...prev.items.slice(0, songIndex), ...prev.items.slice(songIndex + 1)];
            return{
                ...prev,
                items: newItems
            }

        })
    };


    useEffect( () => {
        /*Fetching user details */
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

       
    }, [user_token]);

    useEffect( () => {
        /*Getting User saved tracks */
        if (user) {
            fetch(`https://api.spotify.com/v1/me/tracks?ids=${user.id}`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user_token}`,
                }
            })
            .then( (res) => {
                if (!res.ok) {
                    throw new Error("Can't fetch user tracks");
                }
    
                console.log("user tracks fetched");
                return res.json();
            })
            .then( (data) => {
                setLikedSongs(data);
                console.log(data);
            })
            .catch( (e) => {
                console.log(e.message);
            })
        }
        
    }, [user]);

    
    return (
        <div className=" w-full mt-10 pb-16 sm:p-0 overflow-hidden relative ">
            <PopUpMessage display={showPop} message="song removed" />
            { likedSongs && <div className="artist-image w-full h-4/12 flex flex-col items-center p-4  sm:flex-row">
                    <img src={image} className = " w-40 h-40 sm:w-52 sm:h-52 rounded-lg" alt="playlist-view"></img>
                    <div className="artist-details w-full items-center sm:items-start sm:ml-6 flex flex-col overflow-hidden mt-1">
                        <span className="text-3xl sm:text-4xl  text-ellipsis">Liked Songs</span>
                        <span className="text-xl opacity-60">{likedSongs.total} songs
                        </span>
                    </div>
                </div>}
                

                {displayOption && user && <ChoosePlaylist songUri={songUri} userId={user.id} setDisplayOption={setDisplayOption} />}

                { likedSongs && <div className="song-list h-auto p-2 sm:p-6 ">
                <div className="heading-section">
                <div className="id">#</div>
                <div className="title">Title</div>
                <div className="album-name">Album</div>
                <div className="duration">Duration</div>
                </div>
              {likedSongs.items.map( (eachSong, index) => (
                <div 
                className="each-song-details" key={eachSong.track.id + "" + index}
                >
                  <div className="id">
                    <img src={eachSong.track.album.images[0].url} alt="cover-page" loading="lazy" width={40}></img>
                  </div>
                  <div className="title flex flex-col">
                    <div className=" whitespace-nowrap text-ellipsis overflow-hidden">{eachSong.track.name}</div>
                    <div className=" text-slate-100 opacity-70 hover:opacity-100">{eachSong.track.artists[0].name}</div>
                  </div>
                  <div className="album-name">{eachSong.track.album.name}</div>
                  <div className="duration flex gap-2">{getDuration(eachSong.track.duration_ms)}
                  <div className=" cursor-pointer active:scale-95 duration-100"
                    onClick={() => {
                        setShowMenu( prev => !prev);
                        setSongUri(eachSong.track.uri);
                        setSongId(eachSong.track.id);
                        setSongIndex(index);
                    }}>
                        <MoreIcon />
                    </div>
                  </div>
                </div>
                
              ))}
            
          </div>}

          {user  && <div className="fixed left-2/4 -translate-x-2/4 translate-y-full  bottom-0 w-full sm:w-2/4 h-1/2 block">
                <BottomUpMenu 
                    songUri={songUri}
                    displayMenu={showMenu} 
                    setShowMenu={setShowMenu}
                    userId={true}
                    ownerId={true}
                    removeTrack={removeSavedTrack}
                    setDisplayOption={setDisplayOption}
                />
            </div>}
        </div>
    );
}