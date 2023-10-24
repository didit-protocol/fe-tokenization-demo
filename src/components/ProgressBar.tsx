// components/ProgressBar.tsx
import React, { FC } from "react";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ percentage }) => (
  <div className="mb-2 bg-gray-300 rounded-full h-2">
    <div
      style={{ width: `${percentage}%` }}
      className="bg-blue-500 h-2 rounded-full"
    ></div>
  </div>
);

export default ProgressBar;
