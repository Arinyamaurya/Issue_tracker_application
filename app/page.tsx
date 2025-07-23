'use client';

import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { FaChartPie, FaChartLine } from 'react-icons/fa';
import { BsBarChart } from 'react-icons/bs';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardPage() {
  const [data, setData] = useState({
    total: 0,
    pie: [],
    line: [],
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/analytics');
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <main className="p-8 max-w-7xl mx-auto bg-[#000319] h-full w-full text-white">
      <h1 className="text-4xl font-bold flex items-center gap-2 mb-6 text-white">
        <BsBarChart className="text-teal-400" /> Issues Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-xl shadow-md bg-[#0e0e2e] border border-[#fbfbfe]">
          <h2 className="text-sm text-zinc-400 mb-2">Total Issues</h2>
          <p className="text-3xl font-semibold text-teal-400">{data.total}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-[#0e0e2e] p-6 rounded-xl border border-[#fdfdff] shadow-md">
          <div className="flex items-center gap-2 text-lg font-semibold mb-4 text-white">
            <FaChartPie className="text-pink-400" /> Issue Status Distribution
          </div>
          <div className="h-60">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data.pie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data.pie.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-[#0e0e2e] p-6 rounded-xl border border-[#ffffff] shadow-md">
          <div className="flex items-center gap-2 text-lg font-semibold mb-4 text-white">
            <FaChartLine className="text-green-400" /> Issues Created Over Time
          </div>
          <div className="h-60">
            <ResponsiveContainer>
              <LineChart data={data.line}>
                <XAxis dataKey="date" stroke="#ffffff" />
                <YAxis allowDecimals={false} stroke="#ffffff" />
                <Tooltip contentStyle={{ backgroundColor: '#1e1e3f', borderColor: '#333' }} />
                <Line type="monotone" dataKey="count" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
