import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPost = () => {

    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to to image bb and then get the url
        const imageFile = {image: data.post_image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {
                'content-type' : 'multipart/form-data'
            }
        });
        if(res.data.success){
            // now send the menu item data to the server with the image url
            const post = {
                author_name: data.name,
                email: data.email,
                post_title: data.title,
                tag: data.tag,
                description: data.discription,
                post_image: res.data.data.display_url,
                up_votes_count: 0,
                down_votes_count: 0
            }
            // now
            const menuRes = await axiosSecure.post('/allPost', post)
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                // show success popup
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the Post`,
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
                    <div className="flex gap-6  ">
                    <div className="form-control w-full my-6">
                        <label className="label ">
                            <span className="label-text text-white underline">Author Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Author Name"
                            {...register('name', {required:true})}
                            className="input input-bordered w-full " />
                    </div>
                             {/* email */}
                        <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text text-white underline">Author email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Author email"
                            {...register('email', {required:true})}
                            className="input input-bordered w-full " />
                        </div>
                    </div>
                       
                       <div className="flex gap-8  ">
                         {/* Post title */}
                         <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text text-white underline">Post Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Post title"
                                {...register('title' , {required:true})}
                                className="input input-bordered w-full " />
                        </div>

                        {/* tag */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text text-white underline">Tag</span>
                            </label>
                            <select defaultValue={'default'} {...register("tag" , {required:true})}
                                className="select select-bordered w-full ">
                                <option disabled value={'default'}>Select a tag</option>
                                <option value="html">html</option>
                                <option value="css">css</option>
                                <option value="javascript">javascript</option>
                                <option value="social">social</option>
                                <option value="python">python</option>
                                <option value="mongodb">mongodb</option>

                            </select>
                        </div>
                       </div>
                    
                    {/* recepi details */}
                    
                    <div className="form-control  ">
                        <label className="label">
                            <span className="label-text text-white underline">Post discription</span>
                        </label>
                        <textarea {...register('discription')}
                         className="textarea textarea-bordered h-24" placeholder="Post discription"></textarea>

                    </div>

                    {/* image fild */}
                    <div className="flex gap-10 mt-8 ">
                       
                       <div>
                         {/* file niput post image */}
                        <p className="text-lg text-white "> Post image</p>
                    <input {...register('post_image' , {required:true})} type="file" className="file-input my-4 w-full max-w-xs" />
                       </div>
                    </div>
                            <button 
                    className="btn bg-gradient-to-r  from-pink-500 to-yellow-500 ">Add Post
                    </button>
                            
                </form>
            </div>
        </div>
    );
};

export default AddPost;