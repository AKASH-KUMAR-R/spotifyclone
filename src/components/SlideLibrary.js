import { useEffect, useState } from "react";
import { HistoryIcon, PlusIcon, ZapIcon } from "./Icons/Icons";


export const SlideLibrary = ({showLibrary}) => {

    const [user, setUser] = useState("");



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
        })
        .catch( (e) => {
            console.log(e.message);
        })

    }, []);

    const createPlayList = () => {

    }

    return (
        <div className={"slide-effect flex flex-col  z-10 w-screen h-screen p-4 m-0 gap-4 absolute top-14 bg-black sm:hidden " + (showLibrary ? " left-0" : " -left-full")}>
            <div className=" w-11/12 h-4/5 flex justify-center items-center absolute z-10 backdrop-blur-sm  ">
                <div className="spotify-component-bg-color w-11/12 flex flex-col items-center  gap-4  rounded-md ">
                    <h1 className=" text-xl font-bold">New Playlist</h1>
                    <input 
                    type="text" 
                    placeholder="Playlist Name" 
                    className=" w-10/12 h-10 bg-transparent  rounded-md"
                    ></input>
                     <input 
                    type="text" 
                    placeholder="Description" 
                    className=" w-10/12 h-10 bg-transparent rounded-md "
                    ></input>
                    
                </div>
            </div>
            <div className="spotify-component-bg-color w-full h-12 p-2 flex items-center gap-2 rounded-lg" onClick={() => {createPlayList()}}>
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