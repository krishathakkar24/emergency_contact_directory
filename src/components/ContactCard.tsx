import React from 'react';
import { Listing } from '../types';

interface ContactCardProps {
  listing: Listing;
  onViewDetails: (listing: Listing) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  listing,
  onViewDetails,
}) => {
  // Determine badge styling based on category
  const getBadgeStyle = (category?: string) => {
    switch (category) {
      case 'Medical':
        return 'bg-primary-fixed/50 text-on-primary-fixed';
      case 'Rescue':
        return 'bg-secondary-fixed text-on-secondary-fixed';
      case 'Shelter':
        return 'bg-surface-container-highest text-on-surface';
      case 'Food & Water':
        return 'bg-surface-container-high text-primary';
      case 'Government Helpline':
        return 'bg-primary-fixed-dim/50 text-on-primary-fixed-variant';
      case 'NGO':
        return 'bg-secondary-fixed-dim/30 text-secondary';
      default:
        return 'bg-surface-container text-on-surface';
    }
  };

  // Determine status text & styling
  const getStatusDisplay = () => {
    if (listing.category_name === 'Medical') {
      return { text: 'ACTIVE 24/7', dot: 'bg-primary' };
    }
    if (listing.category_name === 'Rescue') {
      return { text: 'ACTIVE', dot: 'bg-primary' };
    }
    if (listing.category_name === 'Shelter') {
      return { text: 'OPEN (180 BEDS)', dot: 'bg-primary' };
    }
    if (listing.category_name === 'Government Helpline') {
      return { text: 'ONLINE', dot: 'bg-primary' };
    }
    return { text: 'VERIFIED', dot: 'bg-primary' };
  };

  const status = getStatusDisplay();
  const primaryTel = listing.toll_free
    ? listing.toll_free.replace(/[^0-9+]/g, '')
    : listing.phone.replace(/[^0-9+]/g, '');

  return (
    <div className="contact-card bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md border border-outline-variant/30">
      <div>
        <div className="flex items-start justify-between gap-space-sm mb-space-sm">
          <div className="flex items-center gap-space-xs flex-wrap">
            <span
              className={`font-label-badge text-label-badge px-2.5 py-1 rounded-full font-bold uppercase ${getBadgeStyle(
                listing.category_name
              )}`}
            >
              {listing.category_name || 'Emergency'}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
              <span>{listing.region_name || 'All Metro'}</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1 font-label-badge text-label-badge text-primary bg-surface-container px-2 py-0.5 rounded-full shrink-0 font-bold">
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
            {status.text}
          </span>
        </div>

        <h3 className="font-headline-md text-headline-md text-on-surface mb-1 font-bold">
          {listing.name}
        </h3>

        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
          {listing.description || 'Verified critical emergency dispatch unit.'}
        </p>

        {/* Contact Numbers Box */}
        <div className="bg-surface rounded-xl p-space-sm flex flex-col gap-1 mb-space-md border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-outline">Direct Dispatch:</span>
            <span className="font-label-code text-label-code font-semibold text-on-surface">
              {listing.phone}
            </span>
          </div>
          {listing.toll_free && (
            <div className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-outline">Toll-Free Emergency:</span>
              <span className="font-label-code text-label-code font-semibold text-primary">
                {listing.toll_free}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
        <a
          href={`tel:${primaryTel}`}
          className="h-11 rounded-xl bg-primary text-on-primary font-action-button text-action-button flex items-center justify-center gap-space-xs hover:bg-primary-container transition-colors shadow-xs font-semibold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">call</span>
          <span>Call Now</span>
        </a>
        <button
          onClick={() => onViewDetails(listing)}
          className="h-11 rounded-xl bg-surface hover:bg-surface-container text-on-surface font-action-button text-action-button flex items-center justify-center gap-space-xs transition-colors border border-outline-variant/30 font-semibold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};
