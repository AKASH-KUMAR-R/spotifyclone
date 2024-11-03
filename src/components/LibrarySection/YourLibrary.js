import { useContext, useEffect, useState } from "react";
import { MusicIcon, PlusIcon, SearchIcon, UserIcon } from "../Icons/Icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CreatePlaylist } from "./CreatePlaylist";
import LoginContext from "../ContestLogin/LoginDetails";


export const YourLibrary = () => {

    const [playlist, setPlaylist] = useState(null);
    const [album, setAlbum] = useState(null);
    const [createStatus, setCreateStatus] = useState(false);
    const [user, setUser] = useState("");

    const {isLogIn} = useContext(LoginContext);

    

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
            setPlaylist(data);
            console.log(playlist);
        })
        .catch( (e) => {
            console.log(e.message);
        })

        fetch('https://api.spotify.com/v1/me/albums', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_token}`
            }
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Can't fetch user albums");
            }
            console.log("fetched successfully");
            return res.json();
        })
        .then( (data) => {
            setAlbum(data);
            console.log(data);
        })
        .catch( (e) => {
            console.log(e.message);
        })

    }, []);



    

    return (
        <main className=" w-full h-5/6  mt-12 flex flex-col items-center sm:hidden  overflow-y-auto">
            <CreatePlaylist user={user} createStatus={createStatus} setCreateStatus={setCreateStatus} />
            
                <header className=" box-shadow-bottom flex justify-between w-full h-20  p-4 ">
                    <div className=" flex items-center h-full gap-2">
                        <div className=" flex justify-center items-center rounded-full bg-orange-400 w-10 h-10 border-solid border border-black">
                            <UserIcon />
                        </div>
                        <span className=" text-xl font-extrabold">Your Library</span>
                    </div>
                    <div className=" flex items-center gap-4">
                        <SearchIcon />
                        <span onClick={() => {setCreateStatus(true)}}><PlusIcon /></span>
                    </div>
                </header>

            {!isLogIn && <div className=" w-full p-6 text-center font-bold">
                <p className=" text-2xl mb-2">Login to Access Your Library</p>
                <p className=" text-sm">Sign in to explore your favorite music and playlists</p>   
            </div>}
            {playlist && <section className=" p-2 w-full flex flex-col gap-2 ">
                {playlist.items.map((eachItem, index) => (
                    <Link to={`/playlist/${eachItem.id}`} ><div 
                    key={index}
                    className=" flex items-center gap-2 w-full h-20">
                        <div className=" min-w-16 min-h-16  ">
                            {eachItem.images && <img src={eachItem.images[0].url} alt="cover-page" className=" w-16 h-16">
                            </img>}
                            {!eachItem.images && <MusicIcon />}
                        </div>
                        <div className=" flex flex-col justify-center w-10/12">
                            <span className=" text-lg overflow-hidden text-ellipsis whitespace-nowrap">{eachItem.name}</span>
                            <span className=" text-sm opacity-55 -mt-2">{(eachItem.type.charAt(0)).toUpperCase() + eachItem.type.slice(1)}
                            <span className=" text-xl font-extrabold ml-1 mr-1 ">.</span>
                            <span className="">{eachItem.owner.display_name}</span></span>
                        </div>
                    </div>
                    </Link>
                ))}
            </section>}

            {album && <section className=" w-full flex flex-col p-2 gap-2">
                {album.items.map((eachItem, index) => (
                    <Link to={`/album/${eachItem.album.id}`} ><div 
                    key={index}
                    className=" flex items-center gap-2 w-full h-20">
                        <div className=" min-w-16 min-h-16  ">
                            {eachItem.album.images && <img src={eachItem.album.images[0].url} alt="cover-page" className=" w-16 h-16">
                            </img>}
                            {!eachItem.album.images && <MusicIcon />}
                        </div>
                        <div className=" flex flex-col justify-center w-10/12">
                            <span className=" text-lg  overflow-hidden text-ellipsis whitespace-nowrap">{eachItem.album.name}</span>
                            <span className=" text-sm opacity-55 -mt-2">{(eachItem.album.type.charAt(0)).toUpperCase() + eachItem.album.type.slice(1)}
                            <span className=" text-xl font-extrabold ml-1 mr-1 ">.</span>
                            <span className="">{eachItem.album.artists[0].name}</span></span>
                        </div>
                    </div>
                    </Link>
                ))}
            </section>}
            
        </main>
    );
}