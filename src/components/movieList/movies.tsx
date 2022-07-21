import React, { useEffect, useState } from 'react';
import deleteIcon from '../../images/close.svg';
import './movies.scss';
import { pageMy, remove } from 'requests/movieActions';
import { MovieList } from 'model/movieList';
import { useNavigate } from 'react-router-dom';

const size: number = 10;
const page = 0;

export function Movies() {
    const [moviesList, setMoviesList] = useState<MovieList[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        pageMy(page, size).then(movies => setMoviesList(movies.items));
    }, []);

    function deleteNote(id: string) {
        remove(id)
            .then(x => {
                const copy = [...moviesList];
                const indexToRemove = copy.findIndex(x => x.id === id);
                copy.splice(indexToRemove, 1);
                setMoviesList(copy);
            });
    }

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
                    moviesList.map((movie: MovieList) => (
                        // умер увидев столько стилей. В данном случае можно по тегу общаться в css
                        <tr
                            key={movie.id}
                            className={'table-movies__item movies-item'}
                            onDoubleClick={() => navigate(`update/${movie.id}`)}
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
                            >
                                <button
                                    onClick={() => deleteNote(movie.id)}
                                >
                                    <img className={'item-td__img'} src={deleteIcon} alt={'delete'}/>
                                </button>
                            </td>
                        </tr>

                    ))
                }
            </table>
        </div>
    );
}
