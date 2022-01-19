import React from "react";
import Image from "next/image";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

const AuthWrapper = ({ children, image, title,bgOpacity }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="authentication-wraper">
        <ToastContainer position="top-right" />
        <div className="row m-0 bg-white" style={{ minHeight: "100vh" }}>
          <div
            className="col-lg-5 p-0 d-none d-lg-block position-relative"
            style={{
              backgroundImage: `url(/assets/media/${image})`,
              backgroundSize: "cover",
              objectFit: "cover",
            }}
          >
            {bgOpacity}
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthWrapper;
