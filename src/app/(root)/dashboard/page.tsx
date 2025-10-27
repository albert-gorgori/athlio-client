import React from 'react'
import DashboardContent from './content'
import Breadcrumbs from '@/components/breadcrumbs-sidebar'
import { DASHBOARD_ROUTE } from '@/lib/constants'



const Dashboard = () => {
  const items = [
    { title: 'Navigation.overview', href: '#' },
    { title: 'Navigation.dashboard', href: DASHBOARD_ROUTE, isCurrent: true },
  ]
  return (
    <>
      <Breadcrumbs items={items}>
        <DashboardContent />
      </Breadcrumbs>
    
    </>
  )
}

export default Dashboard