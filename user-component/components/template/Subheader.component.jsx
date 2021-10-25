import React, { useEffect, useState } from "react";
import Link from "next/link";

const SubHeaderComponent = () => {
    return (
        <div className="row my-5 mx-1 py-3 px-8 bg-white rounded-pill d-flex align-items-center border">
            <span>
                <Link href="#">
                    Beranda 
                </Link>
            </span>
            <span>
                <i className="ri-arrow-right-s-line"></i> 
            </span>
            <span>
                {/* Insert BreadCrumb Here */}
                Vocational School Graduate Academy
            </span>
            
        </div>
    )
}

export default SubHeaderComponent