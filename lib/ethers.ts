import { ethers } from 'ethers';

export const provider = typeof window !== 'undefined' && (window as any).ethereum
  ? new ethers.BrowserProvider((window as any).ethereum)
  : null;

export async function getEthBalance(address: string) {
  if (!provider) return '0';
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

export async function getTokenBalance(address: string, tokenAddress: string) {
  if (!provider) return '0';
  const abi = [
    "function balanceOf(address) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];
  const contract = new ethers.Contract(tokenAddress, abi, provider);
  const [rawBalance, decimals] = await Promise.all([
    contract.balanceOf(address),
    contract.decimals()
  ]);
  return ethers.formatUnits(rawBalance, decimals);
}
