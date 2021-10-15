import React, { useEffect, useState } from "react";
import Link from "next/link";

const SubHeaderComponent = () => {
    return (
        <div className="row mt-3 mx-1 p-3 bg-white rounded d-flex align-items-center border">
            <span>
                <Link href="#">
                    Beranda 
                </Link>
            </span>
            <span>
                <i className="ri-arrow-right-s-line"></i> 
            </span>
            <span>
                Insert BreadCrumb Here
            </span>
            
        </div>
    )
}

export default SubHeaderComponent