export const SELLER_ADDRESS = process.env.NEXT_PUBLIC_SELLER_ADDRESS || '0xSellerWalletAddressHere';
export const TOKENS = { ETH: 'ETH', USDT: process.env.NEXT_PUBLIC_ERC20_TOKEN_ADDRESS || '' };
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_KEY';
export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 11155111;
