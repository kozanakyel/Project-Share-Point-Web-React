import React from "react";
import { Outlet, Link } from "react-router-dom";
import { HiPaperAirplane } from "react-icons/hi";




const Nav = () => {
    return <>
        <nav className="navbar navbar-expand-md navbar-dark bg-success">
            <div className="container-fluid">
                
                <Link to="/" className="navbar-brand"><HiPaperAirplane /> PSP</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link active">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link active">Register</Link>
                         </li>
                    </ul>
                
                </div>
            </div>
            </nav>
            <Outlet />
    </>;
};

export default Nav;