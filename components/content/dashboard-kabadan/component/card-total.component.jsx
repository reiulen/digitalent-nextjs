import React from "react";
import { helperFormatMoney } from "../../../../utils/middleware/helper";

const CardTotal = ({
  title = "Menghitung",
  value = 0,
  dailyAdd = 0,
  statisticDay = 0,
}) => {
  return (
    <>
      <div className="card card-custom bg-white">
        <div className="card-body">
          <p className="text-dashboard-neutral fz-16 fw-600">{title}</p>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <p className="text-dashboard-neutral fz-40 fw-700">
              {helperFormatMoney(value)}
            </p>
            <div className="d-flex">
              <i className="ri-arrow-up-s-fill text-success mr-2 fw-600 mt-1"></i>
              <p className="text-success fz-20 fw-600">{dailyAdd || 0}%</p>
            </div>
          </div>
          <p className="text-success fz-16 fw-500">
            +{statisticDay}
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
