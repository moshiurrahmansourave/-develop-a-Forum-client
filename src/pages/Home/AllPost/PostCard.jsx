import { FaLongArrowAltRight, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

const PostCard = ({post}) => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out', 
        once: true, 
        mirror: false,
      });
      
    const {post_title, 
        author_name, 
        author_image,tags, time, post_image, down_votes_count, up_votes_count, _id} = post
    return (
        <div data-aos="fade-up" className="relative flex flex-col rounded-xl backdrop-blur-md bg-white/10  text-white shadow-md " >
  <figure><img  className="rounded-t-lg lg:h-80 h-full w-full" src={post_image} alt="car!"/></figure>
  <div className=" flex flex-col gap-3 px-2 pb-6 " >
    
    <h1 className="text-3xl border-b-2 border-t-2 mt-5 border-sky-300 py-2">{post_title}</h1>
    <div className="flex gap-3">
    <div className="avatar">
  <div className="w-10 mask mask-squircle">
    <img src={author_image} />
  </div>
</div>
    <h2 className="text-2xl font-bold">{author_name}</h2>
    </div>
    <p>Post Date: {time}</p>

   <div className="flex gap-10 ">
   <p className="flex gap-1 items-center "><FaRegThumbsUp className="text-2xl text-cyan-500"/> {up_votes_count}</p>
    <p className="flex gap-1 items-center pt-2"><FaRegThumbsDown className="text-2xl text-cyan-500"/> {down_votes_count}</p>
   </div>

    <Link to={`/postDetails/${_id}`}>
    <button className="text-lg font-bold flex text-center items-center gap-2 hover:text-cyan-500">Vew Details <FaLongArrowAltRight /></button>
    </Link>
  </div>
</div>
    );
};

export default PostCard;