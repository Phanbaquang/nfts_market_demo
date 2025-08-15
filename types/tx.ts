export interface Transaction {
  id: string;
  nftId: string;
  buyer: string;
  seller: string;
  amount: number;
  token: 'ETH' | 'USDT';
  date: string;
  status: 'success' | 'failed';
}
