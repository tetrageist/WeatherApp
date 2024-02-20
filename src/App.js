import logo from './images/n64.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          hello! 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Yay Nintendo!
        </a>
      </header>
    </div>
  );
}

export default App;
