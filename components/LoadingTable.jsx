import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

const LoadingTable = ({ loading }) => {
  const override = css`
    margin: 0 auto;
  `;
  return (
    <>
      <div className="loading text-center justify-content-center">
        <BeatLoader
          color="#3699FF"
          loading={loading}
          css={override}
          size={10}
        />
      </div>
    </>
  );
};

export default LoadingTable;
