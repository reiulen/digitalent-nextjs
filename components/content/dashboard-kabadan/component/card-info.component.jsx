import React from "react";
import StatistikProgres from "./statistik-progres.component";

const CardInfo = ({ title, data }) => {
  return (
    <>
      <div className="card card-custom border bg-white">
        <div className="card-body pb-3">
          <p className="text-dashboard-gray fz-16 fw-500">{title}</p>
          <div className="row mt-5">
            {data.map((row, i) => (
              <StatistikProgres
                key={i}
                user={row.title}
                value={row.percent}
                percent={row.percent}
                total={row.total}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
