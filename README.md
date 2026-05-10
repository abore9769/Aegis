# Aegis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stellar](https://img.shields.io/badge/Blockchain-Stellar-blue.svg)](https://stellar.org)
[![NestJS](https://img.shields.io/badge/Backend-NestJS-red.svg)](https://nestjs.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-black.svg)](https://nextjs.org)
[![Soroban](https://img.shields.io/badge/Smart%20Contracts-Soroban-orange.svg)](https://soroban.stellar.org)

Open-source humanitarian aid platform on the Stellar blockchain. NGOs fund on-chain escrow, recipients claim via QR code or wallet link, and an AI service verifies eligibility while protecting privacy. Every distribution is recorded on-chain — full donor transparency, zero middlemen.

---

## How it works

1. An NGO creates a campaign and funds the on-chain escrow contract
2. Recipients receive a QR code or `aegis://` deep link to claim their package
3. The AI service verifies eligibility — OCR, fraud detection, proof-of-life — while stripping all PII
4. On approval, funds are released directly to the recipient's Stellar wallet
5. Every step is anchored on-chain and visible on the donor dashboard

---

## Monorepo structure

```
app/
├── frontend/       # Next.js web app
├── backend/        # NestJS REST API
├── ai-service/     # Python FastAPI — OCR, verification, PII scrubbing
├── mobile/         # Expo React Native field app
└── onchain/        # Rust Soroban smart contracts
```

Each package has its own README with setup instructions.

---

## Quick start

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 9
- Python ≥ 3.10
- Rust + Soroban CLI
- Redis

### Install

```bash
git clone https://github.com/abore9769/Aegis.git
cd Aegis
pnpm install
```

### Configure

```bash
cp app/backend/.env.example app/backend/.env
cp app/ai-service/.env.example app/ai-service/.env
cp app/mobile/.env.example app/mobile/.env
```

### Run

```bash
# Backend — http://localhost:3001
pnpm --filter backend start:dev

# Frontend — http://localhost:3000
pnpm --filter frontend dev

# AI service — http://localhost:8000
cd app/ai-service && uvicorn main:app --reload

# Mobile
pnpm --filter mobile start
```

---

## Packages

| Package | README |
|---|---|
| Frontend | [app/frontend/README.md](app/frontend/README.md) |
| Backend | [app/backend/README.md](app/backend/README.md) |
| Smart Contracts | [app/onchain/README.md](app/onchain/README.md) |
| Mobile | [app/mobile/README.md](app/mobile/README.md) |
| AI Service | [app/ai-service/README.md](app/ai-service/README.md) |

---

## Contributing

1. Fork and create a branch: `git checkout -b feature/your-feature`
2. Make changes with tests
3. Run `pnpm lint && pnpm test`
4. Open a PR with a clear description

---

## License

MIT — see [LICENSE](LICENSE) for details.

## Community

Discord: [discord.gg/gBmApTNVV](https://discord.gg/gBmApTNVV) · Maintainer: [@pulsefy](https://github.com/Pulsefy)
