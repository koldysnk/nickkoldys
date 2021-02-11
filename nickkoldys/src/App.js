import {Switch, Route, Redirect} from 'react-router-dom';
import {Home} from './Home';
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
        <Redirect to="/home"/>
      </Switch>
    </div>
    </div>
  );
}

export default App;