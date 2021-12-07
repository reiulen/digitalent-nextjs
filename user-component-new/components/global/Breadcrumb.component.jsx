import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";

const BreadcrumbComponent = ({ data = [] }) => {
  return (
    <div className="rounded-pill d-flex align-items-center border px-4 py-2 mb-10">
      <span className="text-primary trim-text-mobile">
        <Link href="/">Beranda</Link>
      </span>
      {data &&
        data.length > 0 &&
        data.map((row, i) => (
          <div
            className="link-bredcumd d-flex align-items-center module-pelatihan-mitra"
            key={i}
          >
            <span className="mx-2">
              <i className="ri-arrow-right-s-line"></i>
            </span>
            <Fragment>
              {i === data.length - 1 ? (
                <span className="trim-text-mobile-last">{row.name}</span>
              ) : row.name.length > 25 ? (
                <Link href={row.link} passHref>
                  <span
                    className="text-primary trim-text-mobile"
                    style={{ cursor: "pointer" }}
                  >
                    {row.name}
                  </span>
                </Link>
              ) : (
                <Link href={row.link} passHref>
                  <span className="text-primary" style={{ cursor: "pointer" }}>
                    {row.name}
                  </span>
                </Link>
              )}
            </Fragment>
          </div>
        ))}
    </div>
  );
};

export default BreadcrumbComponent;
