import React from "react";

export default function FileSize() {
  return (
    <div className="col styling-content-pelatihan">
      <form action="">
        <div className="notification-title">
          <h1>File Size</h1>
        </div>
        <div className="form-group">
          <h3 className="judul">Image</h3>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="customFile" />
            <label className="custom-file-label" htmlFor="customFile">
              Choose file
            </label>
          </div>
        </div>
        <div className="form-group">
          <h3 className="judul">Document</h3>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="customFile" />
            <label className="custom-file-label" htmlFor="customFile">
              Choose file
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <button type="reset" className="btn btn-reset">
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-rounded-full bg-blue-primary text-white"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
