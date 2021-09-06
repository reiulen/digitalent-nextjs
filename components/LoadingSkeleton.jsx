import React from "react"
import ContentLoader from "react-content-loader"

const LoadingSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={1500}
    viewBox="0 0 1000 1500"
    backgroundColor="#ffffff"
    foregroundColor="#ffffff"
    {...props}
  >
    {/* <rect x="50" y="250" rx="0" ry="0" width="1000" height="50" />  */}
    <rect x="50" y="20" rx="30" ry="30" width="200" height="150" /> 
    <rect x="300" y="20" rx="30" ry="30" width="200" height="150" /> 
    <rect x="550" y="20" rx="30" ry="30" width="200" height="150" /> 
    <rect x="800" y="20" rx="30" ry="30" width="200" height="150" /> 
    <rect x="50" y="200" rx="0" ry="0" width="1000" height="550" />
  </ContentLoader>
)

export default LoadingSkeleton