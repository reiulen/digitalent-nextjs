import React, { useEffect, useState } from "react";
import axios from "axios";

const OptionsReference = ({ id, token }) => {
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
            <option key={i} value={row.label}>
              {row.label}
            </option>
          </>
        ))}
    </>
  );
};

export default OptionsReference;
