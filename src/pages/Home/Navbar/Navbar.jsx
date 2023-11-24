
import { Link, NavLink } from "react-router-dom";
import '../Navbar/Navbar.css'
import {  FaRegBell } from "react-icons/fa";



const Navbar = () => {
   
    const navLink = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/membership'> Membership</NavLink></li>
        <li><NavLink to='/bell'> <FaRegBell className="text-2xl" /> </NavLink></li>
    </>

    return (
        <>
         <div className="navbar  fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-2xl">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navLink}
      </ul>
    </div>
    <a id="logo" className="btn btn-ghost normal-case text-xl">FORUM US</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navLink}
    </ul>
  </div>
  
  <div className="navbar-end">
  <Link to="/register">
    <p id="join-us" className="btn">Join us</p>
    </Link>
  </div>
  
</div>
         
        </>
    );
};

export default Navbar;