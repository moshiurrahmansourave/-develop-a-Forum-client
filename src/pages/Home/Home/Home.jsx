
import AllPost from "../AllPost/AllPost";
import Banner from "../Banner/Banner";
import '../Home/Home.css'


const Home = () => {
    return (
        <div className="home-body">
            <Banner></Banner>
            <div className="mt-20">
            <AllPost></AllPost>
            </div>
        </div>
    );
};

export default Home;