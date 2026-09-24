# ResQ - Emergency Contact Directory

A clean, responsive emergency contact directory web application designed for communities living in El Niño-affected and flood-prone areas. ResQ enables residents and frontline responders to quickly locate verified medical centers, rescue squadrons, emergency night shelters, potable water distribution points, government disaster helplines, and NGO support networks.

---

## Features

- **Instant Emergency Contact Directory**: Clean cards with verified dispatch phone numbers, addresses, operational statuses, and 24/7 hotline links.
- **Fast Search & Partial Matching**: Real-time filtering by service name, category, region, address keywords, and emergency hotlines (e.g. "hospital", "rescue", "Mumbai").
- **Region Filtering**: Quick-select region chips for Mumbai, Pune, Chennai, Kolkata, Ahmedabad, or All Regions.
- **Emergency Categories**:
  - Medical (Hospitals & trauma ambulances)
  - Rescue (Disaster relief & SAR units)
  - Shelter (Safe night havens & relief camps)
  - Food & Water (Potable water tankers & dry rations)
  - Government Helpline (Official state disaster desks)
  - NGO (Civil volunteer networks)
- **Interactive Detail View**: Detailed operational matrix, operating hours, GPS location navigation (`Get Directions`), and direct dispatch dialer (`Call Now`).
- **One-Tap Direct Calling**: Universal `tel:` links compatible with mobile dialers.
- **Report Incorrect Information**: Community reporting dialog for wrong phone numbers, wrong addresses, or discontinued services, saved directly to Supabase.
- **Resource Submissions (Authenticated)**: Registered volunteers and civic responders can submit new emergency relief sites.
- **Admin Review Queue**: Dedicated admin interface allowing administrators to review, approve, or reject pending submissions. Approved submissions are automatically published to the live directory.
- **Keyboard Shortcuts**: Quick search activation with `⌘K` / `Ctrl+K`.
- **Offline Resilient**: Informs users when network connectivity drops and continues serving cached emergency contacts.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion
- **Icons & Typography**: Google Material Symbols Outlined, Plus Jakarta Sans, JetBrains Mono
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security, Supabase Auth)
- **Bundler & Tooling**: Vite 8, tsx

---

## Installation & Local Development

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Set up Supabase environment variables:
   Copy `.env.example` to `.env` and configure your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   *Note: If no Supabase environment variables are provided, ResQ runs in a fully functional offline-first hybrid demo mode with pre-seeded data, localStorage persistence, and test accounts.*

4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your web browser.

---

## Supabase Setup Instructions

1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Navigate to the **SQL Editor** tab in your Supabase dashboard.
3. Copy the contents of `supabase_schema.sql` and run it to create the required tables (`profiles`, `categories`, `regions`, `listings`, `submissions`, `reports`) and Row-Level Security (RLS) policies.
4. Copy the contents of `supabase_seed.sql` and run it to seed initial categories, regions, and verified emergency listings.
5. In your project settings, copy the **Project URL** and **anon public key**.
6. Set these values in your environment variables:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

---

## Deployment Instructions

To create an optimized production build:

```bash
npm run build
```

The compiled assets will be placed in the `dist` directory, ready to deploy to any static hosting provider (Vercel, Netlify, Cloudflare Pages, Firebase Hosting, or Cloud Run).

For full-stack deployment with Node.js/Express:
```bash
npm run start
```
