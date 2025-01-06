import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar as DaisyNavbar, Button, Dropdown, Menu, Modal } from 'react-daisyui';
import Swal from 'sweetalert2'; 
const Navbar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsModalOpen(!isModalOpen);
    };

    const showLogoutConfirmation = () => {
        Swal.fire({
          title: 'Confirm Logout',
          text: 'Are you sure you want to log out?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Logout',
          cancelButtonText: 'Cancel',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            Logout(); 
          }
        });
      };
    
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5180/logout');
            navigate('/'); // Redirect to homepage or login page
        } catch (error) {
            console.error('Logout failed', error);
           
        }
    };

    return (
        <>
            <div className="navbar bg-base-100">
                {/* Left Section - Logo/Text */}
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                    <div className="flex space-x-4">
                        <a className="btn btn-ghost">Home</a>
                        <a className="btn btn-ghost">About</a>
                        <a className="btn btn-ghost">Contact</a>
                    </div>
                </div>

              
            

                {/* Right Section - Logout Button */}
                <div className="navbar-end">
                <a className='btn btn-ghost' color="error" onClick={showLogoutConfirmation}>Logout</a>
                </div>
            </div>
          
        </>
    );
};

export default Navbar;
