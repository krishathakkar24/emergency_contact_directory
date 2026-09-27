import React, { useState } from 'react';
import { EmergencyCategory, UserProfile, Region } from '../types';
import { createSubmission } from '../lib/supabase';

interface SubmitResourceViewProps {
  currentUser: UserProfile | null;
  regions: Region[];
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

export const SubmitResourceView: React.FC<SubmitResourceViewProps> = ({
  currentUser,
  regions,
  onOpenAuth,
  onSuccess,
  onViewMySubmissions,
}) => {
  const [resourceName, setResourceName] = useState('');
  const [category, setCategory] = useState<EmergencyCategory | ''>('Medical');
  const [region, setRegion] = useState(regions[0]?.name || 'Mumbai');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [description, setDescription] = useState('');

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  // If user is not logged in or is a Public User
  if (!currentUser || currentUser.role === 'Public User') {
    return (
      <div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-outline-variant/30 shadow-xs max-w-2xl mx-auto my-6 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-[30px]">lock</span>
        </div>
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
          Contributor Access Required
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
          Please sign in as a contributor to submit an emergency resource.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-action-button text-sm font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">login</span>
          <span>Sign In as Contributor</span>
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Form Validation with required exact human-readable messages
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
        category: category as EmergencyCategory,
        region,
        phone: phone.trim(),
        address: address.trim(),
        operating_hours: operatingHours.trim() || '24 Hours / 7 Days a week',
        description: description.trim(),
        submitted_by: currentUser.email,
      });

      if (res.success) {
        setSubmittedSuccessfully(true);
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

  const handleResetForm = () => {
    setResourceName('');
    setCategory('Medical');
    setRegion(regions[0]?.name || 'Mumbai');
    setPhone('');
    setAddress('');
    setOperatingHours('');
    setDescription('');
    setValidationError(null);
    setSubmittedSuccessfully(false);
  };

  return (
    <div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-outline-variant/30 shadow-xs max-w-2xl mx-auto my-4 text-on-surface">
      {submittedSuccessfully ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px]">task_alt</span>
          </div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
            Resource submitted successfully.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4 max-w-md mx-auto">
            Your resource is currently pending review by an administrator.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-fixed/40 text-secondary font-label-badge text-xs font-bold uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>Status: Pending Review</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {onViewMySubmissions && (
              <button
                onClick={onViewMySubmissions}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-on-primary font-action-button text-sm font-semibold hover:bg-primary-container transition-colors cursor-pointer"
              >
                View in My Submissions
              </button>
            )}
            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-action-button text-sm font-semibold transition-colors cursor-pointer"
            >
              Submit Another Resource
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="pb-3 border-b border-outline-variant/20">
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              Submit an Emergency Resource
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Help us keep the emergency directory updated by submitting a local emergency resource.
            </p>
          </div>

          {validationError && (
            <div className="p-3 rounded-xl bg-error-container text-on-error-container text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{validationError}</span>
            </div>
          )}

          {/* 1. Resource Name */}
          <div>
            <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
              Resource Name *
            </label>
            <input
              type="text"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              placeholder="e.g. Civil Defense Flood Shelter - Ward 4"
              className="w-full h-11 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-sm"
            />
          </div>

          {/* 2 & 3. Category & Region */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EmergencyCategory)}
                className="w-full h-11 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface focus:outline-none focus:border-primary text-sm cursor-pointer"
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
                className="w-full h-11 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface focus:outline-none focus:border-primary text-sm cursor-pointer"
              >
                {regions.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Phone Number */}
          <div>
            <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 22 XXXXXXXX"
              className="w-full h-11 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-sm"
            />
          </div>

          {/* 5. Address */}
          <div>
            <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
              Address *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Building name, Street, Landmark, PIN code"
              className="w-full h-11 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-sm"
            />
          </div>

          {/* 6. Operating Hours (Optional) */}
          <div>
            <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
              Operating Hours <span className="text-outline font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
              placeholder="e.g. 24 Hours / 7 Days a week"
              className="w-full h-11 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-sm"
            />
          </div>

          {/* 7. Description (Optional) */}
          <div>
            <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
              Description <span className="text-outline font-normal">(Optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Mention bed capacity, available ambulances, drinking water supplies, flood rescue boats..."
              className="w-full p-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-primary text-on-primary font-action-button text-action-button font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>{isSubmitting ? 'Submitting...' : 'Submit Emergency Resource'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
