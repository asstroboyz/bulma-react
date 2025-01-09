import axios from 'axios';
import { useState } from 'react';
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
            navigate('/');

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
    const goToLogin = () => {
        navigate('/');
    };
    return (
        <div>
            <section className="hero bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="container max-w-md">
                    <div className="flex justify-center">
                        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
                            <p className="text-red-500 text-center">{msg}</p>
                            <form onSubmit={Register}>
                                <h1 className="text-2xl font-semibold text-center mb-8">Register</h1>

                                {/* Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Username / email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <div className="mt-1">
                                        <input
                                            type="password"
                                            className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="*****"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <div className="mt-1">
                                        <input
                                            type="password"
                                            className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="*****"
                                            value={confPassword}
                                            onChange={(e) => setConfPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mb-6">
                                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                        Register
                                    </button>
                                </div>

                                {/* Forgot Password Link */}
                                <div className="text-center">
                                    <button className="text-blue-500 hover:underline">Forgot Password?</button>
                                </div>
                                <div className="mt-6 text-center">
                                    <button className="btn btn-link" onClick={goToLogin}>
                                        Dont have an account? Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default Register;
