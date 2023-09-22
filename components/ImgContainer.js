import Image from "next/image";

function ImgContainer({ photo }) {

    function sliceTextTo12Letters(text) {
        return text.slice(0, 20);
    }

    const slicedAltText = sliceTextTo12Letters(photo.alt);

    return (
        <div className="relative">
            <Image
                src={photo.src.large}
                alt={photo.alt}
                width={500}
                height={500}
                className="rounded-xl overflow-hidden"
            />
            {/* Add the tag element here */}
            <div className="absolute bottom-2 right-2 bg-[#0b0804] text-[#eeeaa9] px-2 py-1 rounded-lg text-xs">
                {slicedAltText}
            </div>
        </div>
    );
}

export default ImgContainer;
