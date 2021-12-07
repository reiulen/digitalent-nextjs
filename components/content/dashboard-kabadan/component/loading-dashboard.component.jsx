import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

const LoadingDashboard = ({ loading }) => {
  const override = css`
    margin: 0 auto;
  `;
  return (
    <>
      <div className="text-center mt-10">
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

export default LoadingDashboard;
