import React from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const LoadingSkeleton = () => {
  return (
    <div className="container">
      <SkeletonTheme 
        color="#a1a1a1" 
        highlightColor="#ffffff"
      >  
        <div className="row d-flex justify-content-between">
          <Skeleton width={200} height={150} />
          <Skeleton width={200} height={150} />
          <Skeleton width={200} height={150} />
          <Skeleton width={200} height={150} />
        </div>

        <div className="row mt-2">
          <Skeleton width={990} height={550} />
        </div>
        
      </SkeletonTheme>
    </div>
  )
}

export default LoadingSkeleton