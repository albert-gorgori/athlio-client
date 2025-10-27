import React from 'react'

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

const statusColor = (s: Session['status']) =>
  s === 'Live' ? 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/40' :
  s === 'Completed' ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40' :
  'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/40'

const DashboardContent = () => {

  return (
    <main className="flex-1  h-[calc(100dvh-var(--navbar-height,3.5rem))] overflow-y-auto bg-zinc-50 dark:bg-zinc-900">
        <div className="p-6 space-y-6">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            <div className="flex gap-2">
              <input
                placeholder="Search athletes, sessions..."
                className="h-9 w-64 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-zinc-800"
              />
              <button className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-900">
                Filters
              </button>
              <button className="h-9 rounded-md bg-zinc-900 px-3 text-sm text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                New Session
              </button>
            </div>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{m.label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{m.value}</span>
                  {m.delta && (
                    <span className={`text-xs ${trendColor(m.trend)}`}>{m.delta}</span>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-sm font-medium">Upcoming sessions</h2>
                <button className="text-sm text-zinc-600 hover:underline dark:text-zinc-300">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Session</th>
                      <th className="px-4 py-3 text-left font-medium">Coach</th>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                      <th className="px-4 py-3 text-left font-medium">Time</th>
                      <th className="px-4 py-3 text-left font-medium">Athletes</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((s) => (
                      <tr key={s.id} className="border-t border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                        <td className="px-4 py-3">
                          <div className="font-medium">{s.title}</div>
                          <div className="text-xs text-zinc-500">{s.id}</div>
                        </td>
                        <td className="px-4 py-3">{s.coach}</td>
                        <td className="px-4 py-3">{s.date}</td>
                        <td className="px-4 py-3">{s.time}</td>
                        <td className="px-4 py-3">{s.athletes}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColor(s.status)}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-sm font-medium">Recent activity</h2>
                <button className="text-sm text-zinc-600 hover:underline dark:text-zinc-300">Mark all read</button>
              </div>
              <ul className="p-4 space-y-3">
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
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Weekly load</h2>
                <span className="text-xs text-zinc-500">AU</span>
              </div>
              <div className="mt-4 h-48 flex items-end gap-3">
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
            </div>

            <div className="xl:col-span-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Top athletes</h2>
                <button className="text-sm text-zinc-600 hover:underline dark:text-zinc-300">Manage</button>
              </div>
              <ul className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                {athletes.map((a) => (
                  <li key={a.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-zinc-200 text-xs flex items-center justify-center dark:bg-zinc-800">
                        {a.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{a.name}</p>
                        <p className="text-xs text-zinc-500">{a.team}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-28 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${a.score}%` }} />
                      </div>
                      <span className="text-sm tabular-nums">{a.score}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
  )
}

export default DashboardContent