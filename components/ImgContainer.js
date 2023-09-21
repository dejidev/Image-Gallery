import Image from "next/image";

function ImgContainer({ photo }) {


    return (

        <Image
            src={photo.src.large}
            alt={photo.alt}
            width={500}
            height={500}
            className="rounded-xl relative overflow-hidden"

        />
    );
}

export default ImgContainer;
