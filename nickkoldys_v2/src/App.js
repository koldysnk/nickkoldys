import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { FoodPlannerHome } from './food-planner/FoodPlannerHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
