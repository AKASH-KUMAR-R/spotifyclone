import { useState } from "react";
import { CloseIcon, LoadingIcon } from "./Icons/Icons";

export const CreatePlaylist = ({ user, createStatus, setCreateStatus}) => {

    const [newPlaylist, setNewPlaylist] = useState({
        name: "",
        description: "",
        public: false,
    });

    const [status, setStatus] = useState({
        pending: false,
        error: false,
    });

    const createPlayList = () => {
        console.log(newPlaylist);
        if ((newPlaylist.name.trim() === "") || (newPlaylist.description.trim() === "")) {
            return;
        }

        setStatus(prev => ({
            ...prev,
            pending: true,
        }));

        const user_token = window.localStorage.getItem('user_token');

        fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`,{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${user_token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newPlaylist),
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't create playlist");
            }

            setStatus(prev => ({
                ...prev,
                error: false,
                pending: false,
            }));
            setCreateStatus(false);
            console.log("Playlist created successfully");
        })
        .catch( (e)=> {
            setStatus(prev => ({
                ...prev,
                error: true,
                pending: false,
            }));
            console.log(e);
        })
    }

    return (
        <main className=" w-full h-full flex justify-center items-center absolute z-10 backdrop-blur-sm  "
            style={{
                display: createStatus ? "flex": "none",
            }}>
                {status.pending && <LoadingIcon className=" absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-20" />}
                <section className="spotify-component-bg-color relative  w-11/12 flex flex-col items-center justify-center p-2  gap-3  rounded-lg ">   
                    <span className=" absolute left-2 top-2" onClick={() => {setCreateStatus(false)}}><CloseIcon /></span>
                        <h1 className=" text-xl font-bold">New Playlist</h1>
                        <input 
                        type="text" 
                        placeholder="Playlist Name" 
                        className=" w-10/12 h-10  bg-black p-2 rounded-md outline-1 focus:outline-zinc-700"
                        value={newPlaylist.name}
                        onChange={(event) => {
                            setNewPlaylist(prev => ({
                                ...prev,
                                name: event.target.value
                            }));
                        }}
                        ></input>
                        <input 
                        type="text" 
                        placeholder="Description" 
                        className=" w-10/12 h-10 bg-black p-2 rounded-md outline-1 focus:outline-zinc-700 "
                        value={newPlaylist.description}
                        onChange={(event) => {
                            setNewPlaylist(prev => ({
                                ...prev,
                                description: event.target.value
                            }))
                        }}
                        ></input>
                        <div className=" w-10/12 flex items-center gap-4 p-2">
                            <label htmlFor="mode" className=" opacity-50">Make Public?</label>
                            <input 
                            type="checkbox" 
                            id="mode"
                            checked={newPlaylist.public}
                            onChange={(event) => {
                                setNewPlaylist(prev => ({
                                    ...prev,
                                    public: event.target.checked,
                                }))
                            }}></input>
                        </div>

                        <button 
                        className=" w-40 h-8 spotify-green-bg-color rounded-lg text-black font-semibold transition-all duration-75  active:scale-95"
                        onClick={() => {
                            createPlayList();
                        }}>Create Playlist</button>
                </section>
            </main>
    );
}