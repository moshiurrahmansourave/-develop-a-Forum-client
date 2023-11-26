import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Annunce = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to to image bb and then get the url
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        });
        if(res.data.success){
            // now send the Announcement data to the server with the image url
            const menuItem = {
                name: data.name,
                title: data.title,
                description: data.description,
                image: res.data.data.display_url
            }
            // now
            const menuRes = await axiosSecure.post('/announce', menuItem)
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                // show success popup
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log( 'with image url',res.data)
    };


    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Author Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Author Image"
                            {...register('name', {required:true})}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="flex gap-6">
                       
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Announcement Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Announcement title"
                                {...register('title' , {required:true})}
                                className="input input-bordered w-full " />
                        </div>
                    </div>
                    {/* recepi details */}
                    <div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>

                        </label>
                        <textarea {...register('description')}
                         className="textarea textarea-bordered h-24" placeholder="Description"></textarea>

                    </div>
                    {/* Author image input niput */}
                    <input {...register('image' , {required:true})} type="file" className="file-input my-4 w-full max-w-xs" />
                    </div>

                    <button className="btn bg-gradient-to-r  from-pink-500 to-yellow-500 ">Post Announcement</button>
                </form>
            </div>
        </div>
    );
};

export default Annunce;