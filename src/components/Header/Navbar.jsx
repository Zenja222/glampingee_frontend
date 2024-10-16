import React from "react";
import { ImAirplane } from "react-icons/im";
import "./Navbar.css"




const Navbar = () =>{

    return <div className='navbar'>
        <div className="logodiv">
            <ImAirplane classname="icon"/>
            <span className='text'>Glamping.ee</span>
        </div>

        <div className={Navbar}>
            <ul className="nav-list">
                <p className="nav-text">Home</p>
                <p className="nav-text">Explore</p>
                <p className="nav-text" >Blog</p>
            </ul>

        </div>
        <div className="nav-buttons">
            <button className='sign-button'>Sign Up</button>
            <button className='login-button'>Login</button>
        </div>
    </div>

};

export default Navbar;