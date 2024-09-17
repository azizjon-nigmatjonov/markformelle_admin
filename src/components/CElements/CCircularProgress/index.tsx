import React from 'react';
import './style.scss';

type CircularProgressProps = {
    value: number;
    maxValue: number;
    unit?: string;
    label?: string;
    size?: number;
    strokeWidth?: number;
    children?: any
};

const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    maxValue,
    size = 90,
    strokeWidth = 10,
    children
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min((value / maxValue) * 100, 100);
    const dashOffset = circumference - (progress / 100) * circumference;

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
                    stroke="#4caf50"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                />
            </svg>
            <div className="circular-progress-text">
                {children}
                {/* <span className="value">{value.toFixed(2)}</span>
        <span className="max">/ {maxValue.toFixed(2)} {unit}</span>
        {label && <span className="label">{label}</span>} */}
            </div>
        </div>
    );
};

export default CircularProgress;
