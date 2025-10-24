import React from 'react'

      //TODO: Make the sidebar dynamic based on user role and permissions
      //TODO: Add icons to the sidebar items
      //TODO: Highlight the active sidebar item
      //TODO: Optimize the sidebar for mobile view
      //TODO: Add collapsible sections to the sidebar
      //TODO: Translate sidebar items for internationalization
      //TODO: Implement dark mode support for the sidebar

const Sidebar = () => {
  return (
    <aside className="sticky top-[var(--navbar-height,3.5rem)] h-[calc(100dvh-var(--navbar-height,3.5rem))] w-64 flex flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="px-4 py-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
      Sidebar
      </div>

      
      <nav className="flex-1 px-2 py-2">
      <ul className="space-y-1">
        {[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Coach Chat', href: '/coach-chat' },
        { label: 'Calendar', href: '/calendar' },
        { label: 'Workouts', href: '/workouts' },
        ].map((item) => {
        const isActive =
          typeof window !== 'undefined' &&
          (window.location.pathname === item.href ||
          window.location.pathname.startsWith(item.href + '/'));

        return (
          <li key={item.href}>
          <a
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
            isActive
              ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
              : 'text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {item.label}
          </a>
          </li>
        );
        })}
      </ul>
      </nav>

      <nav className="border-t border-zinc-200 px-2 py-2 dark:border-zinc-800">
      <ul className="space-y-1">
        {[
        { label: 'Settings', href: '/settings' },
        { label: 'Policies', href: '/policies' },
        ].map((item) => {
        const isActive =
          typeof window !== 'undefined' &&
          (window.location.pathname === item.href ||
          window.location.pathname.startsWith(item.href + '/'));

        return (
          <li key={item.href}>
          <a
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
            isActive
              ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
              : 'text-zinc-600 dark:text-zinc-300'
            }`}
          >
            {item.label}
          </a>
          </li>
        );
        })}
      </ul>
      </nav>
    </aside>
  )
}

export default Sidebar