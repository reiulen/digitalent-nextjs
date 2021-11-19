import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingFooter = () => {
  return (
    <>
      <SkeletonTheme color="#ecebeb" highlightColor="ffffff">
        <Skeleton height="570px" width="100vw" />
      </SkeletonTheme>
    </>
  );
};

export default LoadingFooter;
