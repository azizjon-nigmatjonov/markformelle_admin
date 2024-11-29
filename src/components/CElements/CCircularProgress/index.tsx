import React, { useMemo } from "react";
import "./style.scss";

type CircularProgressProps = {
  value: number;
  maxValue: number;
  unit?: string;
  label?: string;
  size?: number;
  strokeWidth?: number;
  children?: any;
  strokeColor?: string;
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  maxValue,
  size = 90,
  strokeWidth = 10,
  children,
  strokeColor = "#1f7a1f",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate progress based on value and maxValue
  const progress = Math.min((value / maxValue) * 100, 100);

  // Use useMemo for efficient calculation
  const dashOffset = useMemo(() => {
    return circumference - (progress / 100) * circumference;
  }, [progress, circumference]); // Depend on progress and circumference

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="circle-background"
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="circle-progress"
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="circular-progress-text">{children}</div>
    </div>
  );
};

export default CircularProgress;
