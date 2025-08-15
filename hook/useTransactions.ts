import { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const ETHERSCAN_BASE_URL = 'https://api-sepolia.etherscan.io/api';

interface EtherscanTx {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  valueETH: string;
  time: string;
}

export default function useTransactions(address: string, limit: number = 10) {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (!address || currentPage < 1) return;

    async function fetchTxs() {
      setLoading(true);
      try {
        const response = await axios.get(ETHERSCAN_BASE_URL, {
          params: {
            module: 'account',
            action: 'txlist',
            address,
            startblock: 0,
            endblock: 99999999,
            page: currentPage,
            offset: limit,
            sort: 'desc',
            apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
          }
        });

        const data = response.data;

        if (data.status === '1' && Array.isArray(data.result)) {
          const txList: Transaction[] = (data.result as EtherscanTx[]).map(tx => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            valueETH: ethers.formatEther(tx.value),
            time: new Date(Number(tx.timeStamp) * 1000).toLocaleString()
          }));

          setTxs(txList);

          // Etherscan không trả tổng số giao dịch, nên tạm tính dựa vào số lượng trả về
          // Nếu < limit nghĩa là đã tới trang cuối
          if (txList.length < limit && currentPage === totalPages) {
            setTotalPages(currentPage);
          } else if (txList.length === limit && totalPages < currentPage + 1) {
            setTotalPages(currentPage + 1); // tạm tăng dần để có next page
          }
        } else {
          setTxs([]);
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTxs();
  }, [address, currentPage, limit]);

  return { txs, loading, currentPage, setCurrentPage, totalPages };
}
