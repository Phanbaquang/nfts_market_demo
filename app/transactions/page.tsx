'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function TransactionsPage() {
  const history = useSelector((s: RootState) => s.transactions.history);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Transaction History</h1>
      {history.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">NFT</th>
              <th className="p-2 text-left">Buyer</th>
              <th className="p-2 text-left">Seller</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-2">{tx.id}</td>
                <td className="p-2">{tx.nftId}</td>
                <td className="p-2">{tx.buyer}</td>
                <td className="p-2">{tx.seller}</td>
                <td className="p-2">{tx.amount} {tx.token}</td>
                <td className="p-2">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
