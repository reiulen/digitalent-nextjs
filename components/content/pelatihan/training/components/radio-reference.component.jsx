import React, { useEffect, useState } from "react";
import axios from "axios";

const RadioReference = ({ id, token, onChangeValue }) => {
  const [optionsReference, setOptionsReference] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.END_POINT_API_SITE_MANAGEMENT +
          `api/reference/detail/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setOptionsReference(res.data.data.value_reference);
      });
  }, []);

  return (
    <>
      {optionsReference &&
        optionsReference.length > 0 &&
        optionsReference.map((row, i) => (
          <>
            <div className="form-check pb-3" key={i}>
              <input
                type="radio"
                name={"radiobutton"}
                className="form-check-input"
                value={row.value}
                onClick={(e) => onChangeValue(row.value)}
              />
              <label className="form-check-label">{row.value}</label>
            </div>
          </>
        ))}
    </>
  );
};

export default RadioReference;