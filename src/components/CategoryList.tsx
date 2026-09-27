import React from 'react';
import { EmergencyCategory } from '../types';

interface CategoryListProps {
  activeCategory: string | null;
  onSelectCategory: (category: EmergencyCategory | 'all') => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="w-full mb-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-md gap-space-xs">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Emergency Services
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Browse verified emergency response teams by critical category
          </p>
        </div>
        <div className="flex items-center gap-space-sm">
          {activeCategory && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs text-primary font-semibold hover:underline cursor-pointer"
            >
              Reset filter
            </button>
          )}
          <span className="font-label-code text-label-code text-outline font-medium">
            6 CATEGORIES SYNCED
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-sm">
        {/* 1. Medical */}
        <div
          onClick={() => onSelectCategory('Medical')}
          className={`cursor-pointer group rounded-2xl p-space-md flex flex-col justify-between transition-all duration-200 shadow-xs border ${
            activeCategory === 'Medical'
              ? 'bg-surface-container border-primary ring-2 ring-primary/20'
              : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/30'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">medical_services</span>
          </div>
          <div className="mt-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
              Medical
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Hospitals and ambulance dispatch
            </p>
          </div>
        </div>

        {/* 2. Rescue */}
        <div
          onClick={() => onSelectCategory('Rescue')}
          className={`cursor-pointer group rounded-2xl p-space-md flex flex-col justify-between transition-all duration-200 shadow-xs border ${
            activeCategory === 'Rescue'
              ? 'bg-surface-container border-tertiary ring-2 ring-tertiary/20'
              : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/30'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">shield_with_heart</span>
          </div>
          <div className="mt-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
              Rescue
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Disaster relief & SAR units
            </p>
          </div>
        </div>

        {/* 3. Shelter */}
        <div
          onClick={() => onSelectCategory('Shelter')}
          className={`cursor-pointer group rounded-2xl p-space-md flex flex-col justify-between transition-all duration-200 shadow-xs border ${
            activeCategory === 'Shelter'
              ? 'bg-surface-container border-secondary ring-2 ring-secondary/20'
              : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/30'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">night_shelter</span>
          </div>
          <div className="mt-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
              Shelter
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Safe night havens & camps
            </p>
          </div>
        </div>

        {/* 4. Food & Water */}
        <div
          onClick={() => onSelectCategory('Food & Water')}
          className={`cursor-pointer group rounded-2xl p-space-md flex flex-col justify-between transition-all duration-200 shadow-xs border ${
            activeCategory === 'Food & Water'
              ? 'bg-surface-container border-primary ring-2 ring-primary/20'
              : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/30'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">water_drop</span>
          </div>
          <div className="mt-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
              Food & Water
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Potable water & dry rations
            </p>
          </div>
        </div>

        {/* 5. Government Helpline */}
        <div
          onClick={() => onSelectCategory('Government Helpline')}
          className={`cursor-pointer group rounded-2xl p-space-md flex flex-col justify-between transition-all duration-200 shadow-xs border ${
            activeCategory === 'Government Helpline'
              ? 'bg-surface-container border-primary ring-2 ring-primary/20'
              : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/30'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">account_balance</span>
          </div>
          <div className="mt-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
              Govt Help
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Official state disaster desks
            </p>
          </div>
        </div>

        {/* 6. NGO */}
        <div
          onClick={() => onSelectCategory('NGO')}
          className={`cursor-pointer group rounded-2xl p-space-md flex flex-col justify-between transition-all duration-200 shadow-xs border ${
            activeCategory === 'NGO'
              ? 'bg-surface-container border-secondary ring-2 ring-secondary/20'
              : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/30'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-secondary-fixed-dim/20 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">volunteer_activism</span>
          </div>
          <div className="mt-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
              NGO Aid
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Civil volunteer networks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
