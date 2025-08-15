import { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const ETHERSCAN_BASE_URL = 'https://api-sepolia.etherscan.io/api';

// Kiểu dữ liệu trả về từ API
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

// Kiểu dữ liệu đã xử lý
export interface Transaction {
    hash: string;
    from: string;
    to: string;
    valueETH: string;
    time: string;
}

export default function useTransactions(address: string) {
    const [txs, setTxs] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!address) return;

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
                        page: 1,
                        offset: 10, // số giao dịch muốn lấy
                        sort: 'desc',
                        apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
                    }
                });


                const txList: Transaction[] = (response.data.result as EtherscanTx[]).map(tx => ({
                    hash: tx.hash,
                    from: tx.from,
                    to: tx.to,
                    valueETH: ethers.formatEther(tx.value), // Ethers v6
                    time: new Date(Number(tx.timeStamp) * 1000).toLocaleString()
                }));
                setTxs(txList);
            } catch (err) {
                console.error('Error fetching transactions:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchTxs();
    }, [address]);

    return { txs, loading };
}
