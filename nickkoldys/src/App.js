import {Switch, Route, Redirect} from 'react-router-dom';
import {Home} from './Home';
import {RasterCaster} from './RasterCaster';
import {SideBar} from './SideBar';
import './App.css';

function App() {
  return (
    <div>
      <script src='src/sidebarFunction.js'></script>
      <SideBar />
    <div className="App">
      <Switch>
        <Route exact path="/home">
          <Home />
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
