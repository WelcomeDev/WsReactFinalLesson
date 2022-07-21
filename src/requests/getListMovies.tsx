import axios from "axios";
import { useEffect, useState } from "react";
import { Movie } from '../interfaces/movie';

export function getListMovies(page: number, size: number) {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    //let movies: Movie[] = []
   
    useEffect(() => {
        const headers = {
            'Authorization': '36d6c5ae-df3f-444c-afcd-425c611f096e',
            'Content-Type': 'application/json'
        };
        const params = { page: page, size: size };
        axios.get(`http://students.dev.thewhite.ru/api/movies/page-my`, { headers, params })
            .then(res => {
                let movies = res.data.items;
                setMoviesList(movies)
                // console.log(moviesRes)

            })
    },
    [])
    
    return moviesList
}