import { useEffect, useState } from "react";
import AnnounceCard from "./AnnounceCard";


const Announcements = () => {
    const [allAnnounce, setAllannounce] = useState([])
    console.log(allAnnounce)
    useEffect(()=>{
        fetch('https://assignment-12-final-server-three.vercel.app/announce')
        .then(res =>res.json())
        .then(data => setAllannounce(data))
    },[])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {
                allAnnounce.map(announce => <AnnounceCard
                key={announce._id}
                announce={announce}
                ></AnnounceCard>)
            }
        </div>
    );
};

export default Announcements;