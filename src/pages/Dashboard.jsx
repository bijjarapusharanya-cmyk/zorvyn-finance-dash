import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import transactionData from '../transactions.json'; 

const Dashboard = () => {
  const chartData = useMemo(() => {
    const processed = transactionData.slice(0, 15).map(item => {
      const values = Object.values(item);
      const rawAmount = values.find(v => typeof v === 'number') || 0;
      const dateLabel = values.find(v => typeof v === 'string' && v.includes('-')) || "Day";
      return { name: dateLabel, amount: Math.abs(rawAmount) };
    });
    return processed;
  }, []);

  return (
    <div className="space-y-6 lg:space-y-10 animate-in fade-in duration-700 p-4 md:p-0">
      {/* STATS GRID: Changed to gap-4 on mobile to save space */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="pro-card border-t-2 lg:border-t-4 border-t-purple-500">
          <p className="text-[var(--text-muted)] text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] mb-1 lg:mb-2">Portfolio</p>
          <h2 className="text-xl lg:text-3xl font-black text-[var(--text-main)]">$12,450.00</h2>
        </div>
        <div className="pro-card border-t-2 lg:border-t-4 border-t-green-500">
          <p className="text-[var(--text-muted)] text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] mb-1 lg:mb-2">Income</p>
          <h2 className="text-xl lg:text-3xl font-black text-green-500">$8,200.00</h2>
        </div>
        <div className="pro-card border-t-2 lg:border-t-4 border-t-pink-500">
          <p className="text-[var(--text-muted)] text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] mb-1 lg:mb-2">Expenses</p>
          <h2 className="text-xl lg:text-3xl font-black text-pink-500">$3,150.00</h2>
        </div>
        <div className="pro-card border-t-2 lg:border-t-4 border-t-blue-500">
          <p className="text-[var(--text-muted)] text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] mb-1 lg:mb-2">Saving Goal</p>
          <h2 className="text-xl lg:text-3xl font-black text-blue-400">75%</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* REVENUE FLOW: min-h reduced for mobile so user doesn't have to scroll forever */}
        <div className="lg:col-span-2 pro-card min-h-[300px] lg:min-h-[450px]">
          <h3 className="text-[var(--text-muted)] font-black text-[9px] lg:text-[10px] uppercase mb-6 lg:mb-10 tracking-[0.2em]">Revenue Flow</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--bg-main)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '12px',
                  fontSize: '10px'
                }} 
              />
              <Area type="monotone" dataKey="amount" stroke="var(--accent)" fill="url(#glow)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="pro-card">
          <h3 className="text-[var(--text-muted)] font-black text-[9px] lg:text-[10px] uppercase mb-6 lg:mb-8 tracking-[0.2em]">Recent Activity</h3>
          <div className="space-y-4 lg:space-y-6">
            {transactionData.slice(0, 5).map((t, i) => (
              <div key={i} className="flex justify-between items-center border-b border-[var(--border)] pb-3 lg:pb-4 last:border-0">
                <div className="font-bold text-[10px] lg:text-xs text-[var(--text-main)] uppercase truncate max-w-[120px]">
                  {Object.values(t)[2] || "Purchase"}
                </div>
                <div className="text-green-500 font-mono font-bold text-[10px] lg:text-xs shrink-0">
                  +${Math.abs(Object.values(t)[0]).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;