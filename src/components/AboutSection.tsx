import React from 'react';

interface AboutSectionProps {
  onLearnMore?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section className="w-full mb-space-xl bg-surface-container-low rounded-2xl p-space-md lg:p-space-lg border border-outline-variant/30">
      <div className="max-w-3xl mb-space-lg">
        <div className="inline-flex items-center gap-space-xs px-2.5 py-0.5 rounded-full bg-surface-container mb-space-xs border border-outline-variant/30">
          <span className="font-label-badge text-label-badge text-primary uppercase font-bold">
            About Directory
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs font-bold">
          About ResQ
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          ResQ is a simple emergency contact directory designed to help people living in El Niño-affected and flood-prone areas quickly find verified emergency services and essential crisis relief in their districts without advertisement delays or visual friction.
        </p>
      </div>

      {/* How It Works 3-Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Step 1 */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-label-code text-label-code flex items-center justify-center font-bold mb-space-sm">
              01
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-bold">
              Search & Filter
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Find critical relief contacts instantly by keyword, regional territory, or crisis category.
            </p>
          </div>
          <div className="mt-space-md flex items-center gap-1 text-primary font-action-button text-xs font-semibold">
            <span>Real-time indexing</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-label-code text-label-code flex items-center justify-center font-bold mb-space-sm">
              02
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-bold">
              Verify Status
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Review updated phone lines, operational shelter capacities, operating hours, and civic addresses.
            </p>
          </div>
          <div className="mt-space-md flex items-center gap-1 text-primary font-action-button text-xs font-semibold">
            <span>Multi-source validation</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-xs flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-label-code text-label-code flex items-center justify-center font-bold mb-space-sm">
              03
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-bold">
              Direct Contact
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Place instantaneous single-tap calls to responders or get routed immediately with location directions.
            </p>
          </div>
          <div className="mt-space-md flex items-center gap-1 text-primary font-action-button text-xs font-semibold">
            <span>Immediate dispatch</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </div>
        </div>
      </div>
    </section>
  );
};
