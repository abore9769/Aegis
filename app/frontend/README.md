# Frontend

Next.js web app for the Aegis platform. Provides the donor dashboard, verification review queue, campaign management, aid distribution maps, and wallet connection.

## Tech stack

- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS v4
- Radix UI
- TanStack React Query
- Leaflet (maps)
- Freighter API (Stellar wallet)
- next-intl (i18n — English, Spanish, French)

## Structure

```
src/
├── app/
│   ├── [locale]/           # Localised routes
│   │   ├── dashboard/      # Donor dashboard with maps and stats
│   │   ├── campaigns/      # Campaign management
│   │   ├── verification-review/  # AI verification review queue
│   │   └── claim-receipt/  # Claim receipt page
│   ├── api/health/         # Health check endpoint
│   └── layout.tsx
├── components/             # Shared UI components
├── hooks/                  # Data-fetching hooks (React Query)
├── lib/                    # API clients, stores, utilities
├── messages/               # i18n strings (en, es, fr)
└── types/                  # TypeScript types
```

## Setup

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

### Environment variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_STELLAR_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_AID_ESCROW_CONTRACT_ID=your_contract_id
NEXT_PUBLIC_USE_MOCKS=false
```

Set `NEXT_PUBLIC_USE_MOCKS=true` to run against mock API handlers when the backend is unavailable.

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Dev server on port 3000 |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm lint` | ESLint |
| `pnpm type-check` | TypeScript check |
| `pnpm test` | Jest |

## Health check

```
GET /api/health
→ { "status": "ok", "service": "aegis-frontend" }
```

## Deployment

Deploy to Vercel. Set root directory to `app/frontend` and add environment variables in the Vercel dashboard.
