import React, { Fragment, useEffect } from "react";

export function CustomNumberInput({ state, placeholder, onChange }) {
  useEffect(() => {
    const number = document.getElementById(`number-${state}`);
  }, [state]);

  return (
    <Fragment>
      <input
        placeholder={placeholder}
        type="number"
        value={state}
        onChange={(e) => onChange(e)}
        // onChange={(e) => onChange(e)}
        className="form-control"
        id={`number-${state}`}
      />
    </Fragment>
  );
}
