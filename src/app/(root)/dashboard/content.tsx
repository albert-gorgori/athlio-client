'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'

const USER_NAVBAR_HEIGHT = 'var(--navbar-height,3.5rem)'

type Metric = { label: string; value: string | number; delta?: string; trend?: 'up' | 'down' }
type Session = { id: string; title: string; coach: string; date: string; time: string; athletes: number; status: 'Scheduled' | 'Live' | 'Completed' }
type Activity = { id: string; text: string; time: string }
type Athlete = { id: string; name: string; team: string; score: number }

const metrics: Metric[] = [
    { label: 'Active Athletes', value: 128, delta: '+12%', trend: 'up' },
    { label: 'Sessions this week', value: 54, delta: '+8%', trend: 'up' },
    { label: 'Attendance rate', value: '92%', delta: '+2%', trend: 'up' },
    { label: 'Avg. RPE', value: 6.7, delta: '-0.3', trend: 'down' },
]

const sessions: Session[] = [
    { id: 'SES-4211', title: 'Strength Block A', coach: 'A. Mercer', date: 'Mon, Oct 27', time: '07:30', athletes: 16, status: 'Completed' },
    { id: 'SES-4212', title: 'Speed & Agility', coach: 'J. Ramos', date: 'Tue, Oct 28', time: '10:00', athletes: 12, status: 'Scheduled' },
    { id: 'SES-4213', title: 'Recovery Mobility', coach: 'K. Tan', date: 'Tue, Oct 28', time: '16:30', athletes: 20, status: 'Scheduled' },
    { id: 'SES-4214', title: 'Conditioning Intervals', coach: 'S. Patel', date: 'Wed, Oct 29', time: '08:00', athletes: 14, status: 'Live' },
    { id: 'SES-4215', title: 'Tactical Drills', coach: 'L. Gomez', date: 'Thu, Oct 30', time: '18:00', athletes: 18, status: 'Scheduled' },
]

const activities: Activity[] = [
    { id: 'A1', text: 'New athlete added: N. Okafor', time: '2m ago' },
    { id: 'A2', text: 'Session completed: Strength Block A', time: '35m ago' },
    { id: 'A3', text: 'Attendance updated: Speed & Agility', time: '1h ago' },
    { id: 'A4', text: 'Wellness survey reminder sent to 24 athletes', time: '3h ago' },
]

const athletes: Athlete[] = [
    { id: 'U1', name: 'Mia Park', team: 'U19', score: 94 },
    { id: 'U2', name: 'Leo Santos', team: 'Senior', score: 92 },
    { id: 'U3', name: 'Ava Müller', team: 'U21', score: 90 },
    { id: 'U4', name: 'Noah Kim', team: 'Senior', score: 88 },
]

const loadChart = [
    { label: 'Mon', value: 72 },
    { label: 'Tue', value: 85 },
    { label: 'Wed', value: 64 },
    { label: 'Thu', value: 91 },
    { label: 'Fri', value: 78 },
    { label: 'Sat', value: 58 },
    { label: 'Sun', value: 40 },
]

const trendColor = (trend?: 'up' | 'down') =>
    trend === 'down' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'

const statusBadgeClass = (s: Session['status']) =>
    s === 'Live'
        ? 'text-amber-700 bg-amber-100 hover:bg-amber-100 dark:text-amber-300 dark:bg-amber-900/40'
        : s === 'Completed'
        ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40'
        : 'text-blue-700 bg-blue-100 hover:bg-blue-100 dark:text-blue-300 dark:bg-blue-900/40'

const DashboardContent = () => {
    return (
        <main className="flex-1 h-[calc(100dvh-var(--navbar-height,3.5rem))] overflow-y-auto bg-zinc-50 dark:bg-zinc-900">
            <div className="p-6 space-y-6">
                

                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {metrics.map((m) => (
                        <Card key={m.label}>
                            <CardHeader className="pb-2">
                                <CardDescription>{m.label}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-1 flex items-baseline gap-2">
                                    <span className="text-2xl font-semibold">{m.value}</span>
                                    {m.delta && <span className={`text-xs ${trendColor(m.trend)}`}>{m.delta}</span>}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </section>

                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <Card className="xl:col-span-2">
                        <CardHeader className="flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">Upcoming sessions</CardTitle>
                            <Button variant="link" className="h-auto p-0 text-sm text-zinc-700 dark:text-zinc-300">
                                View all
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="w-full">
                                <div className="min-w-[720px]">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Session</TableHead>
                                                <TableHead>Coach</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Time</TableHead>
                                                <TableHead>Athletes</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {sessions.map((s) => (
                                                <TableRow key={s.id} className="cursor-default">
                                                    <TableCell>
                                                        <div className="font-medium">{s.title}</div>
                                                        <div className="text-xs text-zinc-500">{s.id}</div>
                                                    </TableCell>
                                                    <TableCell>{s.coach}</TableCell>
                                                    <TableCell>{s.date}</TableCell>
                                                    <TableCell>{s.time}</TableCell>
                                                    <TableCell>{s.athletes}</TableCell>
                                                    <TableCell>
                                                        <Badge className={`${statusBadgeClass(s.status)} rounded-full px-2 py-0.5 text-xs`}>
                                                            {s.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">Recent activity</CardTitle>
                            <Button variant="link" className="h-auto p-0 text-sm text-zinc-700 dark:text-zinc-300">
                                Mark all read
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-64">
                                <ul className="space-y-3 pr-2">
                                    {activities.map((a) => (
                                        <li key={a.id} className="flex items-start gap-3">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                                            <div>
                                                <p className="text-sm">{a.text}</p>
                                                <p className="text-xs text-zinc-500">{a.time}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </section>

                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">Weekly load</CardTitle>
                            <CardDescription>AU</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mt-2 h-48 flex items-end gap-3">
                                {loadChart.map((d) => (
                                    <div key={d.label} className="flex flex-col items-center justify-end gap-1">
                                        <div className="w-8 rounded-md bg-zinc-200 dark:bg-zinc-800" style={{ height: '10rem' }}>
                                            <div
                                                className="w-full rounded-md bg-zinc-900 dark:bg-zinc-100"
                                                style={{ height: `${Math.max(4, Math.min(100, d.value))}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-zinc-500">{d.label}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="xl:col-span-2">
                        <CardHeader className="flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">Top athletes</CardTitle>
                            <Button variant="link" className="h-auto p-0 text-sm text-zinc-700 dark:text-zinc-300">
                                Manage
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {athletes.map((a) => (
                                    <li key={a.id} className="flex items-center justify-between py-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="text-[10px]">
                                                    {a.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{a.name}</p>
                                                <p className="text-xs text-zinc-500">{a.team}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 w-40">
                                            <div className="w-28">
                                                <Progress value={a.score} />
                                            </div>
                                            <span className="text-sm tabular-nums">{a.score}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    )
}

export default DashboardContent