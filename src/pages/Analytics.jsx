import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid 
} from 'recharts';
import transactionData from '../transactions.json';

const Analytics = () => {
  const COLORS = ['#a855f7', '#ec4899', '#3b82f6', '#22c55e', '#eab308'];

  const cleanNum = (val) => {
    const n = Number(String(val).replace(/[^0-9.-]+/g, ""));
    return isNaN(n) ? 0 : Math.abs(n);
  };

  const merchantData = useMemo(() => {
    const map = {};
    transactionData.slice(0, 50).forEach(item => {
      const name = item.Merchant || item.Description || "Other";
      map[name] = (map[name] || 0) + cleanNum(item.amount || item['Transaction Amount'] || item.credit_limit);
    });
    return Object.keys(map).map(k => ({ name: k, value: map[k] }))
      .sort((a, b) => b.value - a.value).slice(0, 6);
  }, []);

  const brandAnalytics = useMemo(() => {
    const map = {};
    transactionData.forEach(item => {
      const brand = item.card_brand || "Unknown";
      if(!map[brand]) map[brand] = { name: brand, total: 0, count: 0 };
      map[brand].total += cleanNum(item.credit_limit);
      map[brand].count += 1;
    });
    return Object.values(map).map(obj => ({
      name: obj.name,
      avgLimit: Math.round(obj.total / obj.count)
    }));
  }, []);

  return (
    /* Reduced padding on mobile (p-4) to match the new App.js layout */
    <div className="space-y-6 lg:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 p-4 md:p-8 lg:p-12">
      <header>
        {/* Responsive Header: Smaller on mobile to prevent overlapping search bar */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase italic text-[var(--text-main)] leading-none">
          Market Intelligence
        </h1>
        <p className="text-[var(--text-muted)] font-bold tracking-[0.2em] lg:tracking-[0.3em] uppercase text-[8px] lg:text-[10px] mt-2">
          Advanced Financial Data Systems // Ver 2.0
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Top Merchant Exposure */}
        <div className="lg:col-span-2 pro-card min-h-[350px] lg:min-h-[400px]">
          <div className="flex justify-between items-center mb-6 lg:mb-10">
            <h3 className="text-[var(--text-muted)] font-black text-[9px] lg:text-[10px] uppercase tracking-widest">Top Merchant Exposure</h3>
            <span className="text-[8px] lg:text-[10px] bg-purple-500/20 text-purple-400 px-2 lg:px-3 py-1 rounded-full font-bold">LIVE DATA</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={merchantData} layout="vertical" margin={{ left: -20, right: 10 }}>
              <XAxis type="number" hide />
              {/* Reduced width for mobile labels to prevent squeezing the bars */}
              <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={9} width={80} />
              <Tooltip 
                cursor={{fill: 'var(--accent)', opacity: 0.05}} 
                contentStyle={{backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-main)', fontSize: '10px'}}
              />
              <Bar dataKey="value" fill="var(--accent)" radius={[0, 4, 4, 0]} barSize={15} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Market Share (Pie Chart) */}
        <div className="pro-card">
           <h3 className="text-[var(--text-muted)] font-black text-[9px] lg:text-[10px] uppercase mb-6 lg:mb-10 tracking-widest">Market Share</h3>
           <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={brandAnalytics} innerRadius={60} outerRadius={85} dataKey="avgLimit" stroke="none" paddingAngle={5}>
                {brandAnalytics.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{display: 'none'}} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {brandAnalytics.map((b, i) => (
              <div key={i} className="flex justify-between items-center text-[9px] lg:text-[10px] font-bold border-b border-[var(--border)] pb-2 last:border-0">
                <span className="flex items-center gap-2 text-[var(--text-muted)]">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}/> 
                  {b.name}
                </span>
                <span className="text-[var(--text-main)] font-black">${b.avgLimit.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Credit Limit Volatility */}
      <div className="pro-card h-[300px] lg:h-[400px]">
        <h3 className="text-[var(--text-muted)] font-black text-[9px] lg:text-[10px] uppercase mb-6 lg:mb-10 tracking-widest">Credit Limit Volatility Index</h3>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={transactionData.slice(0, 30).map((d, i) => ({ x: i, y: cleanNum(d.credit_limit) }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="x" hide />
            <Tooltip contentStyle={{backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '10px'}} />
            <Area type="step" dataKey="y" stroke="var(--accent)" fillOpacity={1} fill="url(#colorLimit)" strokeWidth={2} />
            <defs>
              <linearGradient id="colorLimit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;