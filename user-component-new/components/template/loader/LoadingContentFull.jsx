import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingContentFull = () => {
	return (
		<>
			<SkeletonTheme color="#E1DFDF" highlightColor="ffffff">
				<Skeleton height="100vh" width="100vw" />
			</SkeletonTheme>
		</>
	);
};

export default LoadingContentFull;
