import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { signInUser, signUpUser } from '../lib/supabase';

interface AuthModalProps {
  currentUser: UserProfile | null;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  onSignOut: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  onClose,
  onAuthSuccess,
  onSignOut,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Contributor');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = isSignUp
        ? await signUpUser(email.trim(), password.trim(), selectedRole)
        : await signInUser(email.trim(), password.trim());

      if (res.error) {
        setErrorMsg(res.error);
      } else if (res.user) {
        onAuthSuccess(res.user);
        onClose();
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoAccount = (demoEmail: string, role: UserRole) => {
    setEmail(demoEmail);
    setPassword('EmergencyPass2026!');
    setSelectedRole(role);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 shadow-xl border border-outline-variant/30 text-on-surface">
        {currentUser ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl">
              {currentUser.email.slice(0, 1).toUpperCase()}
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Account Active
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-1">
              {currentUser.email}
            </p>
            <span className="inline-block font-label-badge text-xs px-3 py-1 rounded-full bg-primary-fixed/40 text-primary uppercase font-bold mb-6">
              Role: {currentUser.role}
            </span>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-action-button text-action-button font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="flex-1 h-11 rounded-xl bg-error text-on-error font-action-button text-action-button font-semibold hover:opacity-90 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  verified_user
                </span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {isSignUp ? 'Create ResQ Account' : 'ResQ Sign In'}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-outline hover:text-on-surface p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-3.5">
              <div>
                <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.org"
                  className="w-full h-10 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-10 px-3 rounded-xl border border-outline-variant/30 bg-surface text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block font-body-sm text-xs font-semibold text-on-surface-variant mb-1">
                    Select Account Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('Contributor')}
                      className={`p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-colors ${
                        selectedRole === 'Contributor'
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-outline-variant/30 bg-surface text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <div className="font-semibold">Contributor</div>
                      <div className="text-[10px] text-outline font-normal mt-0.5">
                        Can submit emergency resources & track status
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('Public User')}
                      className={`p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-colors ${
                        selectedRole === 'Public User'
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-outline-variant/30 bg-surface text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <div className="font-semibold">Public User</div>
                      <div className="text-[10px] text-outline font-normal mt-0.5">
                        Search directory, view contacts, report issues
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-primary text-on-primary font-action-button text-action-button font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 cursor-pointer shadow-xs mt-1"
              >
                {loading
                  ? 'Verifying credentials...'
                  : isSignUp
                  ? `Create ${selectedRole} Account`
                  : 'Sign In'}
              </button>
            </form>

            {/* Quick Demo Access for Testing All 3 Roles */}
            <div className="mt-4 pt-3 border-t border-outline-variant/20">
              <span className="font-label-code text-[11px] text-outline block mb-2 font-semibold uppercase">
                Quick Test Accounts:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setDemoAccount('public@resq.org', 'Public User')}
                  className="p-2 rounded-lg bg-surface text-xs text-on-surface hover:bg-surface-container border border-outline-variant/30 text-left cursor-pointer"
                >
                  <div className="font-bold text-on-surface text-[11px]">Public User</div>
                  <div className="text-[9px] text-outline truncate">public@resq.org</div>
                </button>
                <button
                  type="button"
                  onClick={() => setDemoAccount('contributor@resq.org', 'Contributor')}
                  className="p-2 rounded-lg bg-surface text-xs text-on-surface hover:bg-surface-container border border-outline-variant/30 text-left cursor-pointer"
                >
                  <div className="font-bold text-primary text-[11px]">Contributor</div>
                  <div className="text-[9px] text-outline truncate">contributor@resq.org</div>
                </button>
                <button
                  type="button"
                  onClick={() => setDemoAccount('admin@resq.org', 'Admin')}
                  className="p-2 rounded-lg bg-surface text-xs text-on-surface hover:bg-surface-container border border-outline-variant/30 text-left cursor-pointer"
                >
                  <div className="font-bold text-secondary text-[11px]">Admin</div>
                  <div className="text-[9px] text-outline truncate">admin@resq.org</div>
                </button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                }}
                className="font-body-sm text-xs text-primary hover:underline font-semibold cursor-pointer"
              >
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : 'Need an account? Register as Contributor or Public User'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
