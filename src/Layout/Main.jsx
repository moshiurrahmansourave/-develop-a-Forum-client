import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";

import Navbar from "../pages/Home/Navbar/Navbar";


const Main = () => {
    const location = useLocation()
    // console.log(location)
    const noFooter = location.pathname.includes('register')
    return (
        <div>
           
           <Navbar></Navbar>
            <div className="min-h-[calc(100vh-178px)]">
            <Outlet></Outlet>
            </div>
            {noFooter || <Footer></Footer>}
            
        </div>
    );
};

export default Main;