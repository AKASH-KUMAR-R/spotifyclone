import { useState, useEffect } from "react";
import ListItems from "./ListItems";

const SearchBar = (props) => {


    const [searchQuery, setQuery] = useState("");
    const [searchType, setSearchType] = useState(
      encodeURIComponent("track,album,artist,show,episode")
    );
    const [encodedQuery, setEncodedQuery] = useState("");


    const [searchResult, setSearchResult] = useState(null);
    const [filterOption, setFilter] = useState({
      track: true,
      album: true,
      show: true,
      episode: true,
      artist: true,
    });
    const [selectedButton, setSelectStatus] = useState("all");

    useEffect( () => {

      if (searchQuery === "") {
        setSearchResult(null);
        return;
      }

      fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=${searchType}&limit=10&market=ES`, {
        method: "GET",
        headers: {
          'Authorization' : `Bearer ${props.access_token}`
        },
      })
      .then( (res) => {
        if (!res.ok) {
          throw new Error("Can't fetch search query");
        }

        return res.json();
      })
      .then( (data) => {
        setSearchResult(data);
      })
      .catch ( (error) => {
        
        console.log(error.message);
      })
    }, [searchQuery, searchType, encodedQuery, props.access_token]);


    const getDuration = (duration) => {
      const seconds = (( duration % 60000) / 1000).toFixed(0);

      if (seconds >= 10) 
          return (Math.floor( duration / 60000) + ":" + seconds);
      else 
          return (Math.floor( duration / 60000) + ":0" + seconds);

    }

    const setFilterStatus = ( key, value) => {

      const newFilter = {};
      
      if (key === "all") {
        
        setSearchType(encodeURIComponent("artist,album,show,episode,track"));
        Object.keys(filterOption).forEach ( k => {
          newFilter[k] = true;
        })

        setSelectStatus(key);

        setFilter(newFilter);
        return;
      }
      

      Object.keys(filterOption).forEach ( k => {
        newFilter[k] = false;
      })

      newFilter[key] = true;
      setFilter(newFilter);
      
      setSelectStatus(key);
      setSearchType(key);

    }
  
    return (
      <div className=" h-screen w-full p-6">
        <div className=" w-full flex flex-col items-center gap-4">
          <div className="  h-10 w-full sm:w-5/12 min-w-min mt-10 flex items-center text-sm sm:text-normal rounded-2xl gap-4 bg-white p-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
              <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
            </svg>
            <input
             type="text" 
             placeholder="What do you want to listen to?"
             className=" text-black w-10/12 h-10 outline-none"
             value={searchQuery}
             onChange={ (event) => {
              setQuery(event.target.value);
              setEncodedQuery(encodeURIComponent(event.target.value));
             }}
             ></input>
          </div>
          <div className=" w-full flex gap-2 text-xs sm:text-sm justify-center">
            <button 
            className="button-configuration"
            onClick={ () => {
              
              setFilterStatus("all");

            }}
            style={{
              opacity: ( selectedButton === "all") ? "1" : "0.4",
            }}>All</button>

            <button
            className="button-configuration"
            onClick={() => {
              setFilterStatus("track");

            }}
            style={{
              opacity: selectedButton === "track" ? "1" : "0.4",
            }}>Tracks</button>
            <button
            className="button-configuration"
            onClick={ () => {
              setFilterStatus("album");
            }}
            style={{
              opacity: selectedButton === "album" ? "1" : "0.4",
            }}>Albums</button>
            <button
            className="button-configuration"
            onClick={ () => {
              setFilterStatus("show");
            }}
            style={{
              opacity: selectedButton === "show" ? "1" : "0.4",
            }}>Shows</button>
            <button
            className="button-configuration"
            onClick={ () => {
              setFilterStatus("episode");
            }}
            style={{
              opacity: selectedButton === "episode" ? "1" : "0.4",
            }}>Episodes</button>
            <button
            className="button-configuration"
            onClick={() => {
              setFilterStatus("artist");
            }}
            style={{
              opacity: selectedButton === "artist" ? "1" : "0.4",
            }}>Artists</button>
          </div>
        </div>
        
         <div className=" w-full h-auto mt-4 flex flex-col gap-4" >
          {!searchResult && <div className=" w-full  flex justify-center items-center ">

            <span className=" text-2xl mt-20">Search Not Founded</span>
          </div>}
         {searchResult && (selectedButton === "all" || selectedButton === "track") && searchResult.tracks && <div className="song-list">
                <div className="heading-section">
                <div className="id">#</div>
                <div className="title">Title</div>
                <div className="album-name">Artist</div>
                <div className="duration">Duration</div>
                </div>
              {searchResult.tracks.items.map( (eachSong, index) => (
                <div 
                className="each-song-details"
                key={index + " " + eachSong.id}
                >
                  <div className="id">
                    {eachSong.album.images && <img src={eachSong.album.images[0].url} width={40} alt="cover-page"></img>}
                  </div>
                  <div className="title">{eachSong.name}</div>
                  <div className="album-name">{eachSong.artists[0].name}</div>
                  <div className="duration">{getDuration(eachSong.duration_ms)}</div>
                </div>
              ))}
            
          </div>}

          {searchResult && (selectedButton === "all" || selectedButton === "album") && searchResult.albums &&  <ListItems listHeadingText = "Albums" data = {searchResult.albums.items} />}
          {searchResult && (selectedButton === "all" || selectedButton === "show") && searchResult.shows && <ListItems listHeadingText = "Shows" data = {searchResult.shows.items.filter( (eachItem) => eachItem !== null)}/>}
          {searchResult && (selectedButton === "all" || selectedButton === "episode") && searchResult.episodes && <ListItems listHeadingText = "Episodes" data = {searchResult.episodes.items} />}
          {searchResult && (selectedButton === "all" || selectedButton === "artist") && searchResult.artists && <ListItems listHeadingText = "Artists" data = {searchResult.artists.items} />}

        </div> 
      </div>
    );
}

export default SearchBar;