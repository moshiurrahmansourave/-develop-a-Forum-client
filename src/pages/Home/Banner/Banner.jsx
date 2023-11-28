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
                    <h1 className="">Moshiur Rahman</h1>
                    <h3><span ref={el}></span></h3>
                    <p>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Ex, praesentium!</p>
                    <div className="home-sci">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTiktok /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                    </div>

                    {/* <div className='flex'>
                    <input type="text"  placeholder="Type here" className="input rounded-none text-black w-full max-w-xs" />
                    <button id='btn-box' className="btn rounded-none "><div className='flex gap-2'> <FaSearch></FaSearch> Search</div></button>
                    </div> */}

                </div>
                <div className='lg:w-[400px]'> 
            <img src="https://aptitude8.com/hubfs/flywheel%20v2.png" alt="" />
           </div>
                
           </section>
           
        </div>
    );
};

export default Banner;