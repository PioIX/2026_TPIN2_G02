"use client"
import { useState } from "react";
import Image from "next/image";

export default function PresentChat({chatImg,chatName}) {
    const [error, setError] = useState(false);
    return(
        <div>
            <Image
            src={error || !chatImg ? "/globe.svg" : chatImg}
            width={55}
            height={55}
            alt=""
            unoptimized
            onError={() => setError(true)}
            />
            <h2>{chatName}</h2>
        </div>
    )
    
}