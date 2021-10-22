import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingNavbar = () => {
  return (
    <>
      <SkeletonTheme color="#ecebeb" highlightColor="ffffff">
        <Skeleton height="112px" width="100vw" />
      </SkeletonTheme>
    </>
  );
};

export default LoadingNavbar;
