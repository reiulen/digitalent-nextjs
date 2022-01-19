import React from "react";

const FileRegister = ({ file }) => {
  return (
    <>
      <div className="card card-custom card-stretch gutter-b">
        <div className="card-body">
          <div className="row">
            {file &&
              file.map((row, i) => (
                <div className="col-md-6" key={i}>
                  <p className="text-neutral-body my-0">{row.name}</p>
                  <p className="text-dark">{row.value}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileRegister;
