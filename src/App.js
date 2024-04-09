import { useEffect, useState } from "react";
import TopNav from "./components/NavBar/TopNav";
import DisplayArtist from "./components/DisplayComponents/DisplayArtist";
import { BrowserRouter, Switch , Route} from "react-router-dom";

import DisplayAlbum from "./components/DisplayComponents/DisplayAlbum";
import HomePage from "./components/HomeSection/HomePage";
import DisplayPlaylist from "./components/DisplayComponents/DisplayPlaylist";
import DisplayShow from "./components/DisplayComponents/DisplayShow";
import DisplayEpisode from "./components/DisplayComponents/DisplayEpisode";
import SearchBar from "./components/HomeSection/SearchPage";
import { LoginSection } from "./components/LoginSection";
import { LibrarySection } from "./components/LibrarySection/LibrarySection";
import { SlideLibrary } from "./components/LibrarySection/SlideLibrary";
import { BottomNav } from "./components/NavBar/BottomNav";
import { YourLibrary } from "./components/LibrarySection/YourLibrary";
import { CollectionSongs } from "./components/LibrarySection/CollectionSongs";


function App() {

  const clientId = process.env.REACT_APP_SPOTIFY_WEB_CLIENT_ID;
  const secretId = process.env.REACT_APP_SPOTIFY_WEB_SECRET_ID;

  const clientData = new URLSearchParams();
  clientData.append('grant_type', 'client_credentials');
  clientData.append('client_id', clientId);
  clientData.append('client_secret', secretId);

  const [access_token, setAccessToken] = useState(null);
  const [showLibrary, setShowLibrary]= useState(false);

  

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
        window.localStorage.setItem( "access_token",data.access_token);
        setAccessToken(data.access_token);
        console.log(access_token);
      })

      
      
  }, []);

  useEffect ( () => {

    const hash = window.location.hash;
    let token = window.localStorage.getItem("user_token");

    if (hash) {

      const urlParam = new URLSearchParams(window.location.hash.replace('#','?'));
      const token = urlParam.get('access_token');
      console.log(token);

      window.location.hash = "";
      window.localStorage.setItem("user_token", token);
    }


    fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${token}`,
        }
      })
      .then( (res) => {
        if (!res.ok) {
          throw new Error("Can't fetch user details");
        }
        return res.json();
      })
      .then ( (data) => {
        console.log(data);
      })
      .catch( (e) => {
        console.log(e.message);
      })

      fetch('https://api.spotify.com/v1/me/albums', {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${token}`,
        }
      })
      .then( (res) => {
        if (!res.ok) {
          throw new Error("Can't fetch user albums details");
        }

        return res.json();
      })
      .then ( (data) => {
        console.log(data);
      })
      .catch( (e) => {
        console.log(e.message);
      })
      
  }, []);


  return (
    <BrowserRouter>
    <main className=" flex absolute left-0 top-0 w-full h-full overflow-hidden ">
      <LibrarySection  />
      <SlideLibrary showLibrary={showLibrary} />

      <div className="right-container relative">
        <TopNav setShowLibrary={setShowLibrary} />
        <BottomNav />
        <div className="sections">
          <Switch>
            <Route path="/login">
              <LoginSection />
            </Route>
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
            <Route path="/library">
              <YourLibrary />
            </Route>
            <Route path="/collection/tracks">
              <CollectionSongs />
            </Route>
            <Route path="/">
              {access_token && <HomePage access_token = {access_token}/>}
            </Route>
          </Switch>
        </div>
      </div>
    </main>
   </BrowserRouter>
  );
}


export default App;

