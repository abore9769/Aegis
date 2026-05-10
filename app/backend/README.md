# Backend

NestJS REST API for the Aegis platform. Handles campaigns, claims, verification, on-chain interactions, audit logging, and background job processing.

## Tech stack

- NestJS 11
- Prisma (SQLite dev / PostgreSQL prod)
- BullMQ + Redis (background queues)
- Pino (structured logging)
- Swagger (auto-generated API docs)
- Stellar SDK + Soroban

## Structure

```
src/
├── aid/                # Aid package management
├── analytics/          # Anonymised impact analytics
├── api-keys/           # API key lifecycle (create, rotate, revoke)
├── audit/              # Audit log
├── campaigns/          # Campaign CRUD and budget tracking
├── claims/             # Claim lifecycle, receipts, cancel & reissue
├── common/             # Guards, filters, interceptors, encryption
├── notifications/      # Outbox-pattern notification delivery
├── onchain/            # Soroban adapter, escrow service, ledger sync
├── session/            # Multi-step verification sessions
├── verification/       # AI verification flow and inbox
└── main.ts
prisma/
├── schema.prisma
└── seed.ts
```

## Setup

```bash
cp .env.example .env
pnpm install
pnpm --filter backend prisma:generate
pnpm --filter backend prisma:migrate
pnpm --filter backend start:dev
```

### Key environment variables

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3001
NODE_ENV=development

REDIS_HOST=localhost
REDIS_PORT=6379

STELLAR_RPC_URL=https://soroban-testnet.stellar.org
AID_ESCROW_CONTRACT_ID=your_contract_id

AI_SERVICE_URL=http://localhost:8000
VERIFICATION_MODE=mock          # set to "ai" in production

ENCRYPTION_KEY=32-char-secret
API_KEY=your-admin-api-key
CORS_ORIGINS=http://localhost:3000
```

## Scripts

| Script | Description |
|---|---|
| `pnpm start:dev` | Dev server with watch |
| `pnpm build` | Production build |
| `pnpm start:prod` | Run production build |
| `pnpm test` | Unit tests |
| `pnpm test:e2e` | End-to-end tests |
| `pnpm lint` | ESLint |
| `pnpm prisma:migrate` | Run DB migrations |
| `pnpm prisma:seed` | Seed demo data |
| `pnpm prisma:studio` | Open Prisma Studio |

## API docs

Available at `http://localhost:3001/api/docs` when `NODE_ENV=development`.

## Health check

```
GET /health
→ { "status": "ok" }
```

## Database

Prisma schema is in `prisma/schema.prisma`. Key models:

| Model | Purpose |
|---|---|
| `Campaign` | Aid campaigns with budget tracking |
| `Claim` | Individual aid claims with full lifecycle |
| `BalanceLedger` | Immutable ledger of all balance events |
| `VerificationRequest` | AI verification queue items |
| `ApiKey` | Hashed API keys with revocation support |
| `AuditLog` | Append-only audit trail |
| `NotificationOutbox` | Outbox-pattern email/SMS delivery |

## Deployment

Set `NODE_ENV=production`, switch `DATABASE_URL` to a PostgreSQL connection string, and set `VERIFICATION_MODE=ai` with a real `OPENAI_API_KEY`.
