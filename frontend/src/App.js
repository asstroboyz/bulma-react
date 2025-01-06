import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './paginate/Login';
import Register from './paginate/Register';
import Navbar from './paginate/Navbar';
import Dashboard from './paginate/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route  path="/register" element={<Register />} />
        <Route  path="/dashboard" element={<><Navbar /><Dashboard/></>} />
      </Routes>
    </Router>
  );
}

export default App;
