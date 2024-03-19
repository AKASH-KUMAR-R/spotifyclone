import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import  { PlayButtonIcon } from "./Icons/Icons";


const ListItems = (props) => {

    const [data, setData] = useState(props.data);

    useEffect ( () => {
        setData(props.data);
    }, [props.data]);

    const handleSong = () => {
        console.log("song playing...");
    }

    return (
        <div>
            <div className="album-top-section">
                <div><span>{props.listHeadingText}</span></div>
            <div>Show all</div>
                    </div>
                    <div className="albums">
                        <div className="sections" style={ {
                            display: "flex",
                            alignItems: 'center',

                        }}>
                            {(props.listHeadingText === "New Releases" || props.listHeadingText === "Albums" || props.listHeadingText === "Artists") && data && data.map( (eachItem) => (
                                <Link to={props.listHeadingText === "Artists" ?  `/artist/${eachItem.id}` : `/album/${eachItem.id}`} className= "links">
                                    <div className="album">
                                    <div className="album-image relative">
                                        {eachItem.images[0] && <img src={eachItem.images[0].url} style = { {
                                            borderRadius : props.listHeadingText === "Artists" ? "100%" : "8px",
                                            width : "400px",
                                            height : "160px"
                                        }} alt="cover-page"></img>}
                                        <div className="play-button absolute top-28 left-24 opacity-0" onClick={ () => {
                                            handleSong();
                                        }}><PlayButtonIcon/></div>
                                    </div>
                                    <div className="album-details">
                                        <div><span>{eachItem.name}</span></div>
                                        <div><span>{(eachItem.type).charAt(0).toUpperCase() + (eachItem.type).slice(1)}</span></div>
                                    </div>
                                </div>
                                </Link>

                            ))}

                            { (props.listHeadingText === "Popular Genres Based" || props.listHeadingText === "Fitness Motivation") && data && data.map( (eachItem) => (
                                <Link to={`/album/${eachItem.album.id}`} className= "links">
                                    <div className="album">
                                    <div className="album-image relative">
                                        <img src={eachItem.album.images[0].url} style = { {
                                            borderRadius : "8px",
                                            width : "400px",
                                            height : "160px"
                                        }} alt="cover-page"></img>
                                        <div className="play-button absolute top-28 left-24 opacity-0" onClick={ () => {
                                            handleSong();
                                        }}><PlayButtonIcon/></div>
                                    </div>
                                    <div className="album-details">
                                        <div><span>{eachItem.album.name}</span></div>
                                        <div><span>{(eachItem.album.type).charAt(0).toUpperCase() + (eachItem.album.type).slice(1)}</span></div>
                                    </div>
                                </div>
                                </Link>
                            ))}

                            { (props.listHeadingText === "Popular Playlist" || props.listHeadingText === "Shows to try" || props.listHeadingText === "Shows" || props.listHeadingText === "Popular Episodes" ||props.listHeadingText === "Episodes") && data && data.map( (eachItem) => (
                                <Link to={(props.listHeadingText === "Shows to try" || props.listHeadingText === "Shows") ? `show/${eachItem.id}` : props.listHeadingText === "Popular Playlist" ? `/playlist/${eachItem.id}` : `/episode/${eachItem.id}`} className= "links">
                                    <div className="album">
                                    <div className="album-image relative">
                                        <img src={eachItem.images[0].url} style = { {
                                            borderRadius : "8px",
                                            width : "400px",
                                            height : "160px"
                                        }} alt="cover-page"></img>
                                        <div className="play-button absolute top-28 left-24 opacity-0" onClick={ () => {
                                            handleSong();
                                        }}><PlayButtonIcon/></div>
                                    </div>
                                    <div className="album-details">
                                        <div><span>{eachItem.name}</span></div>
                                        <div className=" mt-2"><span>{(eachItem.description).charAt(0).toUpperCase() + (eachItem.description).slice(1)}</span></div>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    </div>
        </div>
    );
}

export default ListItems;
