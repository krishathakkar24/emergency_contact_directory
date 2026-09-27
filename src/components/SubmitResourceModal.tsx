import React, { useState } from 'react';
import { EmergencyCategory, UserProfile, Region } from '../types';
import { createSubmission } from '../lib/supabase';

interface SubmitResourceModalProps {
  currentUser: UserProfile | null;
  regions: Region[];
  onClose: () => void;
  onOpenAuth: () => void;
  onSuccess: () => void;
  onViewMySubmissions?: () => void;
}

const CATEGORIES: EmergencyCategory[] = [
  'Medical',
  'Rescue',
  'Shelter',
  'Food & Water',
  'Government Helpline',
  'NGO',
];

export const SubmitResourceModal: React.FC<SubmitResourceModalProps> = ({
  currentUser,
  regions,
  onClose,
  onOpenAuth,
  onSuccess,
  onViewMySubmissions,
}) => {
  const [resourceName, setResourceName] = useState('');
  const [category, setCategory] = useState<EmergencyCategory>('Medical');
  const [region, setRegion] = useState(regions[0]?.name || 'Mumbai');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [description, setDescription] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!currentUser || currentUser.role === 'Public User') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 shadow-xl border border-outline-variant/30 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">
            Contributor Sign In Required
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Please sign in as a contributor to submit an emergency resource.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-action-button cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-semibold text-action-button hover:bg-primary-container cursor-pointer"
            >
              Sign In as Contributor
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!resourceName.trim()) {
      setValidationError('Please enter the resource name.');
      return;
    }
    if (!category) {
      setValidationError('Please select a category.');
      return;
    }
    if (!region) {
      setValidationError('Please select a region.');
      return;
    }
    if (!phone.trim()) {
      setValidationError('Please enter a phone number.');
      return;
    }
    if (!address.trim()) {
      setValidationError('Please enter the address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createSubmission({
        resource_name: resourceName.trim(),
        category,
        region,
        phone: phone.trim(),
        address: address.trim(),
        operating_hours: operatingHours.trim() || '24 Hours / 7 Days a week',
        description: description.trim(),
        submitted_by: currentUser.email,
      });

      if (res.success) {
        setSubmitted(true);
        onSuccess();
      } else {
        setValidationError(res.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setValidationError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl p-6 shadow-xl border border-outline-variant/30 text-on-surface my-8">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">task_alt</span>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
              Resource submitted successfully.
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Your resource is currently pending review by an administrator.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-fixed/40 text-secondary font-label-badge text-xs font-bold uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>Pending Review</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {onViewMySubmissions && (
                <button
                  onClick={() => {
                    onClose();
                    onViewMySubmissions();
                  }}
                  className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-action-button text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer"
                >
                  View in My Submissions
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 h-11 rounded-xl bg-surface-container text-on-surface font-action-button text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  Submit an Emergency Resource
                </h3>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                  Help us keep the emergency directory updated by submitting a local emergency resource.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-outline hover:text-on-surface p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {validationError && (
              <div className="p-2.5 rounded-xl bg-error-container text-on-error-container text-xs font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>{validationError}</span>
              </div>
            )}

            <div>
              <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                Resource Name *
              </label>
              <input
                type="text"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                placeholder="e.g. Kurla Station Flood Medical Camp"
                className="w-full h-10 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EmergencyCategory)}
                  className="w-full h-10 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface focus:outline-none focus:border-primary text-xs cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                  Region *
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface focus:outline-none focus:border-primary text-xs cursor-pointer"
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 22 XXXXXXXX"
                className="w-full h-10 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div>
              <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                Address *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, landmark, area"
                className="w-full h-10 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div>
              <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                Operating Hours <span className="text-outline font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                placeholder="e.g. 24 Hours / 7 Days a week"
                className="w-full h-10 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div>
              <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                Description <span className="text-outline font-normal">(Optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Details on services, equipment, or emergency capacity..."
                className="w-full p-2.5 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-10 rounded-xl bg-surface-container text-on-surface font-action-button text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-10 rounded-xl bg-primary text-on-primary font-action-button text-xs font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Resource'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
