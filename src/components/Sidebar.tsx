import React from 'react';
import { UserProfile } from '../types';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenSubmit: () => void;
  onOpenAdmin: () => void;
  pendingSubmissionsCount?: number;
}

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1VAoduiwuSiyywiGbJffSPrj1uCy4Nqs8h1qsJqMqw_chVg5Dnm4okO2f8l96Y_EH9GWhpBYFDGwuqaEK68l67dzzXc1X9e_4WLM7Ww6avSOGWzQg_nowtuB5oYnXR5PhaxZwzxIfzpwHFCpQT-It-5D5SmAtl5xTgopnb2ys5BoA8TJbY0dSoB06FIr-PkJJ7YYCYPxb6tBmgV1Fi_44CLXL8HWr-_5bBBkQlkJRlkvYNbQpO0NER3IADu';

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onOpenAuth,
  onSignOut,
  onOpenSubmit,
  onOpenAdmin,
  pendingSubmissionsCount = 0,
}) => {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant/30 z-50 flex-col justify-between p-space-md">
      <div className="flex flex-col gap-space-lg">
        {/* Brand */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-space-sm px-space-xs py-space-xs text-left cursor-pointer group"
        >
          <img
            alt="ResQ Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={LOGO_URL}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface leading-none font-bold">
              ResQ
            </span>
            <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider mt-1">
              Directory
            </span>
          </div>
        </button>

        {/* Navigation items */}
        <nav className="flex flex-col gap-space-xs">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-space-sm px-space-sm py-space-sm rounded-lg transition-all text-left cursor-pointer ${
              currentTab === 'home'
                ? 'bg-surface-container-low text-primary font-action-button border-l-[3px] border-primary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="font-action-button text-action-button">Home</span>
          </button>

          <button
            onClick={() => onSelectTab('emergency-directory')}
            className={`flex items-center gap-space-sm px-space-sm py-space-sm rounded-lg transition-all text-left cursor-pointer ${
              currentTab === 'emergency-directory'
                ? 'bg-surface-container-low text-primary font-action-button border-l-[3px] border-primary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">contact_phone</span>
            <span className="font-action-button text-action-button">Emergency Directory</span>
          </button>

          {/* Submit Resource navigation option: visible to Contributors and Public Users */}
          {(!currentUser || currentUser.role !== 'Admin') && (
            <button
              onClick={() => onSelectTab('submit-resource')}
              className={`flex items-center gap-space-sm px-space-sm py-space-sm rounded-lg transition-all text-left cursor-pointer ${
                currentTab === 'submit-resource'
                  ? 'bg-surface-container-low text-primary font-action-button border-l-[3px] border-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span className="font-action-button text-action-button">Submit Resource</span>
            </button>
          )}

          {/* Contributor: My Submissions */}
          {currentUser?.role === 'Contributor' && (
            <button
              onClick={() => onSelectTab('my-submissions')}
              className={`flex items-center gap-space-sm px-space-sm py-space-sm rounded-lg transition-all text-left cursor-pointer ${
                currentTab === 'my-submissions'
                  ? 'bg-surface-container-low text-primary font-action-button border-l-[3px] border-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">folder_shared</span>
              <span className="font-action-button text-action-button">My Submissions</span>
            </button>
          )}

          {/* Admin: Admin Review */}
          {currentUser?.role === 'Admin' && (
            <button
              onClick={() => onSelectTab('admin-review')}
              className={`flex items-center justify-between px-space-sm py-space-sm rounded-lg transition-all text-left cursor-pointer ${
                currentTab === 'admin-review'
                  ? 'bg-surface-container-low text-secondary font-action-button border-l-[3px] border-secondary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                <span className="font-action-button text-action-button">Admin Review</span>
              </div>
              {pendingSubmissionsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-secondary text-on-secondary font-label-badge text-xs font-bold">
                  {pendingSubmissionsCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => onSelectTab('about')}
            className={`flex items-center gap-space-sm px-space-sm py-space-sm rounded-lg transition-all text-left cursor-pointer ${
              currentTab === 'about'
                ? 'bg-surface-container-low text-primary font-action-button border-l-[3px] border-primary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">info</span>
            <span className="font-action-button text-action-button">About</span>
          </button>
        </nav>
      </div>

      {/* Account / Auth Footer */}
      <div className="border-t border-outline-variant/30 pt-space-md">
        {currentUser ? (
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm p-space-xs">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                {currentUser.email.slice(0, 1).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-sm text-body-sm font-semibold truncate text-on-surface">
                  {currentUser.email}
                </span>
                <span className="font-label-badge text-label-badge text-outline">
                  {currentUser.role}
                </span>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="flex items-center justify-between w-full p-space-sm rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-error transition-colors text-left cursor-pointer"
            >
              <span className="font-action-button text-xs font-medium">Log Out</span>
              <span className="material-symbols-outlined text-[16px]">logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center justify-between w-full p-space-sm rounded-lg hover:bg-surface-container-low transition-colors group text-left cursor-pointer"
          >
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                  login
                </span>
              </div>
              <span className="font-action-button text-action-button text-on-surface font-semibold">
                Sign In
              </span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        )}
      </div>
    </aside>
  );
};
