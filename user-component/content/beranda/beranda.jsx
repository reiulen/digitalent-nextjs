import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const Navbar = dynamic(() => import("../../../components/templates/navbar.component"), {
    ssr: false,
  });

const Beranda = () => {
    return (
        <>
            <Navbar />
            <h1>
                Welcome Home
            </h1>
        </>
    )
}

export default Beranda