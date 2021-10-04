import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    return (
        <>
            <a href="/login">
                <button className="btn btn-primary-rounded-full rounded-pill btn-sm">
                    Login
                </button>
            </a>
            
        </>
    )
}

export default Navbar