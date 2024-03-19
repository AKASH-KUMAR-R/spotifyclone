import { useEffect, useState } from "react";
import TopNav from "./components/TopNav";
import DisplayArtist from "./components/DisplayArtist";
import { BrowserRouter, Switch , Route} from "react-router-dom";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DisplayAlbum from "./components/DisplayAlbum";
import HomePage from "./components/HomePage";
import DisplayPlaylist from "./components/DisplayPlaylist";
import DisplayShow from "./components/DisplayShow";
import DisplayEpisode from "./components/DisplayEpisode";
import SearchBar from "./components/SearchPage";
import { ExpandIcon, HomeIcon, LibraryIcon, PlusIcon, SearchIcon } from "./components/Icons/Icons";



function App() {

  const clientId = 'c9adbd62547c49f496f22706aa689171';
  const secretId = 'a2041aa7b50746e0a3b3087fd5331602';
  const ids = ['3TVXtAsR1Inumwj472S9r4', '6qqNVTkY8uBg9cP3Jd7DAH', 
  '4EVpmkEwrLYEg6jIsiPMIb', '3kjuyTCjPG1WMFCiyc5IuB', '4EVpmkEwrLYEg6jIsiPMIb', 
  '3CQIn7N5CuRDP8wEI7FiDA', '6g0mn3tzAds6aVeUYRsryU', '0K1q0nXQ8is36PzOKAMbNe'];

  const [access_token, setAccessToken] = useState(null);
  const [artist, setArtist] = useState(null);

  const [libraryData, setLibraryData] = useState(null);
  const [isSearchBarActive, setSearchStatus] = useState(false);


  const clientData = new URLSearchParams();
  clientData.append('grant_type', 'client_credentials');
  clientData.append('client_id', clientId);
  clientData.append('client_secret', secretId);

  const history = useHistory();
  const [sideBarActive, setSideBarStatus] = useState(true);
  

  useEffect( () => {

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: clientData,
      })
      .then( (res) => {
        return res.json();
      })
      .then( (data) => {
        setAccessToken(data.access_token);
        console.log(access_token);
      })

      
      let artsitIds = "";

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
        console.log(libraryData);
      })
      .catch( (e) => {
        console.log(e.message);
      })
      
  }, []);


 

  return (
    <BrowserRouter>
    <div className="Main">
      <div className=" flex flex-col p-2 gap-4"
      style={{
        display: sideBarActive ? "none" : "flex",
      }}>
        <div className=" p-4 flex flex-col gap-4 bg-stone-950 w-16 rounded-md items-center">
          <Link to="/" className = " links"><HomeIcon /></Link>
          <Link to="/search" className = " links"><SearchIcon /></Link>
        </div>
        
        <div className=" flex flex-col p-2 gap-4 bg-stone-950 w-16 rounded-md items-center">
          <div
          onClick={() => {
            setSideBarStatus(prev => !prev);
          }}>
            <LibraryIcon className=" mb-2"/>
          </div>          
          {libraryData && libraryData.artists.map( (eachArtist, index) => (
            <Link className=" links" to ={`/artist/${eachArtist.id}`}>
              <div 
              className=""
              key={index}>
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
        <div className="left-top-container flex-col p-4">
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
            <div className="icon flex  gap-4" 
            onClick={() => {
              setSideBarStatus(prev => !prev);
            }}>
              {/* <ExpandIcon /> */}
              <LibraryIcon />
            <span className=" whitespace-nowrap">Your Library</span>
            </div>
            <div className="library-options">
              <PlusIcon />
            </div>
          </div>
          

          <div className="artist-playlist-container">
            <div className="library-tools-container flex justify-between">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill= "white" className="w-6 h-6">
                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
              <div className=" flex gap-2">
              <span>Tools</span>
              <LibraryIcon />
              </div>
            </div>
              { <div className="library-list">
              {libraryData && libraryData.artists.map( (eachData) => (

                  <Link
                  onClick = {() => {
                    setArtist(eachData);
                  }}
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

      <div className="right-container">
      <div className="top-section flex-grow">
          <TopNav isSearchBarActive= {isSearchBarActive}/>
          <div className="flex gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokelinecap="round" strokeLinejoin="round" className="lucide lucide-bell">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokelinecap="round" strokeLinejoin="round" className="lucide lucide-users">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokelinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round">
                <path d="M18 20a6 6 0 0 0-12 0"/>
                <circle cx="12" cy="10" r="4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            
          </div>

    </div>
        <div className="sections min-w-96">
          <Switch>
            <Route path = "/artist/:artistId" >
               <DisplayArtist access_token = {access_token}/>
            </Route>
            <Route path = "/album/:albumId"> 
              <DisplayAlbum access_token = {access_token}/>
            </Route>
            <Route path = "/playlist/:playlistId">
              <DisplayPlaylist access_token = {access_token}/>
            </Route>
            <Route path = "/show/:showId">
              <DisplayShow access_token = {access_token}/>
            </Route>
            <Route path = "/episode/:episodeId">

              <DisplayEpisode access_token = {access_token}/>
            </Route>
            <Route path = "/search">
              <SearchBar access_token = {access_token} />
            </Route>
            <Route path="/">
              {access_token && <HomePage access_token = {access_token}/>}
            </Route>
          </Switch>
        </div>
      </div>
    </div>
   </BrowserRouter>
  );
}


export default App;

