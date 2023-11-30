
import { Link } from "react-router-dom";


const Membership = () => {
    return (
        <div>
            <section className="home lg:flex-row flex-col-reverse h-screen">
                
                <div className="home-container">
                    <h3 className="">Monetize your passion</h3>
                    <h1 className="text-cyan-400">With membership</h1>
                    <p>Best-in-class membership software for independent <br /> creators,publishers,educators and more.</p>
                    <p className="mt-7 text-cyan-400 -mb-6">100$ For Get Membership</p>
                    <div className="mt-6" >
                        <Link to="/payment">
                        <button id="btn-style" className="">Become a member</button>
                        </Link>
                    </div>

                </div>
                <div className='lg:w-[600px] '> 
            <img className="rounded-full" src="https://www.theartworksinc.com/wp-content/uploads/2021/12/memberful_01-960x960.jpg" alt="" />
           </div>
                
           </section>
        </div>
    );
};

export default Membership;