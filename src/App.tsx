import React from 'react';
import { Header } from './components/header/header';
import './styles/app.scss';
import { Movies } from './components/movieList/movies';
import { Footer } from 'components/footer/footer';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { CreateMovieModal } from 'components/createMovies/createMovieModal';

function App() {

    return (
        <BrowserRouter>
            <div className={'app'}>
                <Header/>
                <main>
                    <Routes>
                        <Route path={'/home'} element={<HomePage/>}>
                            <Route path={'create'} element={<CreateMovieModal/>}/>
                        </Route>
                        <Route index element={<Navigate to={'home'}/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>

    );
}

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className={'container'}>
            <h1 className={'app__title'}>
                Movies
            </h1>
            <Movies/>
            <div className={'app-add_movie add-movie'}>
                <button className={'add-movie__btn primary-button'}
                        type="button"
                        onClick={() => navigate('create')}
                >
                    Add new
                </button>
            </div>
            <Outlet/>
        </div>
    );
}

export default App;
