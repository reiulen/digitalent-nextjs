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
                  <a
                    onClick={() => {
                      handleDownload(row.value);
                    }}
                    href={`${process.env.END_POINT_API_IMAGE_BEASISWA}${row.value}`}
                    style={{ cursor: "pointer" }}
                  >
                    <p
                      className="text-primary"
                      style={{ textDecoration: "underline" }}
                    >
                      {row.value}
                    </p>
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileRegister;
