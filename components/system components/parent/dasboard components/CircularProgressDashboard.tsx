import React from "react";

interface CircularProgressProps {
  value: number; // 0 - 100
  size?: number; // diameter in px
  strokeWidth?: number;
  color?: string; // progress stroke color
  bgColor?: string; // background stroke color
  className?: string; // additional Tailwind classes
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#f43f5e", // default pink-red
  bgColor = "#e5e7eb", // default gray-200
  className = "",
}) => {
  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={`inline-block ${className}`}>
      <svg height={size} width={size}>
        {/* Background circle */}
        <circle
          stroke={bgColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />

        {/* Centered text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-sm font-semibold fill-current text-gray-800"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
};
