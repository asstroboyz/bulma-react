import React, { useState } from 'react';
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
            navigate('/dashboard'); 

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
    return (
        <div>
            <section className="hero has-background-light is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4-desktop">
                       
                                <form onSubmit={Auth} className="box">
                                    <h1 className="title has-text-centered">Login</h1>
                                    <p className='has-text-centered'>{msg}</p>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control has-icons-left">
                                            <input type="text" className="input" placeholder="Username / email"
                                            value={email} onChange={(e)=> setEmail(e.target.value)}
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control has-icons-left">
                                            <input type="password" className="input" placeholder="*****" 
                                               value={password} onChange={(e)=> setPassword(e.target.value)}/>
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button className="button is-success is-fullwidth">Login</button>
                                    </div>
                                    <div className="field has-text-centered">
                                        <button className="button is-text">Forgot Password?</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
