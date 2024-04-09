import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ExtractColorFromImage from "./ExtractColorFromImage";

const DisplayAlbum = (props) => {

    const {albumId} = useParams();
    const [albumDetails, setAlbumDetails] = useState(null);
    const [color,setColor] = useState(null);

    useEffect( () => {

        fetch ( `https://api.spotify.com/v1/albums/${albumId}`, {
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${props.access_token}`,
            }
        })
        .then ( (res) => {
            if (!res.ok) {
                throw new Error('Failed to feetch album details');
            }
            return res.json();
        })
        .then ( (data) => {
            setAlbumDetails(data);
        })
        .catch ( (e) => {
            console.log(e.message);
        })
    }, [albumId, props.access_token]);

    const getDuration = (duration) => {
        const seconds = (( duration % 60000) / 1000).toFixed(0);

        if (seconds >= 10) 
            return (Math.floor( duration / 60000) + ":" + seconds);
        else 
            return (Math.floor( duration / 60000) + ":0" + seconds);

    }

    return (
        <div className="temp-section mt-10">
            { albumDetails && <div className="artist-image w-full h-4/12 flex flex-col items-center p-4  sm:flex-row" style={ {
                backgroundColor: `${color}`,
                backdropFilter: `blur(10px)`,
            }}>
                <ExtractColorFromImage imageUrl={albumDetails.images[0].url} setColor={setColor}/>
                    <img src={albumDetails.images[0].url} className=" w-40 h-40 sm:w-52 sm:h-52 rounded-lg"></img>
                    <div className="artist-details w-full items-center sm:items-start sm:ml-6 flex flex-col overflow-hidden mt-1">
                        <span className=" text-3xl sm:text-4xl  text-ellipsis">{albumDetails.name}</span>
                        <span className=" text-xl">{albumDetails.artists[0].name}
                        <span style={{fontWeight: 'bolder', marginLeft : '4px', marginRight : '4px'}}>.</span>
                        {(albumDetails.release_date).slice(0, 4)}
                        <span style={{fontWeight: 'bolder', marginLeft : '4px', marginRight : '4px'}}>.</span>
                        {albumDetails.total_tracks} songs
                        </span>
                    </div>
                </div>}

            { albumDetails && <div className="song-list p-6">
                <div className="heading-section">
                <div className="id">#</div>
                <div className="title">Title</div>
                <div className="album-name">Artist</div>
                <div className="duration">Duration</div>
                </div>
              {albumDetails.tracks.items.map( (eachSong, index) => (
                <div 
                className="each-song-details"
                key={index}
                >
                  <div className="id">{index + 1}</div>
                  <div className="title">{eachSong.name}</div>
                  <div className="album-name">{eachSong.artists[0].name}</div>
                  <div className="duration">{getDuration(eachSong.duration_ms)}</div>
                </div>
              ))}
            
          </div>}

        </div>
    );
}

export default  DisplayAlbum;