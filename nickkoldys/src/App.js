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
import { HangmanMenu } from './HangmanMenu';
import { HangmanDictionary } from './HangmanDictionary';
import { HangmanChoose } from './HangmanChoose';
import { HangmanGuess } from './HangmanGuess';
import { ChessMenu } from './ChessMenu';
import { ChessMultiplayer } from './ChessMultiplayer';
import { ChessSingleplayer } from './ChessSingleplayer';

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
        <Route exact path="/tictactoe_menu">
          <TicTacToeMenu />
        </Route>
        <Route exact path="/tictactoe_multiplayer">
          <TicTacToeMultiplayer />
        </Route>
        <Route exact path="/tictactoe_singleplayer">
          <TicTacToeSingleplayer />
        </Route>
        <Route exact path="/hangman_menu">
          <HangmanMenu />
        </Route>
        <Route exact path="/hangman_guess">
          <HangmanGuess />
        </Route>
        <Route exact path="/hangman_choose">
          <HangmanChoose />
        </Route>
        <Route exact path="/hangman_dictionary">
          <HangmanDictionary />
        </Route>
        <Route exact path="/chess_menu">
          <ChessMenu />
        </Route>
        <Route exact path="/chess_multiplayer">
          <ChessMultiplayer />
        </Route>
        <Route exact path="/chess_singleplayer">
          <ChessSingleplayer />
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
        <Route exact path="/raster_caster">
          <RasterCaster />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Redirect to="/home"/>
      </Switch>
    </div>
    </div>
  );
}

export default App;
