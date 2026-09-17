"use client"
import React from "react";
import Image from "next/image";
import { useState } from "react";



export default function Chat(chatImg,chatName) {
    return(
        <div className="chat">
            <Image
            // src={chatImg}
            src="/globe.svg"
            width={55}
            height={55}
            alt=""
            />
            
            <div className="chatPre">
                {/* <h3>{chatName}</h3> */}
                <h3>nombre</h3>
                {/* <p>{chatLast}</p> */}
                <p>descripcion</p>
            </div>
        </div>
        
    );
}
