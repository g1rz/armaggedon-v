import './App.sass';
import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="container">
                <Sort />
            </div>
        </div>
    );
}

export default App;
