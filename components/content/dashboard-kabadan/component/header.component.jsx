import React from "react";

const Header = ({ name, text }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-12 mt-4">
          <div className="card card-custom bg-white">
            <div className="card-body p-10">
              <h2>
                Selamat Datang, <br /> {name}
              </h2>{" "}
              <p>Selamat Datang di Dashboard {text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
