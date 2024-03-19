import { useEffect, useState } from "react"

const useFetch = (url, type, access_token) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [pending, setPending] = useState(true);

    useEffect( () => {
        fetch(url, {
            method: `${type}`,
            headers: {
                'Authorization' : `Bearer ${access_token}`, 
            },
        })
        .then( (res) => {
            if (!res.ok) {
                setError(true);
                setPending(false);
                throw new Error("Response is not ok" + (res.status));
            }
            console.log('Response is ok');
            setPending(false);
            setError(false);
            return res.json();
        })
        .then( (value) => {
            setData(value);
        })
        .catch( (e) => {
            console.log(e.message);
        })

    }, [url, type, access_token]);

    return {error, pending, data};

}

export default useFetch;