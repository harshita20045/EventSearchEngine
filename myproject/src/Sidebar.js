// src/Sidebar.js
import React from 'react';
import './Sidebar.css'; // Import CSS for Sidebar

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2>Admin Panel</h2>
            <nav>
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Users</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Reports</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;