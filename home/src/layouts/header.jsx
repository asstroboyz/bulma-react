import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { Bell, ChevronsLeft, Moon, Search, Sun, Settings, LogOut as Signout } from "lucide-react";
import Swal from "sweetalert2";
import profileImg from "@/assets/profile-image.jpg";
import axios from 'axios';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
export const Header = ({ collapsed, setCollapsed }) => {
    const { theme, setTheme } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, logout",
            cancelButtonText: "Cancel",
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
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed && "rotate-180"} />
                </button>
                <div className="input">
                    <Search
                        size={20}
                        className="text-slate-300"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                {/* Toggle Theme Button */}
                <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun size={20} className="dark:hidden" />
                    <Moon size={20} className="hidden dark:block" />
                </button>

                {/* Notification Button */}
                <button className="btn-ghost size-10">
                    <Bell size={20} />
                </button>

                {/* Profile and Dropdown */}
                <div className="relative">
                    {/* <button
                        className="size-10 overflow-hidden rounded-full"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                          <img
                        src={profileImg}
                        alt="profile image"
                        className="size-full object-cover"
                    />
                    </button> */}
                    <button className="size-7 mt-2 overflow-hidden rounded-full" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <img
                        src={profileImg}
                        alt="profile image"
                        className="size-full object-cover"
                    />
                </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                            <div className="flex items-center gap-x-2 p-2 hover:bg-gray-100 cursor-pointer">
                                <Settings size={20} />
                                <span>Settings</span>
                            </div>
                            <div
                                className="flex items-center gap-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={handleLogout}
                            >
                                <Signout size={20} />
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
