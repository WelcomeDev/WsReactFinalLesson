import React, { useState } from 'react';
import { Header } from './components/header/header';
import './styles/app.scss';
import { Movies } from './components/movieList/movies';

function App() {

    const [showForm, setShowForm] = useState(false);

    return (
        <div className={'app'}>
            <Header/>
            <main>
                <div className={'container'}>
                    <h1 className={'app__title'}>
                        Movies
                    </h1>
                    <Movies/>
                    <div className={'app-add_movie add-movie'}>
                        <button className={'add-movie__btn primary-button'}
                                type="button"
                                onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? 'Close' : 'Add new'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
