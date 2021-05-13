import {Switch, Route, Redirect} from 'react-router-dom';
import {Home} from './Home';
import {Games} from './Games';
import {About} from './About';
import {RasterCaster} from './RasterCaster';
import {SideBar} from './SideBar';
import './App.css';

function App() {
  return (
    <div>
      <SideBar />
    <div className="App">
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/games">
          <Games />
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
