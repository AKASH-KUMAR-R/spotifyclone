import { useEffect, useState } from "react";
import {  HomeIcon, LibraryIcon, PlusIcon, SearchIcon } from "../Icons/Icons";
import { Link} from "react-router-dom/cjs/react-router-dom.min";
import { CreatePlaylist } from "./CreatePlaylist";


export const LibrarySection = () => {

  const [sideBarActive, setSideBarStatus] = useState(false);
  const [libraryData, setLibraryData] = useState(null);
  const [createStatus, setCreateStatus] = useState(false);

  const [user, setUser] = useState(null);
  const user_token = window.localStorage.getItem("user_token");

  useEffect( () => {

      fetch(`https://api.spotify.com/v1/me/following?type=artist`, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${user_token}`,
        },
      })
      .then( (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then( (data) => {
        setLibraryData(data);
        console.log(data);
      })
      .catch( (e) => {
        console.log(e.message);
      })
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

    return (
        <div className=" hidden flex-col sm:flex">
          {user && <CreatePlaylist user={user} createStatus={createStatus} setCreateStatus={setCreateStatus} />}
            <div className=" flex flex-col p-2 gap-4 transition-all xl:flex "
        style={{
            display: sideBarActive ? "none" : "flex",
        }}>
            <div className=" p-4 flex flex-col gap-4 bg-stone-950 w-16 rounded-md items-center">
              <Link to="/" className = " links"><HomeIcon /></Link>
              <Link to="/search" className = " links"><SearchIcon /></Link>
            </div>
            
            <div className=" flex flex-col p-2 gap-4 bg-stone-950 w-16 rounded-md items-center overflow-y-auto">
              <div
              onClick={() => {
                  setSideBarStatus(prev => !prev);
              }}>
                  <LibraryIcon className=" mb-2"/>
              </div>          
              {libraryData && libraryData.artists.items.map( (eachArtist, index) => (
                  <Link className=" links" to ={`/artist/${eachArtist.id}`}>
                  <div 
                  key={index + " " + eachArtist.id}>
                  <img 
                  src={eachArtist.images[2].url}
                  className=" w-16 h-12 rounded-full" ></img>
                  </div></Link>
              ))}
            </div>
        </div>
        <div className="left-nav-container"
        style={{
            display: sideBarActive ? "block" : "none",
        }} >
            <div className=" w-full h-24 left-top-container-color flex flex-col  p-4">
              <Link to="/">
                <div className=" flex gap-5">
                  <HomeIcon />
                  <span>Home</span>
                </div>
              </Link>
              <div className=" flex gap-5 mt-3">
                <SearchIcon />
                <Link to = "/search"><span>Search</span></Link>
              </div>
            </div>
            
            <div className="library-container">
              <div className="library-menu-container p-4 flex justify-between gap-2">
                  <div className=" flex  gap-2" 
                  onClick={() => {
                  setSideBarStatus(prev => !prev);
                  }}>
                  <LibraryIcon />
                  <span className=" whitespace-nowrap">Your Library</span>
                  </div>
                  <div className="library-options cursor-pointer" onClick={()=> {setCreateStatus(true)}}>
                  <PlusIcon />
                  </div>
              </div>
              <div className="artist-playlist-container">
                  <div className="library-tools-container flex justify-between">
                  <SearchIcon />
                  <div className=" flex gap-2">
                  <span>Tools</span>
                  <LibraryIcon />
                  </div>
                  </div>
                  { <div className="library-list">
                  {libraryData && libraryData.artists.items.map( (eachData, index) => (
                      <Link
                      to={`/artist/${eachData.id}`}
                      key={eachData.id + "" + index}><div 
                      className="list flex gap-2"
                      >
                          <div className="artist-photo" >
                            <img src={eachData.images[2].url} 
                            style={ {
                                borderRadius: '8px',
                            }} alt="artist-view"></img>
                          </div>
                          <div className=" flex flex-col">
                            <span >{eachData.name}</span>
                            <span className=" text-sm opacity-60">{(eachData.type).charAt(0).toUpperCase() + (eachData.type).slice(1)}</span>
                          </div>
                      </div>
                      </Link>
                  ))}
                  </div>}
              </div>
            </div>
        </div>
      </div>
    );
};