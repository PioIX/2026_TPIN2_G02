"use client"
import React from "react";
import Image from "next/image";
import { useState } from "react";



export default function Pfp() {
    return(
    <div className="pfp">
        <Image
        // src={pfp}
        src="/globe.svg"
        height={67}
        width={67}
        alt="pene" />
    </div>
    );
}