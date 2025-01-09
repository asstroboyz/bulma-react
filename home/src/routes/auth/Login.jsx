import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();



    try {

      await axios.post('http://localhost:5180/login', {

        email,
        password,

      });

      // Navigasi ke halaman utama setelah registrasi berhasil
      navigate('/home');

      // Reset input fields
      // setName('');
      setEmail('');
      setPassword('');
      // setConfPassword('');
    } catch (error) {
      // Menangani error
      console.log(error)
      if (error.response) {
        console.log(error.response.data);
        setMsg(error.response.data.msg || 'Registration failed. Please try again.');
      } else {
        setMsg('Registration failed. Please try again.');
      }
    }
  }
  const goToRegister = () => {
    navigate('/register'); // Navigasi ke halaman register
  };
  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <p className="text-center text-red-500">{msg}</p>
          <form onSubmit={Auth}>
            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">Password</label>
              <input
                type="password"
                className="input input-bordered"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="mt-4 text-center">
              <button className="btn btn-link">Forgot Password?</button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <button className="btn btn-link" onClick={goToRegister}>
              Dont have an account? Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
