# NFT Marketplace (TypeScript, Next.js App Router)

A skeleton NFT marketplace with mock data, Redux Toolkit state, and Ethers helpers.
**This is a starter** to plug in wallet connectors and fake transfers on Sepolia.

## Quick Start
```bash
npm install
npm run dev
```

Open http://localhost:3000

<!-- ## Env
Create `.env.local`:
```
NEXT_PUBLIC_SELLER_ADDRESS=0xYourSellerOnSepolia
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_ERC20_TOKEN_ADDRESS= # optional USDT testnet
NEXT_PUBLIC_OPENSEA_API_KEY=     # optional
``` -->

## Structure
- `app/` pages (Home, NFT detail, Favorites, Transactions)
- `redux/` store and slices
- `lib/` constants, ethers provider, OpenSea client (with mock fallback)
- `types/` TypeScript models

## Notes
- `/api/nfts` returns mock items by default for local dev.
- Hook up real wallet connect (wagmi/RainbowKit) and transaction flow as needed.
