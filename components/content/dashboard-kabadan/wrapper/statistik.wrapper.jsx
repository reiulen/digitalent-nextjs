import React from "react";

const StatistikWrapper = ({ title, funcFilterYear, year = [] }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <p className="text-dashboard-gray fz-16 fw-500 mt-3">{title}</p>
        <div className="d-flex align-items-center">
          <p className="mt-4 mr-3 text-dashboard-gray-caption">Tahun:</p>
          <select
            onChange={(e) => funcFilterYear(e.target.value)}
            className="border-0 p-0"
          >
            {year &&
              year.map((row, i) => (
                <option key={i} value={row}>
                  {row}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default StatistikWrapper;
