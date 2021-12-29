import React from "react";
import StatistikProgres from "./statistik-progres.component";

const ListCardInfo = ({ data }) => {
  return (
    <>
      <div className="row mt-5 ">
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
    </>
  );
};

export default ListCardInfo;
