import React from "react";

const Header = ({ name, text, value = 0, dailyAdd = 0, statisticDay = 0 }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-12 mt-4">
          <div className="card card-custom bg-white h-100">
            <div className="card-body p-10">
              <h2>
                Selamat Datang, <br /> {name}
              </h2>{" "}
              <p>Selamat Datang di Dashboard {text}</p>
              <div className="total-pengguna-header mt-5">
                <p className="text-dashboard-gray fz-16 fw-500">
                  Total Seluruh Pengguna
                </p>
                <div className="d-flex align-items-center">
                  <h1 className="text-dashboard-neutral fz-40 fw-700 mr-5">
                    {value}
                  </h1>
                  <div className="d-flex">
                    <i className="ri-arrow-up-s-fill text-success mr-2 fw-600"></i>
                    <p className="text-success fz-16 fw-600">{dailyAdd}%</p>
                  </div>
                </div>
                <p className="text-success fz-16 fw-500">
                  +{statisticDay}{" "}
                  <span className="text-dashboard-neutral font-italic">
                    {" "}
                    (Total Penambahan Data Kemarin)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
