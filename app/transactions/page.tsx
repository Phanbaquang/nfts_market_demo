'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import useTransactions from '@/hook/useTransactions';
import useWallet from '../hooks/useWallet';

export default function TransactionsPage() {
  const { account } = useWallet();
  const { txs, loading, currentPage, setCurrentPage, totalPages } = useTransactions(account ?? "", 12);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Transaction History</h1>

      {loading && <p className="text-gray-500">Loading transactions...</p>}

      {txs.length === 0 && !loading ? (
        <p>No transactions yet</p>
      ) : (
        <div className="w-full flex flex-col items-center bg-gray-50">
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

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === page
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
