import React from "react";

const StatistikProgres = ({ user, value, percent, total }) => {
  return (
    <>
      <div className="col-md-5">
        <p className="text-dashboard-neutral fz-14">
          {user.length > 20 ? user.substring(0, 14) + "..." : user}
        </p>
      </div>
      <div className="col-md-7">
        <div className="row">
          <div className="col-md-7">
            <div className="progress">
              <div
                style={{ width: value + "%" }}
                className={`progress-bar bg-dashboard-primary-shade`}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="col-md-5">
            <p className="text-dashboard-neutral fz-14 fw-600">
              {percent + `%`} ({total})
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatistikProgres;
