import { useEffect, useState } from "react";
import { CloseIcon, PlusIcon } from "../Icons/Icons";


export const DisplaySong = ({user, playlistId, setAddStatus}) => {

    const [recTracl, setRecTrack] = useState(null);
    const user_token = window.localStorage.getItem("user_token");

    const addSong = (songIndex, uris) => {

        setRecTrack(prev => {
            const newTracks = [...prev.items.slice(0, songIndex), ...prev.items.slice(songIndex + 1)];
            return{...prev, items: newTracks};
        });

        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user_token}`,
            },
            body: JSON.stringify({
                uris: [uris]
            })
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't add song ");
            }
            console.log("song added");
        })
        .catch( (e) => {
            console.log(e.message);
        })
    };

    useEffect ( () => {

        fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=24`,{
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
            setRecTrack(data);
        })
        .catch( (e) => {
            console.log(e.message);
        })

    }, [user_token]);


    

 
    return(
        <div className=" fixed z-10 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex p-4 justify-center items-center sm:min-w-fit w-11/12 sm:w-4/12 h-3/4  bg-zinc-900  rounded-lg">
            <span className=" absolute left-2 top-2" onClick={() => {
                setAddStatus(false);
            }}><CloseIcon /></span>
            <div className=" flex flex-col gap-4 w-full h-full p-4 overflow-y-auto">
                <h1 className=" font-bold text-lg">Recently played</h1>
                    {recTracl && recTracl.items.map( (eachItem, index) => (
                        <div className=" w-full grid grid-cols-8  " key={index + "" + eachItem.track.id}>
                            <div className=" flex gap-4 col-span-6">
                                <img src={eachItem.track.album.images[0].url} alt="cover-page"  width={40} className=" min-w-10"></img>
                                <div className=" w-full flex flex-col col-span-4 text-twoline-wrap ">
                                <div><span className=" text-sm">{eachItem.track.name}</span></div>
                                <div><span className=" text-xs opacity-60">{eachItem.track.artists[0].name}</span></div>
                            </div>
                            </div>
                            
                            <div onClick={() => {
                                addSong(index, eachItem.track.uri);
                            }}
                            className=" w-full flex justify-center items-center">{<PlusIcon />}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
}