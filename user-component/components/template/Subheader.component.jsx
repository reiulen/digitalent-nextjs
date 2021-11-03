import React, { useEffect, useState } from "react";
import Link from "next/link";

const SubHeaderComponent = () => {
  return (
    <div className="rounded-pill d-flex align-items-center border px-4 py-2 mb-md-10 mb-5">
      <span className="text-primary">
        <Link href="/">Beranda</Link>
      </span>
      <span className="mx-2">
        <i className="ri-arrow-right-s-line"></i>
      </span>
      <span>
        {/* Insert BreadCrumb Here */}
        Vocational School Graduate Academy
      </span>
    </div>
  );
};

export default SubHeaderComponent;
