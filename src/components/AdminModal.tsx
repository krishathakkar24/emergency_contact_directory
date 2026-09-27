import React, { useState, useEffect } from 'react';
import { Submission } from '../types';
import { fetchSubmissions, updateSubmissionStatus } from '../lib/supabase';

interface AdminModalProps {
  onClose: () => void;
  onListingApproved: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  onClose,
  onListingApproved,
}) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const data = await fetchSubmissions();
      setSubmissions(data);
    } catch {
      setFeedback('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleAction = async (id: string, action: 'approved' | 'rejected') => {
    setActioningId(id);
    setFeedback(null);
    try {
      const res = await updateSubmissionStatus(id, action);
      if (res.success) {
        setFeedback(
          action === 'approved'
            ? 'Resource approved successfully.'
            : 'Resource rejected.'
        );
        await loadSubmissions();
        if (action === 'approved') {
          onListingApproved();
        }
      } else {
        setFeedback(res.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setFeedback('Something went wrong. Please try again.');
    } finally {
      setActioningId(null);
    }
  };

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');
  const pastSubmissions = submissions.filter((s) => s.status !== 'pending');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl p-6 shadow-xl border border-outline-variant/30 text-on-surface my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">
              admin_panel_settings
            </span>
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Admin Dispatch Queue
              </h3>
              <p className="font-body-sm text-xs text-outline">
                Review and verify pending public safety submissions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        {feedback && (
          <div className="mt-3 p-3 rounded-xl bg-primary/10 text-primary text-xs font-semibold flex items-center justify-between shrink-0">
            <span>{feedback}</span>
            <button onClick={() => setFeedback(null)} className="text-outline text-sm">
              ✕
            </button>
          </div>
        )}

        {/* Content list */}
        <div className="flex-1 overflow-y-auto pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-label-badge text-label-badge text-outline uppercase font-bold">
              Pending Verification ({pendingSubmissions.length})
            </span>
          </div>

          {loading ? (
            <div className="text-center py-8 text-on-surface-variant font-body-sm">
              Loading submissions...
            </div>
          ) : pendingSubmissions.length === 0 ? (
            <div className="text-center py-8 bg-surface rounded-xl border border-outline-variant/20 p-6">
              <span className="material-symbols-outlined text-primary text-[36px] mb-2">
                verified
              </span>
              <p className="font-body-sm text-sm font-semibold text-on-surface">
                All submissions reviewed
              </p>
              <p className="font-body-sm text-xs text-outline">
                There are no pending listings awaiting admin approval right now.
              </p>
            </div>
          ) : (
            pendingSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-surface rounded-xl p-4 border border-outline-variant/30 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-label-badge text-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                        {sub.category}
                      </span>
                      <span className="font-body-sm text-xs text-outline">
                        Region: {sub.region}
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-sm font-bold text-on-surface">
                      {sub.name}
                    </h4>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      {sub.description}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed/40 text-secondary text-xs font-bold uppercase shrink-0">
                    Pending
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-surface-container-low p-2.5 rounded-lg text-on-surface-variant">
                  <div>
                    <strong className="text-on-surface">Phone:</strong> {sub.phone}
                  </div>
                  <div>
                    <strong className="text-on-surface">Hours:</strong> {sub.operating_hours}
                  </div>
                  <div className="sm:col-span-2">
                    <strong className="text-on-surface">Address:</strong> {sub.address}
                  </div>
                  {sub.submitted_by && (
                    <div className="sm:col-span-2 text-outline">
                      Submitted by: {sub.submitted_by} • {new Date(sub.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    disabled={actioningId === sub.id}
                    onClick={() => handleAction(sub.id, 'rejected')}
                    className="px-4 py-2 rounded-lg bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface font-action-button text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    disabled={actioningId === sub.id}
                    onClick={() => handleAction(sub.id, 'approved')}
                    className="px-4 py-2 rounded-lg bg-primary text-on-primary font-action-button text-xs font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 cursor-pointer shadow-xs flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>Approve & Publish</span>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Past reviews */}
          {pastSubmissions.length > 0 && (
            <div className="pt-4 border-t border-outline-variant/20">
              <span className="font-label-badge text-label-badge text-outline uppercase font-bold block mb-2">
                Processed Submissions ({pastSubmissions.length})
              </span>
              <div className="space-y-2">
                {pastSubmissions.slice(0, 5).map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface text-xs text-on-surface-variant border border-outline-variant/20"
                  >
                    <div>
                      <span className="font-semibold text-on-surface">{sub.name}</span>
                      <span className="text-outline ml-2">({sub.category} • {sub.region})</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        sub.status === 'approved'
                          ? 'bg-primary-fixed/40 text-primary'
                          : 'bg-error-container text-on-error-container'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-outline-variant/20 mt-4 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="h-10 px-5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-action-button text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
