import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const issues = await prisma.issue.findMany();

  const total = issues.length;

  // Pie Chart Data: Open vs In Progress vs Closed
  const pie = [
    { name: 'Open', value: issues.filter(i => i.status === 'OPEN').length },
    { name: 'In Progress', value: issues.filter(i => i.status === 'IN_PROGRESS').length },
    { name: 'Closed', value: issues.filter(i => i.status === 'CLOSED').length },
  ];

  // Line Chart: Count grouped by createdAt date (yyyy-mm-dd)
  const dateCounts: Record<string, number> = {};
  issues.forEach(issue => {
    const date = issue.createdAt.toISOString().split('T')[0];
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });

  const line = Object.entries(dateCounts).map(([date, count]) => ({
    date,
    count,
  }));

  return NextResponse.json({ total, pie, line });
}
