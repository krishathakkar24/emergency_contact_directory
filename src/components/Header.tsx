import React from 'react';
import { UserProfile } from '../types';
import { LOGO_URL } from './Sidebar';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onFocusSearch: () => void;
  onOpenSubmit: () => void;
  onOpenAdmin: () => void;
  pendingSubmissionsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onOpenAuth,
  onFocusSearch,
  onOpenSubmit,
  onOpenAdmin,
  pendingSubmissionsCount = 0,
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/30">
      <div className="h-16 w-full px-space-md lg:px-gutter flex items-center justify-between gap-space-md">
        {/* Mobile Logo */}
        <div
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-space-sm md:hidden cursor-pointer"
        >
          <img alt="ResQ Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">ResQ</span>
        </div>

        {/* Center Dispatch Status Indicator */}
        <div className="hidden md:flex items-center gap-space-sm text-on-surface-variant">
          <span className="font-label-code text-label-code bg-surface-container-low px-space-xs py-0.5 rounded border border-outline-variant/40 text-on-surface-variant font-semibold">
            ESC: DIRECTORY
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Ready for incident dispatch
          </span>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-space-sm ml-auto">
          {/* Quick search input button */}
          <button
            onClick={onFocusSearch}
            className="hidden sm:flex items-center gap-space-xs bg-surface-container-low border border-outline-variant/40 rounded-lg px-space-sm py-1.5 hover:bg-surface-container transition-colors cursor-pointer text-left"
            title="Search emergency services (⌘K)"
          >
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <span className="font-body-sm text-body-sm text-outline">Quick search</span>
            <span className="font-label-code text-label-code text-outline ml-space-sm bg-surface-container-lowest px-1 rounded border border-outline-variant/30">
              ⌘K
            </span>
          </button>

          {/* User profile button with subtle role indicator */}
          {currentUser ? (
            <div className="flex items-center gap-space-xs">
              {currentUser.role === 'Admin' && pendingSubmissionsCount > 0 && (
                <button
                  onClick={() => onSelectTab('admin-review')}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary/15 text-secondary text-xs font-semibold hover:bg-secondary/25 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">notifications</span>
                  <span>{pendingSubmissionsCount} Pending</span>
                </button>
              )}
              <button
                onClick={onOpenAuth}
                className="h-8 px-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center gap-1.5 hover:bg-primary/20 transition-colors cursor-pointer"
                title={`Signed in as ${currentUser.email} (${currentUser.role})`}
              >
                <div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                  {currentUser.email.slice(0, 1).toUpperCase()}
                </div>
                <span className="font-body-sm text-xs font-medium max-w-[100px] truncate hidden md:inline">
                  {currentUser.email.split('@')[0]}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface text-outline font-semibold border border-outline-variant/30 hidden sm:inline">
                  {currentUser.role}
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary-container transition-colors cursor-pointer"
              title="Sign in / Register"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <nav className="flex md:hidden items-center justify-around px-space-sm bg-surface-container-lowest border-t border-outline-variant/20 overflow-x-auto text-xs">
        <button
          onClick={() => onSelectTab('home')}
          className={`py-space-sm px-space-xs font-action-button text-action-button transition-colors whitespace-nowrap cursor-pointer ${
            currentTab === 'home'
              ? 'text-primary border-b-2 border-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onSelectTab('emergency-directory')}
          className={`py-space-sm px-space-xs font-action-button text-action-button transition-colors whitespace-nowrap cursor-pointer ${
            currentTab === 'emergency-directory'
              ? 'text-primary border-b-2 border-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Directory
        </button>

        {currentUser?.role === 'Admin' ? (
          <button
            onClick={() => onSelectTab('admin-review')}
            className={`py-space-sm px-space-xs font-action-button text-action-button transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'admin-review'
                ? 'text-secondary border-b-2 border-secondary font-bold'
                : 'text-secondary hover:text-secondary-fixed'
            }`}
          >
            Review ({pendingSubmissionsCount})
          </button>
        ) : (
          <button
            onClick={() => onSelectTab('submit-resource')}
            className={`py-space-sm px-space-xs font-action-button text-action-button transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'submit-resource'
                ? 'text-primary border-b-2 border-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Submit
          </button>
        )}

        {currentUser?.role === 'Contributor' && (
          <button
            onClick={() => onSelectTab('my-submissions')}
            className={`py-space-sm px-space-xs font-action-button text-action-button transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'my-submissions'
                ? 'text-primary border-b-2 border-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            My Subs
          </button>
        )}

        <button
          onClick={() => onSelectTab('about')}
          className={`py-space-sm px-space-xs font-action-button text-action-button transition-colors whitespace-nowrap cursor-pointer ${
            currentTab === 'about'
              ? 'text-primary border-b-2 border-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          About
        </button>
      </nav>
    </header>
  );
};
