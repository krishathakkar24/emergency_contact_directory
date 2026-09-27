import React, { useState } from 'react';
import { Submission, UserProfile } from '../types';
import { updateSubmissionStatus } from '../lib/supabase';

interface AdminReviewViewProps {
  currentUser: UserProfile | null;
  submissions: Submission[];
  onRefresh: () => Promise<void>;
  onOpenAuth: () => void;
}

export const AdminReviewView: React.FC<AdminReviewViewProps> = ({
  currentUser,
  submissions,
  onRefresh,
  onOpenAuth,
}) => {
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<{
    text: string;
    type: 'success' | 'reject' | 'error';
  } | null>(null);

  // If not admin
  if (!currentUser || currentUser.role !== 'Admin') {
    return (
      <div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-outline-variant/30 shadow-xs max-w-2xl mx-auto my-6 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
          <span className="material-symbols-outlined text-[30px]">admin_panel_settings</span>
        </div>
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
          Administrator Access Required
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
          This area is restricted to ResQ Directory administrators for reviewing and verifying emergency resources.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-action-button text-sm font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">login</span>
          <span>Sign In as Admin</span>
        </button>
      </div>
    );
  }

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');
  const pastSubmissions = submissions.filter((s) => s.status !== 'pending');

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const handleApprove = async (subId: string) => {
    setActioningId(subId);
    setNotificationMsg(null);

    try {
      const res = await updateSubmissionStatus(subId, 'approved');
      if (res.success) {
        setNotificationMsg({
          text: 'Resource approved successfully.',
          type: 'success',
        });
        await onRefresh();
      } else {
        setNotificationMsg({
          text: res.error || 'Something went wrong. Please try again.',
          type: 'error',
        });
      }
    } catch {
      setNotificationMsg({
        text: 'Something went wrong. Please try again.',
        type: 'error',
      });
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (subId: string) => {
    setActioningId(subId);
    setNotificationMsg(null);

    try {
      const res = await updateSubmissionStatus(subId, 'rejected');
      if (res.success) {
        setNotificationMsg({
          text: 'Resource rejected.',
          type: 'reject',
        });
        await onRefresh();
      } else {
        setNotificationMsg({
          text: res.error || 'Something went wrong. Please try again.',
          type: 'error',
        });
      }
    } catch {
      setNotificationMsg({
        text: 'Something went wrong. Please try again.',
        type: 'error',
      });
    } finally {
      setActioningId(null);
    }
  };

  return (
    <div className="flex flex-col gap-space-md">
      <div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-outline-variant/30 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[24px]">
                admin_panel_settings
              </span>
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                Admin Review
              </h1>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Review and verify submitted emergency resources before publishing them to the public emergency directory.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-xs font-bold">
              {pendingSubmissions.length} Pending
            </span>
          </div>
        </div>

        {/* Notification Banner */}
        {notificationMsg && (
          <div
            className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between mb-4 ${
              notificationMsg.type === 'success'
                ? 'bg-primary/10 text-primary border border-primary/30'
                : notificationMsg.type === 'reject'
                ? 'bg-error-container text-on-error-container border border-error/30'
                : 'bg-error-container text-on-error-container'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                {notificationMsg.type === 'success' ? 'check_circle' : 'info'}
              </span>
              <span>{notificationMsg.text}</span>
            </div>
            <button
              onClick={() => setNotificationMsg(null)}
              className="text-outline hover:text-on-surface p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Pending Submissions List */}
        <div className="flex flex-col gap-space-md">
          {pendingSubmissions.length === 0 ? (
            <div className="text-center py-12 px-4 bg-surface rounded-xl border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-[36px] mb-2">
                verified
              </span>
              <h3 className="font-headline-sm text-sm font-bold text-on-surface mb-1">
                No Pending Submissions
              </h3>
              <p className="font-body-sm text-xs text-outline max-w-sm mx-auto">
                All submitted emergency resources have been reviewed. New community submissions will appear here.
              </p>
            </div>
          ) : (
            pendingSubmissions.map((sub) => {
              const name = sub.resource_name || sub.name;
              return (
                <div
                  key={sub.id}
                  className="bg-surface rounded-xl p-4 sm:p-5 border border-outline-variant/30 flex flex-col gap-3.5 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-label-badge text-xs px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                          {sub.category}
                        </span>
                        <span className="font-body-sm text-xs font-semibold text-on-surface-variant">
                          Region: {sub.region}
                        </span>
                        <span className="font-mono text-[11px] text-outline">
                          Submitted: {formatDate(sub.created_at)}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-base font-bold text-on-surface">
                        {name}
                      </h3>
                      {sub.description && (
                        <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                          {sub.description}
                        </p>
                      )}
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed/40 text-secondary font-label-badge text-xs font-bold uppercase self-start sm:self-auto shrink-0">
                      Status: {sub.status}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                    <div>
                      <span className="text-outline block text-[10px] font-bold uppercase">
                        Phone
                      </span>
                      <span className="font-semibold text-on-surface">{sub.phone}</span>
                    </div>

                    <div>
                      <span className="text-outline block text-[10px] font-bold uppercase">
                        Operating Hours
                      </span>
                      <span className="font-medium text-on-surface">
                        {sub.operating_hours || 'Not specified'}
                      </span>
                    </div>

                    <div>
                      <span className="text-outline block text-[10px] font-bold uppercase">
                        Submitted By
                      </span>
                      <span className="font-medium text-on-surface truncate block">
                        {sub.submitted_by || 'Anonymous'}
                      </span>
                    </div>

                    <div className="sm:col-span-2 md:col-span-3">
                      <span className="text-outline block text-[10px] font-bold uppercase">
                        Address
                      </span>
                      <span className="font-medium text-on-surface">{sub.address}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2.5 pt-1 border-t border-outline-variant/15">
                    <button
                      disabled={actioningId === sub.id}
                      onClick={() => handleReject(sub.id)}
                      className="px-4 py-2 rounded-xl bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface font-action-button text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      disabled={actioningId === sub.id}
                      onClick={() => handleApprove(sub.id)}
                      className="px-5 py-2 rounded-xl bg-primary text-on-primary font-action-button text-xs font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Processed Submissions History */}
        {pastSubmissions.length > 0 && (
          <div className="mt-8 pt-4 border-t border-outline-variant/20">
            <h2 className="font-label-badge text-label-badge text-outline uppercase font-bold mb-3">
              Processed Submissions ({pastSubmissions.length})
            </h2>
            <div className="space-y-2">
              {pastSubmissions.slice(0, 8).map((sub) => (
                <div
                  key={sub.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-surface text-xs text-on-surface-variant border border-outline-variant/20 gap-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-semibold text-on-surface">
                      {sub.resource_name || sub.name}
                    </span>
                    <span className="text-outline">
                      ({sub.category} • {sub.region})
                    </span>
                    <span className="text-outline text-[11px]">
                      By: {sub.submitted_by}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="font-mono text-[11px] text-outline">
                      {formatDate(sub.created_at)}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        sub.status === 'approved'
                          ? 'bg-primary/15 text-primary'
                          : 'bg-error-container text-on-error-container'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
