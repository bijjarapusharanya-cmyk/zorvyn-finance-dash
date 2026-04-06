import React from 'react';

const TransactionTable = () => {
  const transactions = [
    { id: 1, name: 'Adobe Subscription', date: 'Apr 04, 2026', amount: '-$52.99', type: 'Software' },
    { id: 2, name: 'Client Payment', date: 'Apr 03, 2026', amount: '+$2,400.00', type: 'Income' },
    { id: 3, name: 'Stripe Payout', date: 'Apr 01, 2026', amount: '+$1,150.00', type: 'Income' },
    { id: 4, name: 'AWS Cloud', date: 'Mar 30, 2026', amount: '-$120.50', type: 'Server' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-white/5">
            <th className="pb-4 font-medium">Description</th>
            <th className="pb-4 font-medium text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {transactions.map((t) => (
            <tr key={t.id} className="group hover:bg-white/[0.02]">
              <td className="py-4">
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-xs text-gray-500">{t.date} • {t.type}</div>
              </td>
              <td className={`py-4 text-right font-mono font-bold ${t.amount.startsWith('+') ? 'text-green-400' : 'text-pink-500'}`}>
                {t.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;