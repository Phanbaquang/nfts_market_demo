# NFT Marketplace (TypeScript, Next.js App Router)

A skeleton NFT marketplace with mock data, Redux Toolkit state, and Ethers helpers.
**This is a starter** to plug in wallet connectors and fake transfers on Sepolia.

## Quick Start
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Env
Create `.env.local`:
```
NEXT_PUBLIC_ETHERSCAN_API_KEY = CXX1MNUU8UDRCVE3URQ82SKZZIXMQV2T8I
```

## Ai tool 
  `` Chat GPT
  `` V0dev 
## Structure
- `app/` pages (Home, NFT detail, Favorites, Transactions)
- `redux/` store and slices
- `lib/` constants, ethers provider, OpenSea client (with mock fallback)
- `types/` TypeScript models

## Notes
- `/api/nfts` returns mock items by default for local dev.
- Hook up real wallet connect (wagmi/RainbowKit) and transaction flow as needed.
## Link demo 
- https://nftsmarketdemov5.vercel.app/
