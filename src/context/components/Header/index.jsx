import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import Icone from './Icone'; // Ensure this imports your icon component correctly

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <header className="header d-flex align-items-center justify-content-between">
                <div className="logo-container d-flex align-items-center">
                    <Link to={'/'} className="d-flex align-items-center logo">
                        <span className="ml-2">NccNotes</span>
                    </Link>
                </div>
                <div className="menu-container d-flex align-items-center">
                    <MdMenu className="menu-icon" onClick={toggleSidebar} />
                    <Link to="/admin-login" className="ml-2">
                        <Icone />
                    </Link>
                </div>
            </header>
            <div className={`layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/faculty">Add Faculty</Link>
                        </li>
                        <li>
                            <Link to="/semester">Add Semester</Link>
                        </li>
                        <li>
                            <Link to="/subject">Add Subject</Link>
                        </li>
                        <li>
                            <Link to="/answer">Add Answer Question</Link>
                        </li>
                        <li>
                            <Link to="/notes">Add Notes</Link>
                        </li>
                        <li>
                            <Link to="/notice">Add Notice</Link>
                        </li>
                        <li>
                            <Link to="/teachers">Add Teacher</Link>
                        </li>
                    </ul>
                </div>
                <div className="main-content"></div>
            </div>
        </>
    );
};

export default Header;
