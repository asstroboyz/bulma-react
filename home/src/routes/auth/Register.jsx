import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Menggunakan useNavigate untuk navigasi

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState(''); // Gantilah nama setter agar sesuai
    const navigate = useNavigate(); // Menggunakan useNavigate
    const [msg, setMsg] = useState('');

    const Register = async (e) => {
        e.preventDefault();
        
        // Validasi sederhana untuk memastikan password dan konfirmasi password cocok
        if (password !== confPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            // Kirim data ke API
            await axios.post('http://localhost:5180/users', {
                name,
                email,
                password,
                confPassword
            });

            // Navigasi ke halaman utama setelah registrasi berhasil
            navigate('/'); 

            // Reset input fields
            setName('');
            setEmail('');
            setPassword('');
            setConfPassword('');
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
                                <p>{msg}</p>
                                <form onSubmit={Register} className="box">
                                    <h1 className="title has-text-centered">Register</h1>
                                    <div className="field">
                                        <label className="label">Name</label>
                                        <div className="control has-icons-left">
                                            <input type="text" className="input" placeholder="Name"
                                                value={name} onChange={(e) => setName(e.target.value)} />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-user"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control has-icons-left">
                                            <input type="text" className="input" placeholder="Username / email"
                                                value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control has-icons-left">
                                            <input type="password" className="input" placeholder="*****"
                                                value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Confirm Password</label>
                                        <div className="control has-icons-left">
                                            <input type="password" className="input" placeholder="*****"
                                                value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button className="button is-success is-fullwidth">Register</button>
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

export default Register;
