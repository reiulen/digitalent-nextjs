import React, { useEffect, useState } from "react";
import Link from "next/link";

const BreadcrumbComponent = ({ data = [] }) => {
  return (
    <div className="rounded-pill d-flex align-items-center border px-4 py-2 mb-10">
      <span className="text-primary">
        <Link href="/">Beranda</Link>
      </span>
      {data &&
        data.length > 0 &&
        data.map((row, i) => (
          <div className="link-bredcumd d-flex align-items-center" key={i}>
            <span className="mx-2">
              <i className="ri-arrow-right-s-line"></i>
            </span>
            <Link href={row.link} passHref>
              {i === data.length - 1 ? (
                row.name.length > 25 ? (
                  <span className="trim-text-mobile">{row.name}</span>
                ) : (
                  <span className="trim-text-mobile">{row.name}</span>
                )
              ) : row.name.length > 25 ? (
                <span
                  className="text-primary trim-text-mobile"
                  style={{ cursor: "pointer" }}
                >
                  {row.name}
                </span>
              ) : (
                <span
                  className="text-primary trim-text-mobile"
                  style={{ cursor: "pointer" }}
                >
                  {row.name}
                </span>
              )}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BreadcrumbComponent;
