import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useLoaderData } from "react-router-dom";
import '../AllPost/AllPost.css'
import { FaArrowCircleLeft, FaArrowCircleRight, FaSearch } from "react-icons/fa";



const AllPost = () => {
    const [ posts, setPosts] = useState([])
    const [searchData, setSearchData] = useState("");
    const [sortOrder, setSortOrder] = useState("des");

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


    const handleSortByPopularity = () => {
        const sortedPosts = [...posts];
    
        sortedPosts.sort((a, b) => {
          const totalVotesA = a.up_votes_count - a.down_votes_count;
          const totalVotesB = b.up_votes_count - b.down_votes_count;
    
          if (sortOrder === "des") {
            return totalVotesB - totalVotesA;
          } else {
            return totalVotesA - totalVotesB;
          }
        });
    
        setPosts(sortedPosts);
        setSortOrder(sortOrder === "des" ? "asc" : "des");
      };


    const handleSearch = () => {
        const searchFild = document.getElementById('Search-fild')
        const searchText = searchFild.value;
        console.log(searchText)
        if (searchText.length > 0) {
            const newData = posts.filter(item => item.tags == searchText)
            console.log(posts.tags)

            if (newData) {
                setSearchData(newData)
            }
        }
        else {
            setSearchData(posts)
        }

    }


    return (
        <div>
            
        <div className="flex justify-center -mt-12 mb-5">
            <div className='flex'>
                    <input id="Search-fild" type="text"  placeholder="Type here" className="input rounded-none rounded-l-3xl text-black w-full max-w-xs" />
                    <button onClick={handleSearch} id='btn-box' className="btn rounded-none "><div className='flex gap-2'> <FaSearch></FaSearch> Search</div></button>
            </div>
            <button className="btn btn-outline" onClick={handleSortByPopularity}>
          Sort by Vote
        </button>
         </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            { searchData ?
                searchData.map(post => <PostCard
                key={post._id}
                post={post}
                ></PostCard>)
                :
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