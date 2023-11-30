
import '../Footer/Footer.css'

const Footer = () => {
    return (
      <div>
      <footer className="footer font-bold homefo text-base-content ">
<aside>


<img className="w-20  rounded-full" src="https://i.ibb.co/0jyrXKF/attachment-85388280.jpg" alt="" />
<p className="text-xl font-bold text-cyan-400">Forum us</p>
<p className="text-xl">Sedut perspiciatis unde <br /> omnis iste natus error sitlutem <br /> acc usantium doloremque denounce <br /> with illo inventore veritatis</p>
</aside> 
<nav>
<header className="text-xl font-bold text-cyan-400 underline">ADDRESS</header> 
<a className="link link-hover">374 William S Canning Blvd, River MA <br /> 2721, USA</a> 
<a className="link link-hover">(+880)155-69569
</a> 
<a className="link link-hover">support@rstheme.com</a> 

</nav> 
<nav>
<header className="text-xl font-bold text-cyan-400 underline">COURSES</header> 
<a className="link link-hover">Courses</a> 
<a className="link link-hover">Course Two</a> 
<a className="link link-hover">Single Course</a> 
</nav> 
<nav>
<header className="text-xl font-bold text-cyan-400 underline">RECENT POSTS</header> 
<a className="link link-hover">High School Program Starting Soon 2021 <br />
October 15, 2020</a> 
<a className="link link-hover">Shutdown Of Schools</a> 

</nav>
</footer>
  </div>
    );
};

export default Footer;