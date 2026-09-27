import React from 'react';
import { Listing } from '../types';

interface ContactDetailViewProps {
  listing: Listing | null;
  onOpenReport: (listing: Listing) => void;
}

export const MAP_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAIZ0TFt12pO3kz3fgzNtJAI4J4CSfswO1ZDqTxTwdnrd44x8uEf_Favz0LU7ZR-y0zcOLeqTEM92RXh276SJGo7zswzdidQ_ya3W7KywQOKGhlVBJ1Uyt8cbK47kWjuIXXsnrXMPT7VAXHGj6gFjMJ1_3OvnMZL8ORfhIh70-7qVoo5OZa7dP4q7ly2GL-JkzNXeVGw-bF7zMvPl4HgG_MXZTKVXcuozYcz8oIfLjoJ1xp1x4c_z0Yjw';

export const ContactDetailView: React.FC<ContactDetailViewProps> = ({
  listing,
  onOpenReport,
}) => {
  if (!listing) return null;

  const primaryTel = listing.toll_free
    ? listing.toll_free.replace(/[^0-9+]/g, '')
    : listing.phone.replace(/[^0-9+]/g, '');

  const openDirections = () => {
    const destination = encodeURIComponent(
      `${listing.name}, ${listing.address}`
    );
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${destination}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="w-full mb-space-xl" id="contactDetailsSection">
      <div className="bg-surface-container-lowest rounded-2xl p-space-md lg:p-space-lg shadow-sm border border-outline-variant/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-space-md mb-space-md gap-space-sm border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-space-xs mb-1 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-code text-label-code text-primary uppercase font-bold">
                {listing.status === 'active' ? 'Active (24/7 Available)' : 'Operating Standby'}
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-badge text-label-badge text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded font-bold">
                {listing.category_name || 'Emergency'}
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-body-sm text-xs text-outline">
                {listing.region_name || 'All Regions'}
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {listing.name}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl mt-0.5">
              {listing.description || 'Verified critical emergency medical response unit.'}
            </p>
          </div>

          <div className="flex items-center gap-space-xs w-full sm:w-auto flex-wrap">
            <a
              href={`tel:${primaryTel}`}
              className="flex-1 sm:flex-initial h-12 px-space-lg rounded-xl bg-primary text-on-primary font-action-button text-action-button flex items-center justify-center gap-space-xs hover:bg-primary-container transition-all shadow-xs font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
              <span>Call Now</span>
            </a>
            <button
              onClick={openDirections}
              className="flex-1 sm:flex-initial h-12 px-space-md rounded-xl bg-surface-container text-on-surface font-action-button text-action-button flex items-center justify-center gap-space-xs hover:bg-surface-container-high transition-colors font-semibold border border-outline-variant/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">directions</span>
              <span>Get Directions</span>
            </button>
            <button
              onClick={() => onOpenReport(listing)}
              className="h-12 px-3 rounded-xl bg-surface-container-low text-outline hover:text-error hover:bg-error-container/20 transition-colors font-body-sm text-xs flex items-center gap-1 cursor-pointer border border-outline-variant/20"
              title="Report incorrect information"
            >
              <span className="material-symbols-outlined text-[18px]">flag</span>
              <span className="hidden sm:inline">Report Incorrect</span>
            </button>
          </div>
        </div>

        {/* Information Matrix & Location */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md pt-space-xs">
          {/* Details Column */}
          <div className="flex flex-col gap-space-sm">
            <div className="bg-surface rounded-xl p-space-sm border border-outline-variant/20">
              <span className="font-label-code text-label-code text-outline uppercase block mb-1 font-semibold">
                Primary Hotline & Dispatch
              </span>
              <div className="font-body-lg text-body-lg text-on-surface font-bold">
                {listing.phone}
                {listing.toll_free && ` / Toll-Free: ${listing.toll_free}`}
              </div>
              <div className="font-body-sm text-body-sm text-primary mt-0.5">
                High-priority cellular and landline connectivity
              </div>
            </div>

            <div className="bg-surface rounded-xl p-space-sm border border-outline-variant/20">
              <span className="font-label-code text-label-code text-outline uppercase block mb-1 font-semibold">
                Operating Hours
              </span>
              <div className="font-body-md text-body-md text-on-surface font-bold">
                {listing.operating_hours || '24 Hours / 7 Days a week'}
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Immediate dispatch teams stationed on premise
              </div>
            </div>

            <div className="bg-surface rounded-xl p-space-sm border border-outline-variant/20">
              <span className="font-label-code text-label-code text-outline uppercase block mb-1 font-semibold">
                Physical Location
              </span>
              <div className="font-body-md text-body-md text-on-surface font-medium">
                {listing.address}
              </div>
              <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px] text-outline">verified</span>
                <span>Verified by district safety command</span>
              </div>
            </div>
          </div>

          {/* Static Location Preview (Maps feature) */}
          <div className="lg:col-span-2 relative min-h-[220px] rounded-2xl overflow-hidden shadow-xs border border-outline-variant/30 group">
            <div
              className="w-full h-full min-h-[220px] bg-cover bg-center rounded-2xl transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${MAP_IMAGE_URL}')` }}
            />
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-space-xs border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              <span className="font-label-badge text-label-badge text-on-surface font-bold">
                {listing.region_name || 'Emergency Zone'} Dispatch Grid
              </span>
            </div>
            <button
              onClick={openDirections}
              className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1 text-xs text-primary font-semibold hover:bg-surface-container transition-colors border border-outline-variant/30 cursor-pointer"
            >
              <span>Open GPS Nav</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
