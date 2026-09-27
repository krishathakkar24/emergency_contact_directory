import React from 'react';
import { Region } from '../types';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  regions: Region[];
  onQuickFilter: (keyword: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onSubmitSearch: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  selectedRegion,
  onSelectRegion,
  regions,
  onQuickFilter,
  searchInputRef,
  onSubmitSearch,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmitSearch();
    }
  };

  return (
    <section className="w-full mb-space-xl flex flex-col items-center text-center px-space-xs">
      <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container mb-space-sm border border-outline-variant/30">
        <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
        <span className="font-label-badge text-label-badge text-primary uppercase tracking-wider font-bold">
          Emergency Contact Directory
        </span>
      </div>

      <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight max-w-2xl mb-space-xs font-bold">
        Find Emergency Help Near You
      </h1>

      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-lg">
        Quickly find verified emergency contacts, shelters, medical services, and essential public safety resources in your district.
      </p>

      {/* Search Card Component */}
      <div className="w-full max-w-3xl bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg shadow-sm border border-outline-variant/30 text-left">
        {/* Search Input & CTA */}
        <div className="flex flex-col sm:flex-row gap-space-sm items-stretch">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-12 pl-11 pr-4 bg-surface rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline border border-outline-variant/30 focus:outline-none focus:bg-surface-container-low focus:border-primary transition-colors"
              placeholder="Search emergency services (e.g., Ambulance, Fire, Shelter, Flood relief)..."
              type="text"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs p-1"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={onSubmitSearch}
            className="h-12 px-space-lg rounded-xl bg-primary text-on-primary font-action-button text-action-button flex items-center justify-center gap-space-xs hover:bg-primary-container transition-all active:scale-[0.98] shadow-xs cursor-pointer font-semibold shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">emergency</span>
            <span>Find Services</span>
          </button>
        </div>

        {/* Region Selection and Quick Filters */}
        <div className="mt-space-md pt-space-sm flex flex-col gap-space-sm border-t border-outline-variant/20">
          <div className="flex flex-wrap items-center justify-between gap-space-xs">
            <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider font-bold">
              Active Region
            </span>
            <div className="flex flex-wrap gap-1.5" id="regionChips">
              <button
                onClick={() => onSelectRegion('All')}
                className={`px-3 py-1 rounded-full font-body-sm text-body-sm transition-colors cursor-pointer ${
                  selectedRegion === 'All'
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                All Regions
              </button>
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => onSelectRegion(reg.name)}
                  className={`px-3 py-1 rounded-full font-body-sm text-body-sm transition-colors cursor-pointer ${
                    selectedRegion.toLowerCase() === reg.name.toLowerCase()
                      ? 'bg-primary text-on-primary font-semibold'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {reg.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
            <span className="font-label-code text-label-code text-outline font-semibold">
              QUICK:
            </span>
            <button
              onClick={() => onQuickFilter('Hospital')}
              className="text-xs bg-surface hover:bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-lg transition-colors font-body-sm border border-outline-variant/20 cursor-pointer"
            >
              Hospital beds
            </button>
            <button
              onClick={() => onQuickFilter('Rescue')}
              className="text-xs bg-surface hover:bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-lg transition-colors font-body-sm border border-outline-variant/20 cursor-pointer"
            >
              Water Rescue
            </button>
            <button
              onClick={() => onQuickFilter('Water')}
              className="text-xs bg-surface hover:bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-lg transition-colors font-body-sm border border-outline-variant/20 cursor-pointer"
            >
              Ration points
            </button>
            <button
              onClick={() => onQuickFilter('Shelter')}
              className="text-xs bg-surface hover:bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-lg transition-colors font-body-sm border border-outline-variant/20 cursor-pointer"
            >
              Night shelters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
