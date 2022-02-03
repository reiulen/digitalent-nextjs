import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

const LoadingMap = ({ loading }) => {
  const override = css`
    margin: 0 auto;
  `;
  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 3,
          top: 0,
          width: "100%",
          height: "100%",
          background: "rgba(221, 222, 221, 0.32)",
        }}
      >
        <div
          className="d-flex justify-content-center"
          style={{
            position: "absolute",
            top: "35%",
            left: "45%",
            opacity: "unset",
          }}
        >
          <div className="text-center mt-10">
            <BounceLoader
              color="#1b3a59"
              loading={loading}
              css={override}
              size={80}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingMap;
