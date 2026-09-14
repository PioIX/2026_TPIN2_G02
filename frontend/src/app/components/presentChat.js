import Image from "next/image";

export default function PresentChat(chatImg,chatName) {
    return(
        <div>
            <Image
            // src={chatImg}
            src="/globe.svg"
            width={55}
            height={55}
            alt=""
            />
            {/* <h2>{chatName}</h2>    */}
            <h2>si</h2>
        </div>
    )
    
}