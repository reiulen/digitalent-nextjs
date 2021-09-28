import React from "react";

const HistoryPage = ({ history }) => {
  return (
    <div className="card card-custom card-stretch gutter-b">
      <div className="card-body">
        <div className="table-page mt-5">
          <div className="table-responsive">
            <table className="table table-separate table-head-custom table-checkable">
              <thead style={{ background: "#F3F6F9" }}>
                <tr>
                  <th>No</th>
                  <th>Pelatihan</th>
                  <th>Pelaksanaan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{row.pelatihan}</td>
                    <td>
                      <p className="font-weight-bolder my-0">
                        {row.pelaksanaan}
                      </p>
                    </td>
                    <td>
                      <span className="label label-inline label-light-success font-weight-bold">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
