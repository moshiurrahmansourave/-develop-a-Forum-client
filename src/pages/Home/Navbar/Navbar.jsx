
import { Link, NavLink } from "react-router-dom";
import '../Navbar/Navbar.css'
import { FaRegBell } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";



const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error))
  }


  const navLink = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/membership'> Membership</NavLink></li>
    <li><NavLink to='/bell'>Announcements<FaRegBell className="text-2xl" /> </NavLink></li>
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

          {
            user ? <>
              {/* <span>{user?.displayName}</span> */}

              {/* <button onClick={handleLogOut} className="btn btn-ghost">Sing Out</button> */}
              <div className="dropdown dropdown-end ">
                <label tabIndex={0} id="drop-btn" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
    
                    {user && user?.photoURL !== null ? (
                      <img src={user?.photoURL} alt="User" />
                    ) : (
                      <img src="https://i.ibb.co/zShG8zr/default-image.png" alt="Default User" />
                    )}
                  </div>

                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-cyan-900 rounded-box w-52">
                  <li>
                    <a className="justify-between">
                      <p>
                      {user && user?.displayName !== null ? (
                      <p>{user?.displayName}</p>
                    ) : (
                      <p>name not found</p>
                    )}
                      </p>
                    </a>
                  </li>
                  <li className="hover:bg-sky-500"><a>Dashboard</a></li>
                  <li><a onClick={handleLogOut} className=" text-white hover:bg-sky-500">Sing Out</a></li>
                </ul>
              </div>
            </> : <>
              <Link to="/register">
                <p id="join-us" className="btn">Join us</p>
              </Link>
            </>
          }
        </div>

      </div>

    </>
  );
};

export default Navbar;