# Smart Contracts

Soroban smart contracts for the Aegis platform, written in Rust. Handles on-chain escrow, fund locking, and claimable aid package disbursement on the Stellar network.

## Contract: AidEscrow

The `AidEscrow` contract manages the full lifecycle of an aid package on-chain.

### How it works

1. Admin calls `fund()` to deposit tokens into the contract pool
2. Admin calls `create_package()` to lock funds for a specific recipient
3. Recipient calls `claim()` to receive their funds directly
4. Expired or cancelled packages can be `refund()`ed back to the pool

### Core rules

- Funds must be deposited via `fund()` before packages can be created
- A package cannot be created if `contract balance < total locked + new amount`
- Only the admin or an authorised distributor can create packages
- Only the recipient can claim their own package
- Packages can have an expiration time — claiming is blocked after expiry

### State transitions

```
Created → Claimed
Created → Expired → Refunded
Created → Cancelled → Refunded
```

## Method reference

| Method | Description | Who can call |
|---|---|---|
| `init(admin)` | Initialise contract and set admin | Anyone (once) |
| `fund(token, from, amount)` | Deposit tokens into the pool | `from` |
| `create_package(...)` | Lock funds for a recipient | Admin / distributor |
| `batch_create_packages(...)` | Create multiple packages at once | Admin / distributor |
| `claim(id)` | Recipient claims their package | Recipient |
| `disburse(id)` | Admin manually sends funds to recipient | Admin |
| `revoke(id)` | Cancel an active package | Admin |
| `refund(id)` | Return funds from expired/cancelled package | Admin |
| `extend_expiration(id, time)` | Extend a package's expiry | Admin |
| `withdraw_surplus(to, amount, token)` | Withdraw unallocated funds | Admin |
| `add_distributor(addr)` | Grant distributor rights | Admin |
| `remove_distributor(addr)` | Revoke distributor rights | Admin |
| `pause()` / `unpause()` | Pause or resume contract operations | Admin |
| `get_package(id)` | Read full package details | Anyone |
| `get_aggregates(token)` | Read total committed/claimed/expired stats | Anyone |

## Events

| Event | When emitted |
|---|---|
| `escrow_funded` | Pool is funded |
| `package_created` | Package created for a recipient |
| `package_claimed` | Recipient claims their package |
| `package_disbursed` | Admin manually disburses |
| `package_revoked` | Package cancelled |
| `package_refunded` | Funds returned to pool |
| `batch_created_event` | Batch of packages created |
| `extended_event` | Package expiry extended |

## Setup

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add WebAssembly target
rustup target add wasm32-unknown-unknown

# Install Stellar CLI
cargo install --locked stellar-cli
```

## Build

```bash
cd app/onchain
cargo build --target wasm32-unknown-unknown --release
```

Or using the Makefile:

```bash
make build
```

## Test

```bash
cargo test
```

## Deploy

```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/aid_escrow.wasm \
  --source YOUR_SECRET_KEY \
  --network testnet
```

Copy the contract ID into `app/backend/.env` as `AID_ESCROW_CONTRACT_ID`.

## Initialise

```bash
stellar contract invoke \
  --id YOUR_CONTRACT_ID \
  --source YOUR_SECRET_KEY \
  --network testnet \
  -- init \
  --admin YOUR_ADMIN_ADDRESS
```

## Structure

```
contracts/
└── aid_escrow/
    ├── src/
    │   ├── lib.rs          # Contract entry points
    │   └── delegate.rs     # Auth delegation logic
    └── tests/              # Integration and unit tests
scripts/
├── deploy.sh
└── invoke.sh
```
