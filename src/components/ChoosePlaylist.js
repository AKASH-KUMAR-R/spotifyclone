import { useEffect, useState } from "react";
import { CloseIcon, MusicIcon, PlusIcon } from "./Icons/Icons";
import { PopUpMessage } from "../Animation/PopUpMessage";
import image from "./LikedSongCoverPage.png";

export const ChoosePlaylist = ({songId, songUri,userId, setDisplayOption}) => {

    const [playlist, setPlaylist] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);

    const user_token = window.localStorage.getItem("user_token");
    let intervalId; 

    const setTimeSlice = () => {

        setShowPopUp(true); /*For temporarily showing a success message*/
            intervalId = setTimeout( () => {
                setShowPopUp(false);
                clearInterval(intervalId);
            }, 3000);

    }

    const addSong = (playlistId) => {

        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user_token}`,
            },
            body: JSON.stringify({
                uris: [songUri]
            })
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't add song ");
            }
            console.log("song added");
            clearInterval(intervalId);
            setTimeSlice();

        })
        .catch( (e) => {
            console.log(e.message);
        })
    };

    const addToCollection = () => {

        fetch(`https://api.spotify.com/v1/me/tracks?ids=${songId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user_token}`,
            },
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't add song ");
            }
            console.log("song added");

            clearInterval(intervalId);
            setTimeSlice();
        })
        .catch( (e) => {
            console.log(e.message);
        })
    }

    useEffect ( () => {
        

        fetch('https://api.spotify.com/v1/me/playlists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_token}`
            }
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't fetch user playlist");
            }
            console.log("fetched successfully");
            return res.json();
        })
        .then( (data) => {
            setPlaylist(data.items.filter( (eachPlaylist) => (eachPlaylist.owner.id === userId)));
        })
        .catch( (e) => {
            console.log(e.message);
        })

        return () => {
            clearInterval(intervalId);
        }
    }, [user_token])

    return (

        <main className=" w-full h-full  p-4  fixed z-10 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4  bg-black">

            {/*Display a pop up message after successfull insertion of song */}
            <PopUpMessage display={showPopUp} message="Song added" />

            <section className=" flex flex-col gap-4">
                <h1 className=" text-center text-xl font-semibold">Add to playlist</h1>
                {playlist && <div className=" mt-4 flex flex-col  p-2 gap-4 w-full">
                    <div className=" flex justify-between gap-4 w-full">
                           <div className=" flex gap-4 justify-center"> 
                                <img src={image} width={60} className=" rounded-md"></img>
                                <div className=" flex">
                                    <div className=" text-lg font-bold">LikedSong</div>
                                </div>
                            </div>
                            <div className=" flex items-center cursor-pointer" onClick={() => {
                                addToCollection();
                            }}><PlusIcon /></div>                          
                    </div>
                    {playlist.map( (eachPlaylist, index) => (
                        <div className=" flex justify-between gap-4 w-full " key={index + " " + eachPlaylist.id}>
                           <div className=" flex gap-4 justify-center"> 
                                {eachPlaylist.images ? <img src={eachPlaylist.images[0].url} width={60} className=" rounded-md"></img> : <MusicIcon />}
                                <div className=" flex flex-col justify-center">
                                    <div className=" text-lg font-bold">{eachPlaylist.name}</div>
                                    <div className=" opacity-60">{eachPlaylist.tracks.total} songs</div>
                                </div>
                            </div>
                            <div className=" flex items-center cursor-pointer" onClick={() => {
                                addSong(eachPlaylist.id);
                            }}><PlusIcon />
                            </div>                          
                        </div>
                    ))}
                </div>}
                <div className=" w-full flex  justify-center">
                    <button 
                    className=" w-28 h-10 spotify-green-bg-color rounded-2xl text-md font-semibold text-black hover:scale-95 transition-all duration-200 active:scale-90" onClick={() => {
                        setDisplayOption(prev => !prev);
                    }}>Done</button>
                </div>
            </section>
        </main>
    );
}