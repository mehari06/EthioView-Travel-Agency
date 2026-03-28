# 🌲 EthioView

A premium cabin booking website built with **Next.js**, **Supabase**, and **Tailwind CSS**. This is the guest-facing side of The Wild Oasis project, allowing users to explore luxury cabins, make reservations, and manage their profile.

## 🚀 Key Features
- **Next.js App Router**: Optimized for performance and SEO.
- **Supabase Integration**: Backend handling with PostgreSQL and image storage.
- **NextAuth.js**: Secure social login via Google.
- **Server Actions**: Modern form handling and data mutations.
- **Responsive Design**: Beautiful UI built with Tailwind CSS.

## 🛠️ Tech Stack
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth / Auth.js (Google Provider)
- **Icons**: Heroicons & Lucide React

## 📦 Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
4. Run the development server: `npm run dev`

## Testing

This project now includes three test layers:

- Unit tests (`tests/unit`): pure logic with mocked dependencies
- Integration tests (`tests/integration`): component behavior and wiring
- E2E tests (`tests/e2e`): critical public page flows in a real browser

Run commands:

- `npm run test` (all unit + integration)
- `npm run test:unit`
- `npm run test:integration`
- `npm run test:e2e`

Testing quality principle:

- Prefer behavior-focused assertions over snapshots
- Mock only external boundaries (DB/auth/network), not core business behavior
- Keep tests deterministic and resistant to UI refactor noise
