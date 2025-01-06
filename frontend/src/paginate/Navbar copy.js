import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Navbar = () => {


    const navigate = useNavigate();
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5180/logout');
            navigate('/'); 
        } catch (error) {

        }
    }

    return (

        <nav className="bg-gray-100 border-b border-gray-300">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
                {/* Navbar Brand */}
                <a href="https://bulma.io" className="flex items-center">
                    <img
                        src="data:image/png;base64,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"
                        alt="Bulma Logo"
                        className="w-28"
                    />
                    <span className="text-xl ml-2 font-semibold">My App</span>
                </a>
    
                {/* Hamburger Menu */}
                <button className="lg:hidden text-gray-600">
                    <span className="sr-only">Open Menu</span>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>
    
            {/* Navbar Links */}
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-700 hover:text-gray-900">
                        Home
                    </a>
                    <a href="#" className="text-gray-700 hover:text-gray-900">
                        About
                    </a>
                </div>
                <button onClick={Logout} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                    Log Out
                </button>
            </div>
        </div>
    </nav>
    

    )
}

export default Navbar
