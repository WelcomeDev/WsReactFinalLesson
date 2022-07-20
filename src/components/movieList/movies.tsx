import deleteIcon from '../../images/close.svg';
import { Movie } from '../../interfaces/movie';
import './movies.scss';

interface CreateMovieParams {
    movies: Movie[];
    deleteNote(index: number): void;
}

export const Movies = (props: CreateMovieParams) => {
    const lenghtComment = 200;
    return (
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
                props.movies.map((movie: Movie, index: number) => (
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
                        >{movie.comment.substring(0, lenghtComment)}</td>
                        <td
                            className={'movies-item__td item-td'}
                        >
                            <button
                                onClick={() => props.deleteNote(index)}
                            >
                                <img className={'item-td__img'} src={deleteIcon} alt={'delete'} />
                            </button>
                        </td>
                    </tr>
                ))
            }
        </table>
    );
};
