import { useEffect, useState } from "react";
import {  HomeIcon, LibraryIcon, PlusIcon, SearchIcon } from "./Icons/Icons";
import { Link} from "react-router-dom/cjs/react-router-dom.min";


export const LibrarySection = () => {
    
    const ids = ['3TVXtAsR1Inumwj472S9r4', '6qqNVTkY8uBg9cP3Jd7DAH', 
  '4EVpmkEwrLYEg6jIsiPMIb', '3kjuyTCjPG1WMFCiyc5IuB', '4EVpmkEwrLYEg6jIsiPMIb', 
  '3CQIn7N5CuRDP8wEI7FiDA', '6g0mn3tzAds6aVeUYRsryU', '0K1q0nXQ8is36PzOKAMbNe'];

  const [sideBarActive, setSideBarStatus] = useState(true);
  const [libraryData, setLibraryData] = useState(null);

  useEffect( () => {

    let artsitIds = "";
      const access_token = window.localStorage.getItem("access_token");
      for (let i = 0;i < ids.length;i++) {
        if (i !== ids.length - 1) 
          artsitIds += ids[i] + '%2C';
        else 
          artsitIds += ids[i];
      }


      fetch(`https://api.spotify.com/v1/artists?ids=${artsitIds}`, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${access_token}`,

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
      })
      .catch( (e) => {
        console.log(e.message);
      })
      
  }, []);

    return (
        <div className=" hidden flex-col sm:flex">
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
            {libraryData && libraryData.artists.map( (eachArtist, index) => (
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
                <div className="library-options">
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
                {libraryData && libraryData.artists.map( (eachData) => (
                    <Link
                    to={`/artist/${eachData.id}`}><div 
                    className="list"
                    >
                        <div className="artist-photo" >
                        <img src={eachData.images[2].url} 
                        style={ {
                            borderRadius: '8px',
                        }} alt="artist-view"></img>
                        </div>
                        <div className="list-details">
                        <h5>{eachData.name}</h5>
                        <span>{(eachData.type).charAt(0).toUpperCase() + (eachData.type).slice(1)}</span>
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