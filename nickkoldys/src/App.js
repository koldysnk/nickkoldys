import {Switch, Route, Redirect} from 'react-router-dom';
import {Home} from './Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Redirect to="/home"/>
      </Switch>
    </div>
  );
}

export default App;
