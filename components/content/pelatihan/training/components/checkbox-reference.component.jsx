import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckboxReference = ({ id, token, onChangeValue }) => {
  const [optionsReference, setOptionsReference] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.END_POINT_API_SITE_MANAGEMENT +
          `api/option/reference-choose/${id}?paginate=false`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setOptionsReference(res.data.data);
      });
  }, []);

  return (
    <>
      {optionsReference &&
        optionsReference.length > 0 &&
        optionsReference.map((row, i) => (
          <>
            <div className="form-check pb-3" key={row.label}>
              <input
                type="checkbox"
                name="checkboxRegister"
                className="form-check-input"
                value={row.label}
                onChange={(e) => onChangeValue(row.label)}
              />
              <label className="form-check-label">{row.label}</label>
            </div>
          </>
        ))}
    </>
  );
};

export default CheckboxReference;
