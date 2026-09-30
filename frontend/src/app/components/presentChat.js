import Image from "next/image";

export default function PresentChat({chatImg,chatName}) {
    return(
        <div>
            <Image
            src={chatImg || "/globe.svg"}
            width={55}
            height={55}
            alt=""
            />
            <h2>{chatName}</h2>
        </div>
    )
    
}