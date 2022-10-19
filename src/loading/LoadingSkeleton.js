import React from "react";

const LoadingSkeleton = ({ width, height, radius = "8px", className }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: width || "100%",
        height: height || "100%",
        borderRadius: radius,
      }}
    ></div>
  );
};

export default LoadingSkeleton;
