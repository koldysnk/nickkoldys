import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import {Home} from './Home';
import {Games} from './Games';
import {About} from './About';
import {RasterCaster} from './RasterCaster';
import {SideBar} from './SideBar';
import { Projects } from './Projects';
import { TicTacToeMenu } from './TicTacToeMenu';
import { TicTacToeMultiplayer } from './TicTacToeMultiplayer';
import { TicTacToeSingleplayer } from './TicTacToeSingleplayer';

function App() {
  return (
    <div className='appAndSidebar'>
      <SideBar />
    <div className="App">
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/games">
          <Games />
        </Route>
        <Route exact path="/tictactoemenu">
          <TicTacToeMenu />
        </Route>
        <Route exact path="/tictactoemultiplayer">
          <TicTacToeMultiplayer />
        </Route>
        <Route exact path="/tictactoesingleplayer">
          <TicTacToeSingleplayer />
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/rastercaster">
          <RasterCaster />
        </Route>
        <Redirect to="/home"/>
      </Switch>
    </div>
    </div>
  );
}

export default App;
