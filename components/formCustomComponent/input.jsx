import React, { Fragment, useEffect } from "react";

export function CustomNumberInput({ state, placeholder, onChange }) {
  useEffect(() => {
    const number = document.getElementById(`number-${state}`);
    // number.onkeydown = (e) => {
    //   if (e.code == "Minus") {
    //     return false;
    //   }
    //   if (e.code == "Period") {
    //     return false;
    //   }
    //   if (e.code == "NumpadAdd") {
    //     return false;
    //   }
    //   if (e.code == "NumpadSubtract") {
    //     return false;
    //   }
    //   if (e.code == "Equal") {
    //     return false;
    //   }
    // };
    console.log(state);
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
