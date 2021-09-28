import React from "react";

const FileRegister = ({ file }) => {
  return (
    <>
      <div className="card card-custom card-stretch gutter-b">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-12">
              <p className="text-neutral-body my-0">Universitas</p>
              <p className="text-dark">{file.universitas}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <p className="text-neutral-body my-0">IPK</p>
              <p className="text-dark">{file.ipk}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="text-neutral-body my-0">Tahun Daftar Kuliah</p>
              <p className="text-dark">{file.tahunDaftar}</p>
            </div>
            <div className="col-md-6">
              <p className="text-neutral-body my-0">Tahun Lulus Kuliah</p>
              <p className="text-dark">{file.tahunLulus}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileRegister;
