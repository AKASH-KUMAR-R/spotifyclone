import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ExtractColorFromImage from "../ExtractColorFromImage";
import { MusicIcon } from "../Icons/Icons";

const DisplayEpisode = (props) => {

    const {episodeId} = useParams();
    const [episodeData, setEpisode] = useState(null);
    const [color, setColor] = useState(null);


    useEffect(() => {

        fetch(`https://api.spotify.com/v1/episodes/${episodeId}?market=IN`, {
            method: `GET`,
            headers: {
                'Authorization': `Bearer ${props.access_token}`,
            },          
        })
        .then ( (res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch episode datas");
            }
            console.log("episode data fetched successfully");
            return res.json();
        })
        .then ( (data) => {
            setEpisode(data);
            console.log(data);
        })
        .catch ( (e) => {
            console.log(e.message);
        })
    }, [episodeId]);


    const formatDuration = (duration) => {

        var seconds = Math.floor((duration / 1000));
        var minutes = 0, hour = 0;

        minutes = Math.floor((seconds / 60));
        seconds = seconds % 60;

        while (minutes >= 60) {
            hour += 1;
            minutes = minutes - 60;
        }
        
        if (hour !== 0) {

            if (minutes >= 10)
                return (hour + " hr " + minutes + " min");

            return (hour + " hr 0" + minutes + " min");

        }

         if (seconds < 10) 
             return (Math.floor((duration / 60000)) + " min 0" + seconds + " sec");
        
         return (Math.floor((duration / 60000)) + " min " + seconds + " sec");
        
    }

    return (
        <div className=" w-full h-full mt-10">
            { episodeData && <div className="artist-image w-full h-4/12 flex flex-col items-center p-4  sm:flex-row" style={ {
                backgroundColor: `${color}`,
                backdropFilter: `blur(10px)`,
            }}>
                <ExtractColorFromImage imageUrl={episodeData.images[0].url} setColor={setColor}/>
                {episodeData.images.length > 0  ? <img src={episodeData.images[0].url} className = " w-40 h-40 sm:w-52 sm:h-52 rounded-lg" alt="playlist-view"></img> : <MusicIcon />}
                    <div className="artist-details w-full items-center sm:items-start sm:ml-6 flex flex-col overflow-hidden mt-1">
                        <span className="artist-name overflow-hidden whitespace-nowrap text-ellipsis">{episodeData.name}</span>
                        <span className="artist-followers">Podcast Episode
                        <span style={{fontWeight: 'bolder', fontSize: '30px', marginLeft : '4px', marginRight : '4px'}}>.</span>
                        {(episodeData.release_date).slice(0, 4)}
                        <span style={{fontWeight: 'bolder', fontSize: '30px', marginLeft : '4px', marginRight : '4px'}}>.</span>
                        {formatDuration(episodeData.duration_ms)}
                        </span>
                        <a href={episodeData.external_urls.spotify} className=" underline">{episodeData.show.name}</a>
                    </div>
                </div>}
                <div className=" w-full h-20 flex flex-row p-4  gap-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="w-16 h-16 hover:scale-105 active:scale-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                    </svg>
                    <div className="tools-section flex flex-row gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg></div>
                </div>
                {episodeData && <div className=" p-4 w-full h-auto">
                    <div className="show-details p-6 w-full h-auto overflow-hidden rounded-lg min-w-96">{episodeData.description}</div>
                </div>}
        </div>
    );
}


export default DisplayEpisode;