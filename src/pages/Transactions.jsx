import React from 'react';
import transactionData from '../transactions.json';

const Transactions = () => {
  return (
    /* Reduced padding on mobile (p-4) to prevent content squeezing */
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-700 p-4 md:p-8 lg:p-12">
      <header>
        {/* Responsive Title: Shrinks on mobile so it doesn't overlap header icons */}
        <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-[var(--text-main)]">
          Transactions
        </h1>
        <p className="text-[var(--text-muted)] text-xs lg:text-sm font-medium">
          Full ledger of {transactionData.length} records
        </p>
      </header>

      {/* MOBILE FIX: Added 'overflow-x-auto' to allow side-scrolling on phones */}
      <div className="pro-card overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[var(--border)] text-[9px] lg:text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                <th className="p-4 lg:p-6">Date</th>
                <th className="p-4 lg:p-6">Merchant</th>
                <th className="p-4 lg:p-6">Category</th>
                <th className="p-4 lg:p-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-main)]">
              {transactionData.map((item, i) => {
                const displayDate = item.expires || "Recent"; 
                const displayMerchant = item.card_brand || "General Purchase";
                const displayCategory = item.card_type || "MISC";
                
                const rawAmount = item.credit_limit || item.Amount || 0;
                const numericAmount = Number(String(rawAmount).replace(/[^0-9.-]+/g, ""));
                const formattedAmount = isNaN(numericAmount) ? "0.00" : numericAmount.toLocaleString();

                return (
                  <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--accent)]/5 transition-colors last:border-0">
                    <td className="p-4 lg:p-6 text-[10px] lg:text-sm text-[var(--text-muted)] font-medium">
                      {displayDate}
                    </td>
                    
                    <td className="p-4 lg:p-6 font-black text-xs lg:text-sm text-[var(--text-main)] uppercase tracking-tight">
                      {displayMerchant}
                    </td>

                    <td className="p-4 lg:p-6">
                      <span className="text-[8px] lg:text-[9px] font-black px-2 lg:px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full uppercase italic whitespace-nowrap">
                        {displayCategory}
                      </span>
                    </td>

                    <td className={`p-4 lg:p-6 text-right font-mono font-black text-xs lg:text-sm ${numericAmount > 5000 ? 'text-green-500' : 'text-pink-500'}`}>
                      {numericAmount > 0 ? `+$${formattedAmount}` : `-$${formattedAmount}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;