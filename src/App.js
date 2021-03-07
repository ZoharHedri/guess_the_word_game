// import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import IntroPage from './GuessGame/IntroPage';
import GamePlay from './GuessGame/GamePlay';
import GameOver from './GuessGame/GameOver';


function App() {
  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <Router>
        <Switch>
          <Route exact path="/" component={IntroPage} />
          <Route exact path="/play" component={GamePlay} />
          <Route exact path="/gameover" component={GameOver} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
