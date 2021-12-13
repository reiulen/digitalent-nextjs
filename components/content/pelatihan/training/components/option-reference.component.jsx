import React, { useEffect, useState } from "react";
import axios from "axios";

const OptionsReference = ({ id, token }) => {
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
          <option key={i} value={row.value}>{row.value}</option>
        ))}
    </>
  );
};

export default OptionsReference;
