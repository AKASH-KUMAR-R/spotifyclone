import { useEffect, useState } from "react";
import ListItems from "./ListItems";

const HomePage = (props) => {

    const [data, setData] = useState(null);
    const [gerneData, setGerneData] = useState(null);
    const [workOutData,setWorkOutData] =  useState(null);

    const [featuredPlaylist, setFeaturedPlaylist] = useState(null);
    const [episodeList, setEpisodeList] = useState(null);
    const [showsList, setShowsList] = useState(null);

    const fetchData = async (url, options, retries = 3, delay = 1000) => {

      const res = await fetch(url, options);
        try {
          if (!res.ok) {
            if (res.status === 429 && retries > 0) {
              console.log(retries + "Try ");
              const serverDelay = parseInt(res.headers.get('Retry-After'));
              await new Promise(resolve => setTimeout(resolve, serverDelay));
              return fetchData(url, options, retries - 1, delay * 2)
            } 

            throw new Error ("Can't fetch data" );
          }

          return res.json();
      } catch (e) {
        console.log(e.message);
      }

    };

    useEffect( () => {
       fetch('https://api.spotify.com/v1/browse/new-releases',{
            method :'GET',
            headers : {
                'Authorization' : `Bearer ${props.access_token}`,
            },
        })
        .then( (res) => {
            
            if (!res.ok) {
                throw new Error("can't fetch new releases");
            }
            return res.json();
        })
        .then ( (result) => {
            setData(result);
        })
        .catch( (e) => {
            console.log(e.message);
        })
      // setData(fetchData('https://api.spotify.com/v1/browse/new-releases'), {
      //   method : 'GET',
      //   headers : {
      //     'Authorization' : `Bearer ${props.access_token}`,
      //   }
      // });

        fetch('https://api.spotify.com/v1/recommendations?seed_genres=pop%2Chip-hop%2Csoul%2Cdance%2Cmalay', {
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${props.access_token}`,
            },
        })
        .then ( (res) => {
            if (!res.ok) {
                throw new Error("Can't fetch popular gernes");
            }
            return res.json();
        })
        .then ( (result) => {
            setGerneData(result);
        })
        .catch( (e) => {
            console.log(e.message);
        })
        // setGerneData(fetchData('https://api.spotify.com/v1/recommendations?seed_genres=pop%2Chip-hop%2Csoul%2Cdance%2Cmalay', {
        //   method : 'GET',
        //   headers : {
        //     'Authorization' : `Bearer ${props.access_token}`,
        //   }
        // }));


      fetch ('https://api.spotify.com/v1/recommendations?seed_genres=work-out', {
        method : 'GET',
        headers : {
          'Authorization' : `Bearer ${props.access_token}`,
        }
      })
      .then ( (res) => {
        if (!res.ok) {
          throw new Error("Can't fetch work-out details");
        }

        return res.json();
      } )
      .then ( (result) => {
        setWorkOutData(result);
      }) 
      .catch( (e) => {
        console.log(e.message);
      })
      // setWorkOutData (fetchData('https://api.spotify.com/v1/recommendations?seed_genres=work-out'), {
      //   method : 'GET',
      //   headers : {
      //     'Authorization' : `Bearer ${props.access_token}`,
      //   }
      // });


      fetch ( 'https://api.spotify.com/v1/browse/featured-playlists', {
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${props.access_token}`,
        }
      })
      .then ( (res) => {
        
        if (!res.ok) {
            throw new Error("Can't fetch featured playlist");
        }

        return res.json();
      })
      .then ( (result) => {
        setFeaturedPlaylist(result);
      })
      .catch ( (e) => {
        console.log(e.message);
      })

      // setFeaturedPlaylist(fetchData ('https://api.spotify.com/v1/browse/featured-playlists', {
      //   method : 'GET',
      //   headers : {
      //     'Authorization' : `Bearer ${props.access_token}`,
      //   },
      // }));

      fetch ( 'https://api.spotify.com/v1/search?q=shows+to+try&type=show&market=IN', {
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${props.access_token}`,
        }
      })
      .then ( (res) => {
        
        if (!res.ok) {
            throw new Error("Can't fetch shows");
        }

        return res.json();
      })
      .then ( (result) => {
        setShowsList(result);
      })
      .catch ( (e) => {
        console.log(e.message);
      })

      fetch ( 'https://api.spotify.com/v1/search?q=Popular+Episodes&type=episode&market=IN&limit=10', {
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${props.access_token}`,
        }
      })
      .then ( (res) => {
        
        if (!res.ok) {
            throw new Error("Can't fetch episodes");
        }

        return res.json();
      })
      .then ( (result) => {
        setEpisodeList(result);
      })
      .catch ( (e) => {
        console.log(e.message);
      })
    }, []);

    


    return (
        <div className="homepage-section flex flex-col p-5"> 
            
            <div className="welcome-section mt-14 overflow-ellipsis font-serif flex flex-col gap-5 font-semibold">
                <span className=" text-4xl whitespace-nowrap">Good Afternoon,</span>
                <span className=" text-lg">Enjoy each moment with spotify by listening to your favourite songs.</span>
                <span className=" text-3xl">Let's get start</span>
            </div>

            <div className=" flex flex-col mt-5">
            {data &&  <ListItems listHeadingText = "New Releases" data={data.albums.items}/>}
            {gerneData && <ListItems listHeadingText = "Popular Genres Based"data= {gerneData.tracks}/>}
            { workOutData && <ListItems listHeadingText = "Fitness Motivation" data = {workOutData.tracks}/>}
            {featuredPlaylist && <ListItems listHeadingText = "Popular Playlist" data = {featuredPlaylist.playlists.items}/>}
            {showsList && <ListItems listHeadingText = "Shows to try"  data = {(showsList.shows.items).filter(value => value != null)}/>}
            {episodeList && <ListItems listHeadingText = "Popular Episodes" data = {episodeList.episodes.items}/>}
            </div>
        </div>
    );
}


export default HomePage;
