import React from "react";

interface CircularProgressProps {
  userCount: number;
  actualCount: number;

  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

export const CircularCountProgress: React.FC<CircularProgressProps> = ({
  userCount,
  actualCount,

  size = 120,
  strokeWidth = 8,
  color = "#f43f5e",
  bgColor = "#e5e7eb",
  className = "",
}) => {
  // ✅ Prevent division by zero
  const percentage =
    actualCount > 0 ? Math.min((userCount / actualCount) * 100, 100) : 0;

  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`inline-block ${className}`}>
      <svg height={size} width={size} className="-rotate-90 transform">
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

        {/* Center Content */}
        <g transform={`rotate(90 ${radius} ${radius})`}>
          {/* Fraction */}
          <text
            x="50%"
            y="48%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-gray-800 font-bold"
            style={{
              fontSize: size * 0.16,
            }}
          >
            {userCount}/{actualCount}
          </text>

          {/* Percentage */}
          <text
            x="50%"
            y="62%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-gray-500 font-medium"
            style={{
              fontSize: size * 0.1,
            }}
          >
            {Math.round(percentage)}%
          </text>
        </g>
      </svg>
    </div>
  );
};
