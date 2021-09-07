import React from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const LoadingSkeleton = () => {
  return (
    <div className="container">
      <SkeletonTheme 
        color="#ecebeb"
        highlightColor="ffffff"
        // color="#a1a1a1" 
        // highlightColor="#ffffff"
      >  
        {/* <div className="row d-flex justify-content-between">
          <Skeleton width={200} height={150} />
          <Skeleton width={200} height={150} />
          <Skeleton width={200} height={150} />
          <Skeleton width={200} height={150} />
        </div> */}
        
        <div className="row">
          <Skeleton width={950} height={150} />
        </div>

        <div className="row mt-3">
          <Skeleton width={950} height={550} />
        </div>
        
      </SkeletonTheme>
    </div>
  )
}

export default LoadingSkeleton