'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import useTransactions from '@/hook/useTransactions';
import useWallet from '../hooks/useWallet';

export default function TransactionsPage() {
  const history = useSelector((s: RootState) => s.transactions.history);
  const { account } = useWallet();
  const { txs, loading } = useTransactions(account ?? "");

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Transaction History</h1>
      {txs.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
    <div className="w-full flex justify-center bg-gray-50">
      <div className="w-full max-w-[1240px] p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {txs.map((tx) => (
            <div
              key={tx.hash}
              className="bg-white shadow rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
            >
              {/* Hash & Time */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-gray-700">
                  {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                </span>
                <span className="text-xs text-gray-500">{tx.time}</span>
              </div>

              {/* From / To */}
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">From:</span>{" "}
                  {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">To:</span>{" "}
                  {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                </p>
              </div>

              {/* Value */}
              <div className="mt-3">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded">
                  {tx.valueETH} ETH
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      )}
    </div>
  );
}
