import '../Banner/Banner.css'
import Typed from 'typed.js';

import { FaFacebookF, FaInstagram, FaSearch, FaTiktok, FaTwitter } from "react-icons/fa";
import React from 'react';

const Banner = () => {

    const el = React.useRef(null);

    React.useEffect(() => {
        const typed = new Typed(el.current, {
          strings: ['<i>Hello</i> Friends', 'WELCOME TO OUR WEBSITE','Join Us For More'],
          typeSpeed: 70,
          backSpeed:50,
          loop:true
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
            
          };
        }, []);

    return (
        <div>
           <section className="home lg:flex-row flex-col-reverse">
                
                <div className="home-container">
                    <h3 className="">Hello, Friends</h3>
                    <h1 className="">Comunity Forum</h1>
                    <h3><span ref={el}></span></h3>
                    <p>Meet other Ama users like you. Get answers <br /> & discover new ways to use Ama !</p>
                    <div className="home-sci">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTiktok /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                    </div>

                   

                </div>
                <div className='lg:w-[400px]'> 
            <img src="https://aptitude8.com/hubfs/flywheel%20v2.png" alt="" />
           </div>
                
           </section>
           
        </div>
    );
};

export default Banner;

