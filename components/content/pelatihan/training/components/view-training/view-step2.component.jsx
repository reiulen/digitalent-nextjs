import React from "react";
import { helperElementRender } from "../../../../../../utils/middleware/helper";

const ViewStep2Component = ({ titleForm, formBuilder, token }) => {
  return (
    <>
      <h3 className="text-neutral-bodyer pb-5 pt-4">{titleForm}</h3>

      <div className="row justify-content-end">
        {formBuilder &&
          formBuilder !== null &&
          formBuilder.length > 0 &&
          formBuilder.map((row, i) => <>{helperElementRender(row, token)}</>)}
      </div>
    </>
  );
};

export default ViewStep2Component;
