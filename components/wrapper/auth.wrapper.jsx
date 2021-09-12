import React from "react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

const AuthWrapper = ({ children, image }) => {
  return (
    <>
      <div className="authentication-wraper">
        <ToastContainer position="top-right" />
        <div className="row m-0 bg-white" style={{ minHeight: "100vh" }}>
          <div
            className="col-lg-5 p-0 d-none d-lg-block"
            style={{
              backgroundImage: `url(/assets/media/${image})`,
              backgroundSize: "cover",
              objectFit: "cover",
            }}
          ></div>
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthWrapper;
