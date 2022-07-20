import React, { Component } from 'react';
import movies from './MOVIES.json';
import { Header } from './components/header/header';
import './styles/app.scss';
import { Movie } from './interfaces/movie';
import { Movies } from './components/movieList/movies';
import { Form } from './components/createMovies/form';


interface AppState {
    movies: Movie[];
    showForm: boolean;
    valueButton: string;
}

class App extends Component<{}, AppState> {    
    
    state = {
        movies: [],
        showForm: false,
        valueButton: 'Add'
    };
    onClick = () => {
        if (this.state.showForm == false) {
            this.setState({ showForm: true });
            this.setState({ valueButton: 'Canсel' });
        }
        else {
            this.setState({ showForm: false });
            this.setState({ valueButton: 'Add' });
        }
    };
    componentDidMount() {
        this.setState({ movies });
        this.setState({ showForm: false });
        this.setState({ valueButton: 'Add' });
    }
    saveMovie = (newMovie: Movie) => {
        const newMovies: Movie[] = this.state.movies;
        newMovies.push({
            id: newMovie.id,
            title: newMovie.title,
            rate: newMovie.rate,
            comment: newMovie.comment,
            date: newMovie.date
        });
        this.setState({ movies: newMovies });
    };

    deleteNote = (index: number) => {
        const newMovies: Movie[] = this.state.movies;
        newMovies.splice(index, 1);
        this.setState({ movies: newMovies });
    };

    render() {
        return (
            <div className={'app'}>
                <Header/>
                <main>
                    <div className={'container'}>
                        <h1 className={'app__title'}>
                            Movies
                        </h1>
                        <Movies
                            movies={this.state.movies}
                            deleteNote={(index) => this.deleteNote(index)}
                        />
                        <div className={'app-add_movie add-movie'}>
                            <input className={'add-movie__btn primary-button'} type="button" value={this.state.valueButton} onClick={this.onClick} />
                            {this.state.showForm ? <Form saveMovie={(newMovie) => this.saveMovie(newMovie)} hiddenForm={this.onClick} /> : null}
                        </div>                        
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
