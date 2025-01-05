import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Menggunakan named import

const Dashboard = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');  // Menyimpan nama pengguna
    const [token, setToken] = useState(''); // Menyimpan token
    const [expire, setExpire] = useState(''); // Menyimpan waktu kedaluwarsa token
    const [users, setUsers] = useState([]);

    // Membuat instansi axios khusus
    const axiosJWT = axios.create();

    useEffect(() => {
        refreshToken();  // Menyegarkan token ketika komponen pertama kali dimuat
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5180/token');
            const newToken = response.data.accessToken;
            setToken(newToken);

            const decoded = jwtDecode(newToken);
            setName(decoded.name);
            setExpire(decoded.exp);

            // Set the new token in the Authorization header for subsequent requests
            axiosJWT.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        } catch (error) {
            console.error("Error while refreshing token", error);
            navigate("/");
        }
    };



    // Interceptor untuk memeriksa token setiap request
    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get('http://localhost:5180/token');
                const newToken = response.data.accessToken;
                setToken(newToken);

                const decoded = jwtDecode(newToken);
                setName(decoded.name);
                setExpire(decoded.exp);

                // Menampilkan token yang disegarkan di console
                console.log('Refreshed Token:', newToken);

                // Menambahkan header Authorization dengan token yang diperbarui
                config.headers['Authorization'] = `Bearer ${newToken}`;
            }

            // Menambahkan log untuk memastikan token terkirim dengan benar
            console.log('Request Headers:', config.headers);
            return config;
        },
        (error) => {
            console.log("Interceptor error", error);
            return Promise.reject(error);
        }
    );



    // Fungsi untuk mengambil data pengguna
    const getUsers = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5180/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUsers(response.data);

        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
            if (error.response) {
                console.error("Error Status:", error.response.status);
                console.error("Error Data:", error.response.data);
                console.error("Error Headers:", error.response.headers);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error Message:", error.message);
            }
        }
    };



    return (
        <div className="container mx-auto mt-8 p-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-primary mb-6">Selamat Datang, {name}</h1>
  
        {/* Tombol Ambil Pengguna */}
        <div className="text-center mb-6">
          <button 
            onClick={getUsers} 
            className="btn btn-primary px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
            type="button"
          >
            Ambil Pengguna
          </button>
        </div>
  
        {/* Tabel Pengguna */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full shadow-lg rounded-lg">
            <thead>
              <tr className="text-white bg-blue-500">
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Dashboard;
