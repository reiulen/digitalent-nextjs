import React from "react";

const CardTotal = ({ title, value, dailyAdd, statisticDay }) => {
  return (
    <>
      <div className="card card-custom bg-white">
        <div className="card-body">
          <p className="text-dashboard-gray fz-16 fw-500">{title}</p>
          <div className="d-flex justify-content-between align-items-center">
            <p className="text-dashboard-neutral fz-40 fw-700">{value}</p>
            <div className="d-flex">
              <i className="ri-arrow-up-s-fill text-success mr-2 fw-600"></i>
              <p className="text-success fz-16 fw-600">{dailyAdd}%</p>
            </div>
          </div>
          <p className="text-success fz-16 fw-500">
            {statisticDay}
            <span className="text-dashboard-neutral font-italic">
              {" "}
              (Total Penambahan Data Kemarin)
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CardTotal;
