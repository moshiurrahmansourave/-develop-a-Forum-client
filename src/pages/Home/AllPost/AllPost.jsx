import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useLoaderData } from "react-router-dom";
import '../AllPost/AllPost.css'
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";


const AllPost = () => {
    const [ posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const {count} = useLoaderData()
    
    const numberOfPages = Math.ceil(count/ itemsPerPage)

    
    const pages = [...Array(numberOfPages).keys()]

    useEffect(()=>{
        fetch(`http://localhost:5001/allPost?page=${currentPage}&size=${itemsPerPage}`)
        
        .then(res => res.json())
        .then(data => setPosts(data))
    }, [currentPage,itemsPerPage])


    const handlePrevPeg = () =>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPeg = () =>{
        if(currentPage < pages.length -1){
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {
                posts.map(post => <PostCard
                key={post._id}
                post={post}
                ></PostCard>)
            }
           </div>
           {/* pagination part */}
           <div className="text-white text-center pagination my-10">
            {/* <p>current page: {currentPage}</p> */}
            <button onClick={handlePrevPeg} className="circle-btn"><FaArrowCircleLeft /></button>
            {
                pages.map(page => <button 
                    id="btn-style"
                className={currentPage === page ? 'selected' : undefined}
                onClick={() => setCurrentPage(page)}
                key={page}>{page}</button>)
            }
            <button onClick={handleNextPeg} className=" circle-btn"><FaArrowCircleRight /></button>
           </div>
        </div>
    );
};

export default AllPost;