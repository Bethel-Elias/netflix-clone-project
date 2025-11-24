import React from 'react'
import { useEffect,useState } from 'react';
import axios from "../../utils/Axios";
import requests from "../../utils/Requests";
import './banner.css';

function Banner() {
    let [movie,setMovie] = useState({});

    useEffect(() => {
        (async () => {
            try{
                let request = await axios.get(requests.fetchNetflixOriginals);
                console.log(request);
                setMovie(request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]);
            }catch (error) {
                console.log(error);
            }
        })()
    }, []);

function truncate(string, n) {
  return string?.length > n ? string.substring(0, n - 1) + "..." : string;
}

  return (
    <div className="banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url('http://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}
    >
        <div className="banner_contents">
            <h1 className="banner_title">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className="banner_buttons">
                <button className="banner_button play">Play</button>
                <button className="banner_button">My List</button>
            </div>
            <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
        </div>
        <div className="banner_fadeBottom"></div>
    </div>
  )
}

export default Banner