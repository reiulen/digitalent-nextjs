import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingHeader = () => {
  return (
    <>
      <SkeletonTheme color="#ecebeb" highlightColor="ffffff">
        <Skeleton height="300px" width="100vw" />
      </SkeletonTheme>
    </>
  );
};

export default LoadingHeader;
