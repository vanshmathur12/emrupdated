import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

// Sample data for last 7 days
const last7DaysData = [
  { date: 'Mon', Cardiology: 45, Neurology: 32, Orthopedics: 28, Pediatrics: 38, 'General Medicine': 52 },
  { date: 'Tue', Cardiology: 52, Neurology: 38, Orthopedics: 31, Pediatrics: 42, 'General Medicine': 58 },
  { date: 'Wed', Cardiology: 48, Neurology: 35, Orthopedics: 29, Pediatrics: 40, 'General Medicine': 55 },
  { date: 'Thu', Cardiology: 55, Neurology: 41, Orthopedics: 34, Pediatrics: 45, 'General Medicine': 62 },
  { date: 'Fri', Cardiology: 58, Neurology: 44, Orthopedics: 37, Pediatrics: 48, 'General Medicine': 65 },
  { date: 'Sat', Cardiology: 42, Neurology: 30, Orthopedics: 25, Pediatrics: 36, 'General Medicine': 48 },
  { date: 'Sun', Cardiology: 38, Neurology: 28, Orthopedics: 22, Pediatrics: 32, 'General Medicine': 44 },
];

// Sample data for last 3 months (weekly aggregates)
const last3MonthsData = [
  { date: 'Week 1', Cardiology: 315, Neurology: 225, Orthopedics: 195, Pediatrics: 270, 'General Medicine': 385 },
  { date: 'Week 2', Cardiology: 328, Neurology: 238, Orthopedics: 205, Pediatrics: 282, 'General Medicine': 398 },
  { date: 'Week 3', Cardiology: 342, Neurology: 248, Orthopedics: 215, Pediatrics: 295, 'General Medicine': 412 },
  { date: 'Week 4', Cardiology: 335, Neurology: 242, Orthopedics: 208, Pediatrics: 288, 'General Medicine': 405 },
  { date: 'Week 5', Cardiology: 348, Neurology: 255, Orthopedics: 218, Pediatrics: 298, 'General Medicine': 418 },
  { date: 'Week 6', Cardiology: 355, Neurology: 262, Orthopedics: 225, Pediatrics: 305, 'General Medicine': 425 },
  { date: 'Week 7', Cardiology: 362, Neurology: 268, Orthopedics: 232, Pediatrics: 312, 'General Medicine': 432 },
  { date: 'Week 8', Cardiology: 368, Neurology: 275, Orthopedics: 238, Pediatrics: 318, 'General Medicine': 438 },
  { date: 'Week 9', Cardiology: 375, Neurology: 282, Orthopedics: 245, Pediatrics: 325, 'General Medicine': 445 },
  { date: 'Week 10', Cardiology: 382, Neurology: 288, Orthopedics: 252, Pediatrics: 332, 'General Medicine': 452 },
  { date: 'Week 11', Cardiology: 388, Neurology: 295, Orthopedics: 258, Pediatrics: 338, 'General Medicine': 458 },
  { date: 'Week 12', Cardiology: 395, Neurology: 302, Orthopedics: 265, Pediatrics: 345, 'General Medicine': 465 },
];

// Sample data for last 6 months (monthly aggregates)
const last6MonthsData = [
  { date: 'Jan', Cardiology: 1420, Neurology: 1015, Orthopedics: 875, Pediatrics: 1225, 'General Medicine': 1740 },
  { date: 'Feb', Cardiology: 1385, Neurology: 990, Orthopedics: 855, Pediatrics: 1195, 'General Medicine': 1695 },
  { date: 'Mar', Cardiology: 1465, Neurology: 1045, Orthopedics: 905, Pediatrics: 1265, 'General Medicine': 1795 },
  { date: 'Apr', Cardiology: 1520, Neurology: 1085, Orthopedics: 940, Pediatrics: 1315, 'General Medicine': 1865 },
  { date: 'May', Cardiology: 1575, Neurology: 1125, Orthopedics: 975, Pediatrics: 1365, 'General Medicine': 1935 },
  { date: 'Jun', Cardiology: 1630, Neurology: 1165, Orthopedics: 1010, Pediatrics: 1415, 'General Medicine': 2005 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7days');

  const getDataForTimeRange = () => {
    switch (timeRange) {
      case '7days':
        return last7DaysData;
      case '3months':
        return last3MonthsData;
      case '6months':
        return last6MonthsData;
      default:
        return last7DaysData;
    }
  };

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case '7days':
        return 'Last 7 Days';
      case '3months':
        return 'Last 3 Months (Weekly)';
      case '6months':
        return 'Last 6 Months (Monthly)';
      default:
        return 'Last 7 Days';
    }
  };

  const data = getDataForTimeRange();

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Patient Analytics</h1>
          <p className="text-muted-foreground">Department-wise patient distribution over time</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Patients by Department - {getTimeRangeLabel()}
          </CardTitle>
          <CardDescription>
            Number of patients visiting each department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs"
                />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="Cardiology" fill={COLORS[0]} />
                <Bar dataKey="Neurology" fill={COLORS[1]} />
                <Bar dataKey="Orthopedics" fill={COLORS[2]} />
                <Bar dataKey="Pediatrics" fill={COLORS[3]} />
                <Bar dataKey="General Medicine" fill={COLORS[4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine'].map((dept, index) => {
          const total = data.reduce((sum, day) => sum + (day[dept as keyof typeof day] as number), 0);
          const avg = Math.round(total / data.length);
          
          return (
            <Card key={dept}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {dept}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" style={{ color: COLORS[index] }}>
                  {total}
                </div>
                <p className="text-xs text-muted-foreground">
                  Avg: {avg} per {timeRange === '7days' ? 'day' : timeRange === '3months' ? 'week' : 'month'}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
