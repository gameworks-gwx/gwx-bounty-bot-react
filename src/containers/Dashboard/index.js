import React from 'react';
import GWXDashboard from './GWXDashboard'
import TelegramDashboard from './TelegramDashboard'
import AirdropDashboard from './AirdropDashboard'

const Dashboard = ({
  match
}) => {
  return (
    <>
      {
        match.params.typeof === 'telegram'
          ?
          <TelegramDashboard />
          :
          match.params.typeof === 'airdrop'
            ?
            <AirdropDashboard />
            :
            <GWXDashboard />
      }
    </>
  )
}

export default Dashboard;