import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AttendanceTrendChart = ({ data }) => (
  <div className="chart-card">
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2E90FA" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2E90FA" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="presentValue"
          stroke="#2E90FA"
          fillOpacity={1}
          fill="url(#colorPresent)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default AttendanceTrendChart;


