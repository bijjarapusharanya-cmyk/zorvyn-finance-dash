import React from 'react';

const SummaryCards = () => {
  const data = [
    { label: 'Total Balance', amount: '$12,450', color: 'text-purple-400', trend: '+12%' },
    { label: 'Total Income', amount: '$8,200', color: 'text-green-400', trend: '+5%' },
    { label: 'Total Expenses', amount: '$3,150', color: 'text-pink-400', trend: '-2%' },
  ];

  return (
    // 'grid-cols-3' puts them in one row
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {data.map((item, index) => (
        <div key={index} className="glass-card p-6 border-l-4 border-purple-500 shadow-2xl">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">{item.label}</p>
            <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">{item.trend}</span>
          </div>
          <h2 className={`text-4xl font-black mt-4 tracking-tight ${item.color}`}>{item.amount}</h2>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;