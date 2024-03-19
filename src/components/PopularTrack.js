import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const PopularTrack = (props) => {

    const [countryCode, setCountry] = useState("IN");
    const [musicList, setList] = useState(null);
    const { artistId } = useParams();

    const [displayedNumber, setDisplayedNumber] = useState(5);
    
    
    useEffect( () => {

        fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${countryCode}`, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${props.access_token}`,
            }
        })
        .then ( (res) => {
            if (!res.ok) {
                throw new Error("failed to fetch");
            }
            console.log("popular fetched");
            return res.json();
        })
        .then ( (data) => {
            setList(data);
            console.log(data);
        })
        .catch( (e) => {
            console.log(e.message);
        }) 
    }, [artistId, countryCode]);

    const getDuration = (duration_ms) => {

      const minutes = ((duration_ms % 60000)/1000).toFixed(0);
        if (minutes >= 10)
          return (Math.floor(duration_ms / 60000) + ":" + minutes);
        else 
        return (Math.floor(duration_ms / 60000) + ":0" + minutes);
    } 

    return (
        <div className="temp-section">
        <div className="playlist-tools h-16">
          <div className="tools flex items-center gap-4">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
              </svg>
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shuffle">
                <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/>
                <path d="m18 2 4 4-4 4"/>
                <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/>
                <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/>
                <path d="m18 14 4 4-4 4"/>
              </svg>
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line">
                <path d="M12 17V3"/>
                <path d="m6 11 6 6 6-6"/>
                <path d="M19 21H5"/>
              </svg>
            </span>
          </div>
          <div className="search">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </span>
          </div>
        </div>
          { musicList && <div className="song-list p-6">
            <div className="heading-section">
              <div className="id">#</div>
              <div className="title">Title</div>
              <div className="album-name">Album</div>
              <div className="duration">Duration</div>
            </div>
              {(musicList.tracks.slice(0, displayedNumber)).map( (eachSong, index) => (
                <div 
                className="each-song-details"
                >
                  <div className="id">{index + 1}</div>
                  <div className="title">{eachSong.name}</div>
                  <div className="album-name">{eachSong.album.name}</div>
                  <div className="duration">{getDuration(eachSong.duration_ms)}</div>
                </div>
              ))}
              {displayedNumber === 5 && <span onClick={ () => {
                setDisplayedNumber(musicList.tracks.length);
              }}>show more</span>}
              {displayedNumber > 5 && <span onClick={ () => {
                setDisplayedNumber(5);
              }}>show less</span>}
            
          </div>}
      </div>
    );
}

export default PopularTrack;