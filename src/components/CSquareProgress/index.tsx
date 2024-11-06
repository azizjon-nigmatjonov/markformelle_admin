import React, { useMemo } from "react";
import "./style.scss";

type SquareProgressProps = {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
  children?: any;
};

const SquareProgress: React.FC<SquareProgressProps> = ({
  value,
  maxValue,
  size = 90,
  strokeWidth = 10,
  children,
}) => {
  const sideLength = size - strokeWidth;
  const progress = Math.min((value / maxValue) * 100, 100);

  // Calculate the total perimeter for the square (4 sides)
  const perimeter = sideLength * 4;

  // Calculate the offset for progress
  const dashOffset = useMemo(() => {
    return perimeter - (progress / 100) * perimeter;
  }, [progress, perimeter]);

  return (
    <div className="square-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Square background */}
        <rect
          className="square-background"
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={sideLength}
          height={sideLength}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        {/* Square progress */}
        <rect
          className="square-progress"
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={sideLength}
          height={sideLength}
          fill="transparent"
          stroke="#1f7a1f"
          strokeWidth={strokeWidth}
          strokeDasharray={perimeter}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="square-progress-text">{children}</div>
    </div>
  );
};

export default SquareProgress;
