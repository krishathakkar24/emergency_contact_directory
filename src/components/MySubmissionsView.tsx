import React from 'react';
import { Submission, UserProfile } from '../types';

interface MySubmissionsViewProps {
  currentUser: UserProfile | null;
  submissions: Submission[];
  onOpenSubmit: () => void;
  onOpenAuth: () => void;
}

export const MySubmissionsView: React.FC<MySubmissionsViewProps> = ({
  currentUser,
  submissions,
  onOpenSubmit,
  onOpenAuth,
}) => {
  // If not logged in
  if (!currentUser) {
    return (
      <div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-outline-variant/30 shadow-xs max-w-2xl mx-auto my-6 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-[30px]">lock</span>
        </div>
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
          Contributor Sign In Required
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
          Please sign in to view the status of your submitted emergency resources.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-action-button text-sm font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">login</span>
          <span>Sign In</span>
        </button>
      </div>
    );
  }

  // Filter only contributor's own submissions
  const mySubmissions = submissions.filter((s) => {
    if (!s.submitted_by) return false;
    return (
      s.submitted_by.toLowerCase() === currentUser.email.toLowerCase() ||
      s.submitted_by === currentUser.id
    );
  });

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadge = (status: Submission['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Approved</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-xs font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            <span>Rejected</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-space-md">
      <div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-outline-variant/30 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20 mb-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              My Submissions
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Track the verification status of emergency resources you submitted for community dispatch.
            </p>
          </div>
          <button
            onClick={onOpenSubmit}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary font-action-button text-xs font-semibold hover:bg-primary-container transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Submit New Resource</span>
          </button>
        </div>

        {mySubmissions.length === 0 ? (
          <div className="text-center py-12 px-4 bg-surface rounded-xl border border-outline-variant/20">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-surface-container flex items-center justify-center text-outline">
              <span className="material-symbols-outlined text-[26px]">folder_open</span>
            </div>
            <h3 className="font-headline-sm text-sm font-bold text-on-surface mb-1">
              No Submissions Yet
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant max-w-sm mx-auto mb-4">
              You have not submitted any emergency resources yet. Contribute a shelter, clinic, or relief depot to assist local responders.
            </p>
            <button
              onClick={onOpenSubmit}
              className="px-4 py-2 rounded-xl bg-primary text-on-primary font-action-button text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer"
            >
              Submit Resource
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant font-semibold">
                  <th className="py-3 px-3">Resource Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Region</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Submitted Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {mySubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-on-surface">
                      <div className="flex flex-col">
                        <span className="text-sm">{sub.resource_name || sub.name}</span>
                        {sub.address && (
                          <span className="text-[11px] text-outline truncate max-w-xs font-normal">
                            {sub.address}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-on-surface">
                      <span className="font-medium">{sub.category}</span>
                    </td>
                    <td className="py-3.5 px-3 text-on-surface-variant font-medium">
                      {sub.region}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {getStatusBadge(sub.status)}
                    </td>
                    <td className="py-3.5 px-3 text-on-surface-variant whitespace-nowrap font-mono text-[11px]">
                      {formatDate(sub.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
