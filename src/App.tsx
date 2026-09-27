/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Listing,
  Category,
  Region,
  UserProfile,
  EmergencyCategory,
  Submission,
} from './types';
import {
  fetchCategories,
  fetchRegions,
  fetchListings,
  fetchSubmissions,
  getCurrentUser,
  signOutUser,
} from './lib/supabase';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatusBanner } from './components/StatusBanner';
import { StatsSnapshot } from './components/StatsSnapshot';
import { HeroSearch } from './components/HeroSearch';
import { CategoryList } from './components/CategoryList';
import { ContactCard } from './components/ContactCard';
import { ContactDetailView } from './components/ContactDetailView';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ReportModal } from './components/ReportModal';
import { SubmitResourceModal } from './components/SubmitResourceModal';
import { AdminModal } from './components/AdminModal';
import { AuthModal } from './components/AuthModal';
import { SubmitResourceView } from './components/SubmitResourceView';
import { MySubmissionsView } from './components/MySubmissionsView';
import { AdminReviewView } from './components/AdminReviewView';

export type TabType =
  | 'home'
  | 'emergency-directory'
  | 'submit-resource'
  | 'my-submissions'
  | 'admin-review'
  | 'about';

export default function App() {
  // Navigation & Page state
  const [currentTab, setCurrentTab] = useState<TabType>('home');

  // Directory Data
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('Mumbai');
  const [activeCategory, setActiveCategory] = useState<EmergencyCategory | null>(null);

  // Selected Listing for preview & details
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // User & Auth
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [reportListing, setReportListing] = useState<Listing | null>(null);

  // Loading & Connectivity
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [userNotification, setUserNotification] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Monitor online / offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initial Data Fetch
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [cats, regs, list, subs, user] = await Promise.all([
        fetchCategories(),
        fetchRegions(),
        fetchListings(),
        fetchSubmissions(),
        getCurrentUser(),
      ]);

      setCategories(cats);
      setRegions(regs);
      setListings(list);
      setSubmissions(subs);
      setCurrentUser(user);

      // Pre-select first Mumbai listing for interactive preview
      if (list.length > 0) {
        const mumbaiFirst = list.find(
          (l) => l.region_name?.toLowerCase() === 'mumbai'
        );
        setSelectedListing(mumbaiFirst || list[0]);
      }
    } catch {
      setUserNotification('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Refresh listings (e.g. after approval or submission)
  const refreshListings = async () => {
    try {
      const [list, subs] = await Promise.all([
        fetchListings(),
        fetchSubmissions(),
      ]);
      setListings(list);
      setSubmissions(subs);
    } catch {
      // Quiet failover
    }
  };

  // Filtered Listings logic - supports combined Region + Category + Search filtering
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // 1. Region filter
      if (selectedRegion && selectedRegion !== 'All' && selectedRegion.toLowerCase() !== 'all regions') {
        const itemRegion = (item.region_name || '').trim().toLowerCase();
        const activeReg = selectedRegion.trim().toLowerCase();
        if (itemRegion !== activeReg) {
          return false;
        }
      }

      // 2. Category filter (supports exact name and UI labels like Govt Help and NGO Aid)
      if (activeCategory) {
        const itemCat = (item.category_name || '').trim().toLowerCase();
        const activeCat = activeCategory.trim().toLowerCase();
        const matchesCategory =
          itemCat === activeCat ||
          (activeCat.includes('govt') && (itemCat.includes('government') || itemCat.includes('govt'))) ||
          (activeCat.includes('ngo') && itemCat.includes('ngo'));
        if (!matchesCategory) {
          return false;
        }
      }

      // 3. Search query matching (Resource name, Category, Region, Address, Description, Toll/Phone, Keywords)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = item.name.toLowerCase().includes(q);
        const catMatch = (item.category_name || '').toLowerCase().includes(q);
        const regionMatch = (item.region_name || '').toLowerCase().includes(q);
        const addrMatch = item.address.toLowerCase().includes(q);
        const descMatch = (item.description || '').toLowerCase().includes(q);
        const phoneMatch = item.phone.toLowerCase().includes(q);
        const tollMatch = (item.toll_free || '').toLowerCase().includes(q);
        const hoursMatch = (item.operating_hours || '').toLowerCase().includes(q);

        // Emergency service keyword & synonym matching
        let keywordMatch = false;
        if (
          q.includes('hosp') ||
          q.includes('medic') ||
          q.includes('doctor') ||
          q.includes('icu') ||
          q.includes('trauma') ||
          q.includes('casualty')
        ) {
          keywordMatch = item.category_name === 'Medical' || (item.description || '').toLowerCase().includes('hospital');
        } else if (
          q.includes('ambul') ||
          q === '108'
        ) {
          keywordMatch = item.category_name === 'Medical' || (item.toll_free || '').includes('108') || (item.description || '').toLowerCase().includes('ambulance');
        } else if (
          q.includes('resc') ||
          q.includes('boat') ||
          q.includes('ndrf') ||
          q.includes('sdrf') ||
          q.includes('drown') ||
          q.includes('flood') ||
          q.includes('cyclone')
        ) {
          keywordMatch = item.category_name === 'Rescue' || (item.description || '').toLowerCase().includes('rescue');
        } else if (
          q.includes('shelt') ||
          q.includes('camp') ||
          q.includes('night') ||
          q.includes('bed') ||
          q.includes('refuge') ||
          q.includes('transit')
        ) {
          keywordMatch = item.category_name === 'Shelter' || (item.description || '').toLowerCase().includes('shelter');
        } else if (
          q.includes('food') ||
          q.includes('water') ||
          q.includes('ration') ||
          q.includes('meal') ||
          q.includes('kitchen') ||
          q.includes('potable') ||
          q.includes('grocery')
        ) {
          keywordMatch = item.category_name === 'Food & Water' || (item.description || '').toLowerCase().includes('water') || (item.description || '').toLowerCase().includes('ration');
        } else if (
          q.includes('govt') ||
          q.includes('control') ||
          q.includes('police') ||
          q.includes('helpline') ||
          q.includes('collector') ||
          q === '112' ||
          q === '1070' ||
          q === '1077' ||
          q === '1913' ||
          q === '1916'
        ) {
          keywordMatch = item.category_name === 'Government Helpline' || (item.description || '').toLowerCase().includes('control') || (item.description || '').toLowerCase().includes('disaster');
        } else if (
          q.includes('ngo') ||
          q.includes('volunt') ||
          q.includes('aid') ||
          q.includes('relief') ||
          q.includes('trust')
        ) {
          keywordMatch = item.category_name === 'NGO' || (item.description || '').toLowerCase().includes('volunteer');
        }

        if (
          !nameMatch &&
          !catMatch &&
          !regionMatch &&
          !addrMatch &&
          !descMatch &&
          !phoneMatch &&
          !tollMatch &&
          !hoursMatch &&
          !keywordMatch
        ) {
          return false;
        }
      }

      return true;
    });
  }, [listings, selectedRegion, activeCategory, searchQuery]);

  // Synchronize selectedListing with filteredListings so the interactive preview card
  // matches the active region and category filter instead of staying stuck on a different city
  useEffect(() => {
    setSelectedListing((prev) => {
      if (filteredListings.length === 0) {
        return null;
      }
      // If previous selection still exists in the active filtered results, maintain it
      if (prev && filteredListings.some((item) => item.id === prev.id)) {
        return prev;
      }
      // Otherwise, select the first matching listing in current filter
      return filteredListings[0];
    });
  }, [filteredListings]);

  // Handlers
  const handleSelectRegion = (regionName: string) => {
    setSelectedRegion(regionName);
  };

  const handleSelectCategory = (category: EmergencyCategory | 'all') => {
    if (category === 'all' || activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
    // Scroll down to listings
    const contactsSec = document.getElementById('contactsContainer');
    if (contactsSec) {
      contactsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickFilter = (keyword: string) => {
    setSearchQuery(keyword);
    const contactsSec = document.getElementById('contactsContainer');
    if (contactsSec) {
      contactsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFocusSearch = () => {
    setCurrentTab('home');
    setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const handleViewDetails = (listing: Listing) => {
    setSelectedListing(listing);
    const detailsSec = document.getElementById('contactDetailsSection');
    if (detailsSec) {
      detailsSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
    await refreshListings();
    setUserNotification('You have been signed out.');
    setTimeout(() => setUserNotification(null), 3000);
  };

  const pendingSubmissionsCount = submissions.filter(
    (s) => s.status === 'pending'
  ).length;

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      {/* Left Navigation Rail (Desktop) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        pendingSubmissionsCount={pendingSubmissionsCount}
      />

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <Header
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab as any);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onFocusSearch={handleFocusSearch}
          onOpenSubmit={() => setIsSubmitModalOpen(true)}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
          pendingSubmissionsCount={pendingSubmissionsCount}
        />

        {/* Offline Banner */}
        {isOffline && (
          <div className="w-full bg-error text-on-error py-2 px-4 text-center font-body-sm text-xs font-semibold flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">wifi_off</span>
            <span>You're currently offline. Showing cached emergency contacts.</span>
          </div>
        )}

        {/* Notification Toast */}
        {userNotification && (
          <div className="w-full bg-primary text-on-primary py-2 px-4 text-center font-body-sm text-xs font-semibold flex items-center justify-center gap-2 animate-fadeIn">
            <span>{userNotification}</span>
            <button
              onClick={() => setUserNotification(null)}
              className="text-on-primary/80 hover:text-on-primary ml-2 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Main Workspace */}
        <main className="w-full flex-1 p-space-md lg:p-margin bg-background">
          <div className="flex flex-col w-full max-w-6xl mx-auto">
            {/* System Status Banner */}
            <StatusBanner />

            {/* View 1: Home Screen */}
            {currentTab === 'home' && (
              <>
                {/* Hero Search */}
                <HeroSearch
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedRegion={selectedRegion}
                  onSelectRegion={handleSelectRegion}
                  regions={regions}
                  onQuickFilter={handleQuickFilter}
                  searchInputRef={searchInputRef}
                  onSubmitSearch={() => {
                    const contactsSec = document.getElementById('contactsContainer');
                    if (contactsSec) {
                      contactsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                />

                {/* Incident Operations Snapshot */}
                <StatsSnapshot />

                {/* Emergency Services (Categories) */}
                <CategoryList
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                />

                {/* Emergency Contacts Section */}
                <section className="w-full mb-space-xl" id="contactsContainer">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-space-md gap-space-xs">
                    <div>
                      <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                        Emergency Contacts
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Immediate verified dispatch contacts active in{' '}
                        <span className="font-semibold text-on-surface">
                          {selectedRegion === 'All' ? 'All Monitored Regions' : selectedRegion}
                        </span>
                        {activeCategory && (
                          <span>
                            {' '}
                            • Category:{' '}
                            <span className="font-semibold text-primary">{activeCategory}</span>
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-space-xs">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      <span className="font-label-code text-label-code text-primary font-bold">
                        LIVE QUEUE ROUTING
                      </span>
                    </div>
                  </div>

                  {/* Listings Grid or Loading / Empty States */}
                  {isLoading ? (
                    <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
                      <div className="inline-block w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                      <p className="font-body-md text-on-surface-variant font-medium">
                        Loading emergency contacts...
                      </p>
                    </div>
                  ) : filteredListings.length === 0 ? (
                    <div className="text-center py-14 px-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-surface-container flex items-center justify-center text-outline">
                        <span className="material-symbols-outlined text-[28px]">search_off</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">
                        {searchQuery
                          ? 'No results found.'
                          : 'No emergency services found for this region.'}
                      </h3>
                      <p className="font-body-sm text-on-surface-variant max-w-md mx-auto mb-4">
                        {searchQuery
                          ? `No contacts matched "${searchQuery}". Try searching for Ambulance, Hospital, Rescue, or Shelter.`
                          : `There are currently no active emergency dispatch centers listed for ${selectedRegion}. Try selecting "All Regions" or another city.`}
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedRegion('All');
                          setActiveCategory(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-primary text-on-primary font-action-button text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {filteredListings.map((listing) => (
                        <ContactCard
                          key={listing.id}
                          listing={listing}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                  )}
                </section>

                {/* Interactive Detail View Section */}
                <ContactDetailView
                  listing={selectedListing}
                  onOpenReport={(item) => setReportListing(item)}
                />

                {/* About ResQ Section */}
                <AboutSection />
              </>
            )}

            {/* View 2: Full Emergency Directory Tab */}
            {currentTab === 'emergency-directory' && (
              <div className="flex flex-col gap-space-lg">
                <div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-outline-variant/30 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20 mb-4">
                    <div>
                      <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                        Complete Emergency Directory
                      </h1>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Verified contact records for hospitals, rescue squadrons, shelters, and crisis management cells.
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentTab('submit-resource')}
                      className="px-4 py-2 rounded-xl bg-primary text-on-primary font-action-button text-xs font-semibold hover:bg-primary-container transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      <span>Submit Resource</span>
                    </button>
                  </div>

                  {/* Filter Toolbar */}
                  <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-4">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                        search
                      </span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, region, or keyword..."
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-outline-variant/30 bg-surface text-body-sm text-on-surface focus:outline-none focus:border-primary text-xs"
                      />
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="h-10 px-3 rounded-lg border border-outline-variant/30 bg-surface text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
                      >
                        <option value="All">All Regions</option>
                        {regions.map((r) => (
                          <option key={r.id} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>

                      <select
                        value={activeCategory || 'all'}
                        onChange={(e) =>
                          setActiveCategory(
                            e.target.value === 'all'
                              ? null
                              : (e.target.value as EmergencyCategory)
                          )
                        }
                        className="h-10 px-3 rounded-lg border border-outline-variant/30 bg-surface text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Listings */}
                  {filteredListings.length === 0 ? (
                    <div className="text-center py-12 text-on-surface-variant">
                      <p className="font-semibold mb-1">No emergency services found.</p>
                      <p className="text-xs text-outline">
                        Try clearing filters or changing your search criteria.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {filteredListings.map((listing) => (
                        <ContactCard
                          key={listing.id}
                          listing={listing}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Detail View on Directory page */}
                <ContactDetailView
                  listing={selectedListing}
                  onOpenReport={(item) => setReportListing(item)}
                />
              </div>
            )}

            {/* View 3: Submit Resource Tab */}
            {currentTab === 'submit-resource' && (
              <SubmitResourceView
                currentUser={currentUser}
                regions={regions}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                onSuccess={() => {
                  refreshListings();
                  setUserNotification('Resource submitted successfully for admin review.');
                  setTimeout(() => setUserNotification(null), 4000);
                }}
                onViewMySubmissions={() => setCurrentTab('my-submissions')}
              />
            )}

            {/* View 4: Contributor My Submissions Tab */}
            {currentTab === 'my-submissions' && (
              <MySubmissionsView
                currentUser={currentUser}
                submissions={submissions}
                onOpenSubmit={() => setCurrentTab('submit-resource')}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            )}

            {/* View 5: Admin Review Tab */}
            {currentTab === 'admin-review' && (
              <AdminReviewView
                currentUser={currentUser}
                submissions={submissions}
                onRefresh={refreshListings}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            )}

            {/* View 6: About Screen */}
            {currentTab === 'about' && (
              <div className="flex flex-col gap-space-lg">
                <AboutSection />

                {/* Additional Mission & El Niño Information */}
                <div className="bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-outline-variant/30 shadow-xs">
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
                    El Niño & Flood Resilience Directory
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                    Severe weather anomalies brought on by El Niño cycles and intense coastal precipitation regularly overwhelm public hospital triage and municipal lines. ResQ was built to eradicate information delays by maintaining a fast, direct, and zero-ad emergency access directory.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-surface border border-outline-variant/20">
                      <div className="flex items-center gap-2 mb-1 text-primary font-bold">
                        <span className="material-symbols-outlined text-[20px]">security</span>
                        <span>Verified Contact Data</span>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant">
                        Every listing is verified by civic wardens with direct dispatch phone routing to minimize transfer holds.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface border border-outline-variant/20">
                      <div className="flex items-center gap-2 mb-1 text-secondary font-bold">
                        <span className="material-symbols-outlined text-[20px]">groups</span>
                        <span>Community & NGO Integration</span>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant">
                        Connects civil defense teams with on-the-ground volunteer relief hubs supplying food, potable water, and emergency boat rescues.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <Footer onSelectTab={(tab) => setCurrentTab(tab as any)} />
          </div>
        </main>
      </div>

      {/* Modals */}
      {/* 1. Report Incorrect Information Modal */}
      {reportListing && (
        <ReportModal
          listing={reportListing}
          onClose={() => setReportListing(null)}
        />
      )}

      {/* 2. Submit Emergency Resource Modal */}
      {isSubmitModalOpen && (
        <SubmitResourceModal
          currentUser={currentUser}
          regions={regions}
          onClose={() => setIsSubmitModalOpen(false)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onSuccess={() => {
            refreshListings();
            setUserNotification('Resource submitted successfully for admin review.');
            setTimeout(() => setUserNotification(null), 4000);
          }}
          onViewMySubmissions={() => {
            setIsSubmitModalOpen(false);
            setCurrentTab('my-submissions');
          }}
        />
      )}

      {/* 3. Admin Submissions Review Modal */}
      {isAdminModalOpen && (
        <AdminModal
          onClose={() => setIsAdminModalOpen(false)}
          onListingApproved={() => {
            refreshListings();
            setUserNotification('Listing approved and published to live directory!');
            setTimeout(() => setUserNotification(null), 4000);
          }}
        />
      )}

      {/* 4. Authentication Modal */}
      {isAuthModalOpen && (
        <AuthModal
          currentUser={currentUser}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={async (user) => {
            setCurrentUser(user);
            await refreshListings();
            setUserNotification(`Welcome, ${user.email} (${user.role})`);
            setTimeout(() => setUserNotification(null), 3000);
          }}
          onSignOut={handleSignOut}
        />
      )}
    </div>
  );
}
