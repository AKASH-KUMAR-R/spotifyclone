import { useEffect, useState } from "react";
import { CloseIcon, HistoryIcon, PlusIcon, ZapIcon } from "./Icons/Icons";


export const SlideLibrary = ({showLibrary}) => {

    const [user, setUser] = useState("");
    const [createStatus, setCreateStatus] = useState(false);

    const [newPlaylist, setNewPlaylist] = useState({
        name: "",
        description: "",
        public: false,
    });



    useEffect( () => {
        const access_token = window.localStorage.getItem("user_token");

        fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
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

    }, []);

    const createPlayList = () => {
        console.log(newPlaylist);

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
            setCreateStatus(false);
            console.log("Playlist created successfully");
        })
        .catch( (e)=> {
            console.log(e);
        })
    }

    return (
        <div className={"slide-effect flex flex-col  z-10 w-screen h-screen p-4 m-0 gap-4 absolute top-14 bg-black sm:hidden " + (showLibrary ? " left-0" : " -left-full")}>
            <div className=" w-11/12 h-4/5 flex justify-center items-center absolute z-10 backdrop-blur-sm  "
            style={{
                display: createStatus? "flex": "none",
            }}>
                <div className="spotify-component-bg-color relative  w-11/12 flex flex-col items-center justify-center p-2  gap-3  rounded-lg "
                >   
                <span className=" absolute left-2 top-2" onClick={() => {setCreateStatus(false)}}><CloseIcon /></span>
                    <h1 className=" text-xl font-bold">New Playlist</h1>
                    <input 
                    type="text" 
                    placeholder="Playlist Name" 
                    className=" w-10/12 h-10 bg-transparent p-2 rounded-md outline-1 focus:outline-slate-400 "
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
                    className=" w-10/12 h-10 bg-transparent p-2 rounded-md outline-1 focus:outline-slate-400 "
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
                </div>
            </div>
            <div className="spotify-component-bg-color w-full h-12 p-2 flex items-center gap-2 rounded-lg cursor-pointer" onClick={() => {setCreateStatus(true)}}>
                <PlusIcon /><span className=" font-semibold">Create New Playlist</span>
            </div>
            <div className="spotify-component-bg-color w-full h-12 p-2 flex items-center gap-2  rounded-lg">
                <ZapIcon /><span className=" font-semibold">What's New</span>
            </div>
            <div className="spotify-component-bg-color w-full h-12 p-2 flex items-center gap-2  rounded-lg">
                <HistoryIcon /><span className=" font-semibold">Listening History</span>
            </div>
        </div>
    );
}