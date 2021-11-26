import React from "react";

const StatistikProgres = ({ user, value, percent, total }) => {
  return (
    <>
      <div className="mb-3 col-md-12 row mr-0 pr-0">
        <div className="col-6">
          <p className="text-dashboard-neutral mb-0 fz-14 text-user-progres">
            {user}
          </p>
        </div>

        <div className="col-6 text-right pr-0 mr-0">
          <p className="text-dashboard-neutral mb-0 fz-14 fw-600 pr-0 mr-0">
            {percent + `%`} ({total})
          </p>
        </div>
      </div>
      <div className="col-md-12 mb-5">
        <div className="row">
          <div className="col-md-12">
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
        </div>
      </div>
    </>
  );
};

export default StatistikProgres;
