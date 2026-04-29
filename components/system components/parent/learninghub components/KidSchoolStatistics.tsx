import React from "react";

type Stat = {
  label: string;
  value: number; // 0 - 100
};

const stats: Stat[] = [
  { label: "Academic Performance", value: 55 },
  { label: "Skill Development", value: 81 },
  { label: "Participation & Communication", value: 60 },
  { label: "Work Habits", value: 45 },
  { label: "Behavior & Attitude", value: 70 },
];

const KidSchoolStatistics = () => {
  return (
    <div className="w-full">
      <div className="w-full max-w-md p-5">
        <div className="flex flex-col gap-5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div className="text-sm text-black/80">{s.label}</div>

              {/* Track */}
              <div className="w-full h-5 rounded bg-black/15 overflow-hidden relative">
                {/* Fill */}
                <div
                  className="h-full rounded bg-linear-to-r from-indigo-500 to-blue-500 flex items-center justify-end pr-2"
                  style={{ width: `${Math.min(100, Math.max(0, s.value))}%` }}
                >
                  <span className="text-xs font-semibold text-white">
                    {s.value}%
                  </span>
                </div>

                {/* If value is very small, show percent centered to keep it readable */}
                {s.value < 18 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-black/70">
                      {s.value}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KidSchoolStatistics;
