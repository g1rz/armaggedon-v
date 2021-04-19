import React from 'react';
import { Route } from 'react-router-dom';
import './App.sass';

import Header from './components/Header/Header';

import Home from './pages/Home';
import Asteroid from './pages/Asteroid';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="container">
                <Route exact path="/" component={Home} />
                <Route path="/asteroid/:id" component={Asteroid} />
            </div>
        </div>
    );
}

export default App;
