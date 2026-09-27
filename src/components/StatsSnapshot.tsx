import React from 'react';

export const StatsSnapshot: React.FC = () => {
  return (
    <section className="w-full mb-space-xl grid grid-cols-1 md:grid-cols-3 gap-space-md">
      {/* Stat 1: Fleet Dispatch Capacity */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl flex items-center gap-space-md shadow-xs border border-outline-variant/30 hover:border-primary/40 transition-colors">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <svg className="w-7 h-7 text-primary" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              fill="none"
              r="15.915"
              stroke="#e7eeff"
              strokeWidth="3"
            />
            <circle
              className="rotate-[-90deg] origin-center"
              cx="18"
              cy="18"
              fill="none"
              r="15.915"
              stroke="currentColor"
              strokeDasharray="88, 100"
              strokeLinecap="round"
              strokeWidth="3.5"
            />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-headline-md text-headline-md text-on-surface font-bold">
              88%
            </span>
            <span className="font-label-badge text-label-badge text-primary bg-primary-fixed/40 px-1.5 py-0.5 rounded font-bold">
              OPTIMAL
            </span>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">
            EMS Fleet Dispatch Capacity
          </div>
        </div>
      </div>

      {/* Stat 2: Urgent Arrival */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl flex items-center gap-space-md shadow-xs border border-outline-variant/30 hover:border-secondary/40 transition-colors">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-secondary text-[24px]">timer</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-headline-md text-headline-md text-on-surface font-bold">
              6.4 min
            </span>
            <span className="font-label-badge text-label-badge text-secondary bg-secondary-fixed/50 px-1.5 py-0.5 rounded font-bold">
              -1.2m
            </span>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">
            Avg Urgent Medical Arrival
          </div>
        </div>
      </div>

      {/* Stat 3: Verified Units */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl flex items-center gap-space-md shadow-xs border border-outline-variant/30 hover:border-primary/40 transition-colors">
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-[24px]">
            verified_user
          </span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-headline-md text-headline-md text-on-surface font-bold">
              1,420+
            </span>
            <span className="font-label-badge text-label-badge text-on-surface-variant bg-surface-container-high px-1.5 py-0.5 rounded font-bold">
              LIVE
            </span>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">
            Verified District Response Units
          </div>
        </div>
      </div>
    </section>
  );
};
