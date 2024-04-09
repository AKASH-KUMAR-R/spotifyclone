import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PopularTrack from "./PopularTrack";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ListItems from "./ListItems";

const DisplayArtist = (props) => {

    const [artistData, setArtistData] = useState(null);
    const [artistAlbumDetails, setArtistAlbums] = useState(null);   
    const { artistId } = useParams();

    const [relatedArtist, setRelatedArtist] = useState(null);
    const [followStatus, setFollowStatus] = useState(false);
    const [color, setColor] = useState(null);

    const user_token = window.localStorage.getItem("user_token");
    useEffect( () => {
        /*Artist album details */
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

        /*Artist details */
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

      /*Related artist details */
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

      fetch (`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`, {
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${user_token}`,
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
        setFollowStatus(data[0]);
        console.log(data[0]);
      })
      .catch( (e) => {
        console.log(e.messaage);
      })

    }, [artistId]);

    const ModifyFollowStatus = () => {

        fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`, {
            method : followStatus ? 'DELETE' : 'PUT',
            headers : {
                'Authorization' : `Bearer ${user_token}`,
            }
        })
        .then ( (res) => {
            if (!res.ok) {
                throw new Error("Can.t modify follow status ");
            }
            console.log("modified follow status");
            setFollowStatus(prev => !prev);
        })
        .catch( (e) => {
            console.log(e.message);
        })

          
    }

    return (
        <div className="temp-section mt-10 flex flex-col gap-4">
            { artistData && <div className="artist-image w-full h-4/12 flex flex-col items-center p-4  sm:flex-row">
                <img src={artistData.images[0].url} className=" w-40 h-40 sm:w-52 sm:h-52 rounded-lg"></img>
                <div className="artist-details w-full items-center sm:ml-6 flex flex-col overflow-hidden whitespace-nowrap mt-1">
                    <span className=" text-3xl sm:text-4xl">{artistData.name}</span>
                    <span className="artist-followers">Followers : {(artistData.followers.total).toLocaleString()}</span>
                </div>
            </div>}
            <div className=" w-full ">
            <div className=" flex h-12 p-4">
                    <button className=" w-20 p-2 h-8 border border-white rounded-md font-semibold text-xs button-ani" 
                    style={{
                        borderColor: followStatus ? "rgb(256, 256, 256)" : "rgb(256, 256, 256 , 0.4)",
                    }} 
                    onClick={() => {ModifyFollowStatus()}}>
                        <span>{followStatus ? "Following" : "Follow"}</span>
                    </button>
                </div>
            </div>
            <div className="album-section p-4">

                {artistAlbumDetails && <ListItems data = {artistAlbumDetails.items} listHeadingText = "Albums"/>}
                {relatedArtist && <ListItems data = {relatedArtist.artists} listHeadingText = "Artists" />}
                
                
            </div>
        </div>
    );
}

export default DisplayArtist;