import React from "react";

const ProgressBar = ({ completed }) => {
  const strokeDasharray = 282.74; // Circumference of the circle (2 * π * radius, radius = 45px)
  const strokeDashoffset = strokeDasharray - (completed / 100) * strokeDasharray;

  return (
    <div className="circular-progress-container">
      <svg className="circular-progress" width="100" height="100">
        <circle
          className="progress-background"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          fill="none"
        />
        <circle
          className="progress-circle"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="progress-text">
        {Math.round(completed)}%
      </div>
    </div>
  );
};

export default ProgressBar;
