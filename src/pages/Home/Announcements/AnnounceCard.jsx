

const AnnounceCard = ({ announce }) => {
    const { description, name, image, title } = announce
    return (
       <div className="pt-20">
         <div className="rounded-xl backdrop-blur-md bg-white/10  text-white shadow-md p-3 lg:min-h-[330px]">
            <div className="flex gap-2 items-center">
                <div className="avatar">
                    <div className="w-16 mask mask-hexagon">
                        <img src={image} />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold">{name}</h1>
            </div>
            <div className="text-center">
            <h2 className="text-xl font-semibold underline my-3">{title}</h2>
            </div>
            <p className="text-lg">{description}</p>
        </div>
       </div>
    );
};

export default AnnounceCard;