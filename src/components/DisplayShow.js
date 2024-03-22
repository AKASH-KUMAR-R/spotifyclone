import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import ExtractColorFromImage from "./ExtractColorFromImage";

const DisplayShow = (props) => {

    const [color, setColor] = useState(null);
    const {showId} = useParams();
    const [showData, setShowData] = useState(null);


    const {err, pending, data} = useFetch(`https://api.spotify.com/v1/shows/${showId}`, 'GET', props.access_token);

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
        <div className="temp-section mt-10">
            { data && <div className="artist-image w-full h-4/12 flex flex-col items-center p-4  sm:flex-row" style={ {
                backgroundColor: `${color}`,
                backdropFilter: `blur(10px)`,
            }}>
                <ExtractColorFromImage imageUrl={data.images[0].url} setColor={setColor}/>
                    <img src={data.images[0].url} className=" w-40 h-40 sm:w-52 sm:h-52 rounded-lg" alt="cover-page"></img>
                    <div className="artist-details w-full items-center sm:ml-6 flex flex-col overflow-hidden whitespace-nowrap mt-1">
                        <span className=" text-3xl sm:text-4xl">{data.name}</span>
                        <span className="artist-followers">Podcast
                        <span style={{fontWeight: 'bolder', marginLeft : '4px', marginRight : '4px'}}>.</span>
                        {data.publisher}
                        <span style={{fontWeight: 'bolder', marginLeft : '4px', marginRight : '4px'}}>.</span>
                        {data.total_episodes} episodes
                        </span>
                    </div>
                </div>}
            <div className= " p-5 w-2/5 min-w-fit h-12 flex gap-5">
                <button className="follow-button w-20 h-8  rounded-full bg-white bg-opacity-30 ">Follow</button>
                <img src="https://img.icons8.com/ios-filled/50/FFFFFF/more.png" className="more-button w-9 h-8 " alt="more"/>


            </div>
            {data && <div className="show-details  mt-5 w-full h-auto sm:w-6/12 overflow-hidden text-ellipsis p-4 rounded-lg">
                <h1 className=" text-2xl mb-4">About</h1>
                <p>{data.description}</p>
            </div>}

            {data && <div className=" w-full flex flex-col p-2 sm:p-6">
                {data.episodes.items.map( (eachEpisode, index) => (
                    <div className=" grid-layout-2-2 w-full sm:w-10/12 sm:h-58 gap-4 border-t-2 border-t-white overflow-hidden"
                    key={index}>

                        <div className=" h-24 mt-3">
                            <img
                            src={`${eachEpisode.images[0].url}`} width="100" height="100" style={{
                                minWidth: '80px',
                                minHeight: '80px'
                            }}
                            alt="cover-page"></img>
                        </div>
              
                            <div className=" overflow-hidden w-full mt-1">
                                <p className=" text-base sm:text-lg font-semibold hover:underline cursor-pointer text-twoline-wrap">{eachEpisode.name}</p>
                                <div className=" sm:flex gap-1 hidden ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                    <span>Video<span className= " font-extrabold mr-2 ml-2">.</span><a href={`${data.external_urls.spotify}`} className=" hover:underline cursor-pointer">{data.name}</a></span>
                                </div>
                                <div className="episode-description text-sm mt-3">
                                    <div className="text-twoline-wrap opacity-80">{eachEpisode.description}</div>
                                </div>
                            </div>
                            <div className=" w-full h-auto flex flex-col col-span-2 sm:col-start-2 sm:row-start-2">
                                <div className=" mt-2">
                                    <span>{eachEpisode.release_date}<span className=" font-extrabold ml-1 mr-1">.</span><span>{formatDuration(eachEpisode.duration_ms)}</span></span>
                                </div>
                                <div className="tools-section flex min-w-fit gap-8 items-center mt-5 mb-5 hover">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <div className=" flex gap-8 items-center" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </div>

                                </div>
                            </div>
                
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default DisplayShow;