import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";

import Navbar from "../pages/Home/Navbar/Navbar";


const Main = () => {
    return (
        <div>
           
           <Navbar></Navbar>
            <div className="min-h-[calc(100vh-178px)]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
            
        </div>
    );
};

export default Main;