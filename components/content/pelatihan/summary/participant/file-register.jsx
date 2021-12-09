import React from "react";

const FileRegister = ({ file }) => {
  const handleDownload = (row) => {
    if (row.type.includes("file_doc") || row.type.includes("file_image")) {
      window.location.href =
        process.env.END_POINT_API_IMAGE_BEASISWA + row.value;
    }
  };
  return (
    <>
      <div className="card card-custom card-stretch gutter-b">
        <div className="card-body">
          <div className="row">
            {file &&
              file.map((row, i) => (
                <div className="col-md-6" key={i}>
                  <p className="text-neutral-body my-0">{row.name}</p>

                  <p
                    className={
                      row.type.includes("file_doc") ||
                      row.type.includes("file_image")
                        ? `text-primary`
                        : "text-dark"
                    }
                    style={
                      row.type.includes("file_doc") ||
                      row.type.includes("file_image")
                        ? { textDecoration: "underline", cursor: "pointer" }
                        : {}
                    }
                    onClick={() => {
                      handleDownload(row);
                    }}
                  >
                    {row.value}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileRegister;
