import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Menggunakan named import

const Dashboard = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');  // Menyimpan nama pengguna
    const [token, setToken] = useState(''); // Menyimpan token
    const [expire, setExpire] = useState(''); // Menyimpan waktu kedaluwarsa token

    // Membuat instansi axios khusus
    const axiosJWT = axios.create();

    useEffect(() => {
        refreshToken();  // Menyegarkan token ketika komponen pertama kali dimuat
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5180/token'); // Mendapatkan token baru
            const newToken = response.data.accessToken;
            setToken(newToken);

            // Mendekode token menggunakan jwtDecode
            const decoded = jwtDecode(newToken);
            setName(decoded.name);  // Menyimpan nama dari token yang didekode
            setExpire(decoded.exp);  // Menyimpan waktu kedaluwarsa token

            // Menampilkan token baru di console
            console.log('New Token:', newToken);

            // Menambahkan header Authorization ke axiosJWT
            axiosJWT.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        } catch (error) {
            if (error.response) {
                // Jika gagal mengambil token baru, redirect ke halaman login
                navigate("/");
            }
        }
    };

    // Interceptor untuk memeriksa token setiap request
    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {  // Cek apakah token sudah kedaluwarsa
                const response = await axios.get('http://localhost:5180/token');
                const newToken = response.data.accessToken;
                setToken(newToken);

                const decoded = jwtDecode(newToken);
                setName(decoded.name);
                setExpire(decoded.exp);

                // Menampilkan token yang disegarkan di console
                console.log('Refreshed Token:', newToken);

                config.headers['Authorization'] = `Bearer ${newToken}`;
            }
            return config;
        },
        (error) => {
            console.log("error promise",error)
            return Promise.reject(error);
        }
    );

    // Fungsi untuk mengambil data pengguna
    const getUsers = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5180/users');
            console.log(response.data);  // Menampilkan data pengguna yang diterima
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='title'>Selamat Datang: {name}</h1>
            <button onClick={getUsers} className='button is-info' type="button">Ambil Pengguna</button>
        </div>
    );
};

export default Dashboard;
