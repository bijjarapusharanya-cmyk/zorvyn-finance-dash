import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', uv: 4000 }, { name: 'Tue', uv: 3000 }, { name: 'Wed', uv: 5000 },
  { name: 'Thu', uv: 2780 }, { name: 'Fri', uv: 1890 }, { name: 'Sat', uv: 2390 },
];

const MainChart = () => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ backgroundColor: '#1a0b3c', border: 'none', borderRadius: '10px' }} />
        <Area type="monotone" dataKey="uv" stroke="#a855f7" fillOpacity={1} fill="url(#colorUv)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default MainChart;