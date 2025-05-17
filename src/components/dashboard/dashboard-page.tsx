
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { GitPullRequest, ShieldAlert, ListChecks } from "lucide-react";
import { mockPrCount, mockFailedBuildsCount, mockTasksByStatus, mockEvents } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EventListItem } from './EventListItem'; // Import the new component

const taskStatusChartData = Object.entries(mockTasksByStatus).map(([name, value]) => ({ name, count: value }));

const eventsBySourceData = mockEvents.reduce((acc, event) => {
  const source = event.source.charAt(0).toUpperCase() + event.source.slice(1);
  const existing = acc.find(item => item.name === source);
  if (existing) {
    existing.count += 1;
  } else {
    acc.push({ name: source, count: 1 });
  }
  return acc;
}, [] as { name: string; count: number }[]);


export function DashboardPageContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Pull Requests</CardTitle>
          <GitPullRequest className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{mockPrCount}</div>
          <p className="text-xs text-muted-foreground mt-1">Currently open PRs needing review</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Failed Builds</CardTitle>
          <ShieldAlert className="h-5 w-5 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{mockFailedBuildsCount}</div>
          <p className="text-xs text-muted-foreground mt-1">Builds failed in the last 24h</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
          <ListChecks className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{mockTasksByStatus['TODO'] + (mockTasksByStatus['IN_PROGRESS'] || 0)}</div>
          <p className="text-xs text-muted-foreground mt-1">Tasks currently in 'TODO' or 'IN_PROGRESS'</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Task Status Overview</CardTitle>
          <CardDescription>Distribution of tasks across different statuses.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taskStatusChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--foreground))" fontSize={12} allowDecimals={false}/>
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))' }}
                labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
                itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
              />
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Tasks"/>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Events</CardTitle>
          <CardDescription>Latest events from integrated services.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {mockEvents.slice(0, 5).map(event => (
              <EventListItem key={event.id} event={event} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
