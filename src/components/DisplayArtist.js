import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PopularTrack from "./PopularTrack";
import { Link } from "react-router-dom/cjs/react-router-dom";

const DisplayArtist = (props) => {

    const [artistData, setArtistData] = useState(null);
    const [artistAlbumDetails, setArtistAlbums] = useState(null);   
    const { artistId } = useParams();

    const [relatedArtist, setRelatedArtist] = useState(null);
    const [color, setColor] = useState(null);

    useEffect( () => {
        fetch (`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${props.access_token}`,
            },
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error('Artist details can\'t be fetch');
            }
            console.log("Artist details fetched");
            return res.json();
        })
        .then ( (value) => {
            setArtistAlbums(value);
            console.log(value)
        })
        .catch( (e) => {
            console.log(e.message);
        })

        fetch (`https://api.spotify.com/v1/artists/${artistId}`, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${props.access_token}`,

        },
      })
      .then( (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        console.log("artist details fetched !");
        return res.json();
      })
      .then( (data) => {
        setArtistData(data);
        console.log(data);
      })
      .catch( (e) =>{
        console.log(e.message);
      })

      fetch (`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${props.access_token}`,
        }
      })
      .then ( (res) => {
        if (!res.ok) {
            throw new Error("Can.t fetch related artists");
        }
        console.log("fetched related artist");
        return res.json();
      })
      .then ( (data) => {
        setRelatedArtist(data);
      })
      .catch( (e) => {
        console.log(e.messaage);
      })

    }, [artistId]);

    return (
        <div className="temp-section">
            { artistData && <div className="artist-image">
                <img src={artistData.images[0].url} width="100%" height="20%"></img>
                <div className="artist-details">
                    <span className="artist-name">{artistData.name}</span>
                    <span className="artist-followers">Followers : {(artistData.followers.total).toLocaleString()}</span>
                </div>
            </div>}
            <div className="album-section">
                <div className="for-design"></div>
                <div className="popular-section">
                    <div className="album-top-section"><span className="heading-text">Popular</span></div>
                    <PopularTrack  access_token = {props.access_token}/>
                </div>
                <div className="album-list">
                    <div className="album-top-section">
                        <div><span>Discography</span></div>
                        <div>Show all</div>
                    </div>
                    <div className="albums">
                    <div className="sections" style={ {
                        display: "flex",
                        alignItems: 'center',

                    }}>
                        {artistAlbumDetails && artistAlbumDetails.items.map( (eachItem) => (
                            <Link to = {`/album/${eachItem.id}`} className = "links"><div className="album">
                                <div className="album-image">
                                    <img src={eachItem.images[0].url}></img>
                                </div>
                                <div className="album-details">
                                    <div><span>{eachItem.name}</span></div>
                                    <div><span>{(eachItem.release_date).substring(0, 4)}</span><span style={{fontWeight: 'bolder', fontSize: '20px'}}>.</span>{eachItem.album_group}</div>
                                </div>
                            </div>
                            </Link>

                        ))}
                        </div>

                    </div>

                    <div className="album-top-section">
                        <div><span>Fans Also Likes</span></div>
                        <div>Show all</div>
                    </div>
                    <div className="albums">
                    <div className="sections" style={ {
                        display: "flex",
                        alignItems: 'center',

                    }}>
                        {relatedArtist && relatedArtist.artists.map( (eachItem) => (
                            <Link to={`/artist/${eachItem.id}`} className= "links"><div className="album">
                                <div className="album-image">
                                    <img src={eachItem.images[1].url} style = { {
                                        borderRadius : "50%",
                                        width : "400px",
                                        height : "160px"
                                    }}></img>
                                </div>
                                <div className="album-details">
                                    <div><span>{eachItem.name}</span></div>
                                    <div><span>{(eachItem.type).charAt(0).toUpperCase() + (eachItem.type).slice(1)}</span></div>
                                </div>
                            </div>
                            </Link>

                        ))}
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default DisplayArtist;