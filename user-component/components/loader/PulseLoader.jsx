import React from "react";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const PulseLoaderRender = () => {
  const override = css`
    margin: 0 auto;
  `;
  return (
    <>
      <div className="text-center col-12">
        <PulseLoader color="#007CFF" loading={true} css={override} size={10} />
      </div>
    </>
  );
};

export default PulseLoaderRender;
