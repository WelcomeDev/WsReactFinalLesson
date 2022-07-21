import React, { Component, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import deleteIcon from '../../images/close.svg';
import { Movie } from '../../interfaces/movie';
import './movies.scss';
import { getListMovies } from '../../requests/getListMovies'

interface CreateMovieParams {
    //movies: Movie[];
    //deleteNote(index: number): void;
}

//function getListPage(lenghtList: number, countDisplayElements: number) {
//    let listPage = [];
//    const countPage = Math.ceil(lenghtList / countDisplayElements)
//    for (let i = 1; i <= countPage; i++) {
//        listPage.push(i);
//    }
//    return listPage
//}

export const Movies = (props: CreateMovieParams) => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    //const [lenghtListMovies, setLenghtListMovies] = useState<number>(0)
    //const [page, setPage] = useState<number>(0);
    const size: number = 10;
    const page = 0;
    //const [pageList, setPageList] = useState<number[]>([]);
    
    setMoviesList(getListMovies(page, size))
    //let movies: Movie[];
    //const lenghtComment = 200;
    ////useEffect(() => {
    ////    axios.get(`http://students.dev.thewhite.ru/api/movies/page-my?page=${page}&size=${size}`, { headers })
    ////        .then(res => {
    ////            const movies = res.data.items;
    ////            setMoviesList(movies);

    ////            const lenghtListMovies = res.data.totalCount;
    ////            setLenghtListMovies(lenghtListMovies);
    ////            //setPageList(getCountPage(lenghtListMovies, size));
    ////            //console.log(pageList)
    ////        }),
    ////        []
    ////})
    //let listPage = [];
    //const countPage = Math.ceil(lenghtListMovies / size)
    //for (let i = 1; i <= countPage; i++) {
    //    listPage.push(i);
    //}
    //setPageList(listPage)
    //setPageList(getListPage(lenghtListMovies, size))
   // console.log(getListPage(lenghtListMovies, size))
    return (
        <div>
            <table
                className={'app-table table-movies'}
            >
                <thead
                    className={'table-movies__thead'}
                >
                    <tr>
                        <th>Title</th>
                        <th>Rate</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    moviesList.map((movie: Movie, index: number) => (
                    
                        <tr
                            key={index}
                            className={'table-movies__item movies-item'}
                        >
                            <td
                                className={'movies-item__td item-td'}
                            >{movie.title}</td>
                            <td
                                className={'movies-item__td item-td'}
                            >{movie.rate}</td>
                            <td
                                className={'movies-item__td item-td'}
                            >{movie.date}</td>
                            <td
                                className={'movies-item__td item-td'}
                            >{movie.comment }</td>
                            <td
                                className={'movies-item__td item-td'}
                            >
                                <button
                                    onClick={() => console.log(movie)}
                                   // onClick={() => props.deleteNote(index)}
                                >
                                    <img className={'item-td__img'} src={deleteIcon} alt={'delete'} />
                                </button>
                            </td>
                        </tr>
                    
                    ))
                }
            </table>
        </div>
    );
};
