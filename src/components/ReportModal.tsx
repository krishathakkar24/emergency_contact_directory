import React, { useState } from 'react';
import { Listing, ReportReason } from '../types';
import { createReport } from '../lib/supabase';

interface ReportModalProps {
  listing: Listing | null;
  onClose: () => void;
}

const REPORT_REASONS: ReportReason[] = [
  'Wrong phone number',
  'Wrong address',
  'Service unavailable',
  'Other',
];

export const ReportModal: React.FC<ReportModalProps> = ({
  listing,
  onClose,
}) => {
  const [reason, setReason] = useState<ReportReason>('Wrong phone number');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!listing) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await createReport({
        listing_id: listing.id,
        reason,
        description,
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 shadow-xl border border-outline-variant/30 text-on-surface">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
              Report Submitted
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Thank you. Your report has been submitted. Our safety verification team will review this listing shortly.
            </p>
            <button
              onClick={onClose}
              className="w-full h-11 rounded-xl bg-primary text-on-primary font-action-button text-action-button font-semibold hover:bg-primary-container transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[22px]">flag</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Report Incorrect Information
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-outline hover:text-on-surface p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="font-body-sm text-xs text-outline mb-4">
              Help us maintain critical accuracy for <strong className="text-on-surface">{listing.name}</strong>.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container text-xs">
                {errorMessage}
              </div>
            )}

            <div className="mb-4">
              <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-2">
                Issue Category
              </label>
              <div className="space-y-2">
                {REPORT_REASONS.map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-colors text-xs font-medium ${
                      reason === r
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-outline-variant/30 text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={r}
                      checked={reason === r}
                      onChange={() => setReason(r)}
                      className="accent-primary"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Provide corrected phone number, alternate gate address, or working status..."
                className="w-full p-3 rounded-xl border border-outline-variant/30 bg-surface text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-action-button text-action-button font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-11 rounded-xl bg-tertiary text-on-tertiary font-action-button text-action-button font-semibold hover:bg-tertiary-container transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
