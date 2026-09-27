import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full pt-space-lg pb-space-xl flex flex-col items-center text-center border-t border-outline-variant/30 mt-space-xl">
      <div className="flex items-center gap-space-xs mb-space-xs">
        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
          ResQ
        </span>
        <span className="text-outline-variant">•</span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Emergency help, when you need it.
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-space-md my-space-sm">
        <button
          onClick={() => {
            onSelectTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={() => {
            onSelectTab('emergency-directory');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          Emergency Directory
        </button>
        <button
          onClick={() => {
            onSelectTab('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          About
        </button>
        <a
          href="tel:112"
          className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          Helpline Desk (112)
        </a>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Public Safety Data
        </span>
      </div>

      <p className="font-body-sm text-body-sm text-outline max-w-xl mb-space-xs">
        Designed as a clean public service emergency directory project for El Niño and flood-affected districts. If you are experiencing an acute life-threatening emergency, always dial <span className="font-semibold text-tertiary">112</span> or your regional medical emergency line directly.
      </p>

      <div className="font-label-code text-label-code text-outline text-xs">
        © ResQ Public Safety Initiative. All directory data refreshed dynamically from Supabase.
      </div>
    </footer>
  );
};
