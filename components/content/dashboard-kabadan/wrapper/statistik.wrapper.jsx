import React from "react";

const StatistikWrapper = ({ title, funcFilterYear }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <p className="text-dashboard-gray fz-16 fw-500 mt-3">{title}</p>
        <div className="d-flex align-items-center">
          <p className="mt-3 mr-3 text-dashboard-gray-caption">Tahun:</p>
          <select
            onChange={(e) => funcFilterYear(e.target.value)}
            className="border-0 p-0"
          >
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default StatistikWrapper;
