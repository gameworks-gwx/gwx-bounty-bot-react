import React from 'react';
import GWXDashboard from './GWXDashboard'
import TelegramDashboard from './TelegramDashboard'

const Dashboard = ({
  match
}) => {
  return (
    <>
      {
        match.params.typeof === 'telegram' ? <TelegramDashboard /> : <GWXDashboard />
      }
    </>
  )
}

export default Dashboard;