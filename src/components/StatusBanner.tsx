import React from 'react';

export const StatusBanner: React.FC = () => {
  return (
    <div className="w-full bg-surface-container-low rounded-xl p-space-sm mb-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm shadow-xs border border-outline-variant/30">
      <div className="flex items-center gap-space-sm flex-wrap">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
        </span>
        <span className="font-label-code text-label-code text-primary uppercase font-bold tracking-wider">
          National Network Status
        </span>
        <span className="text-on-surface-variant font-body-sm hidden md:inline">|</span>
        <span className="font-body-sm text-body-sm text-on-surface">
          Emergency dispatch systems operational across all monitored urban centers.
        </span>
      </div>
      <div className="flex items-center gap-space-xs shrink-0">
        <a
          href="tel:112"
          className="font-label-badge text-label-badge text-secondary uppercase bg-secondary-fixed/50 px-2 py-0.5 rounded font-bold hover:bg-secondary-fixed transition-colors"
          title="Dial Toll-Free National SOS"
        >
          Toll-Free SOS: 112
        </a>
        <a
          href="tel:108"
          className="font-label-badge text-label-badge text-primary uppercase bg-primary-fixed/40 px-2 py-0.5 rounded font-bold hover:bg-primary-fixed transition-colors"
          title="Dial Medical Emergency Line"
        >
          Medical: 108
        </a>
      </div>
    </div>
  );
};
