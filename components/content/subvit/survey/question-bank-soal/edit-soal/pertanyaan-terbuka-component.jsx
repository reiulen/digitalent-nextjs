import React, { useState } from "react";

const PertanyaanTerbukaComponent = ({ propsStatus, sendPropsStatus }) => {
  const [status, setStatus] = useState(propsStatus);

  return (
    <>
      <div className="form-group row">
        <div className="col-sm-12 col-md-5">
          <span>Status</span>
          <select
            name="training_id"
            className="form-control"
            onChange={(e) => {
              setStatus(e.target.value);
              sendPropsStatus(e.target.value);
            }}
            onBlur={(e) => {
              setStatus(e.target.value);
              sendPropsStatus(e.target.value);
            }}
            value={status}
          >
            <option selected disabled value="">
              -- Status --
            </option>
            <option value={1}>Publish</option>
            <option value={0}>Draft</option>
          </select>
          <span className="text-muted">Silahkan Pilih Status</span>
        </div>
      </div>
    </>
  );
};

export default PertanyaanTerbukaComponent;
