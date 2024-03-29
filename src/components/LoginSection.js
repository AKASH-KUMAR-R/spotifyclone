
export const LoginSection =  () => {

    const redirectUrl = "http://localhost:3000";
    const clientId = process.env.REACT_APP_SPOTIFY_WEB_CLIENT_ID;
    const scope = "user-read-private user-read-email playlist-read-private user-library-read user-follow-read ";

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params =  {
        response_type: 'token',
        client_id: clientId,
        scope,
        redirect_uri: redirectUrl,
      }
      
      authUrl.search = new URLSearchParams(params).toString();

      console.log(authUrl.toString());

    return(
        <div className=" w-full h-full gap-4 flex flex-col justify-center items-center">
            <h1 className=" text-3xl spotify-green font-bold">Login to spotify</h1>
            <a href={authUrl.toString()}><button className=" w-40 h-10 bg-slate-800 rounded-lg active:scale-95 " >Login</button></a>
        </div>
    );
}