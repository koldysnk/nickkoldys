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
          <Route path="/food-planner" element={<FoodPlannerHome />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
