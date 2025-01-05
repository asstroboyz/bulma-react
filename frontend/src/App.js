import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

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
