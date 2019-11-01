import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import GWXDashboard from './GWXDashboard'
import TelegramDashboard from './TelegramDashboard'

const Dashboard = ({
  match
}) => {
  //useEffect(() => {
  //  fetchAllProfiles()
  //}, [fetchAllProfiles])


  //if (error) {
  //  if (error.status === 401) {
  //    localStorage.removeItem('token');
  //    history.replace('/login');
  //  }
  //}
  return (
    <>
      {
        match.params.typeof === 'telegram' ? <TelegramDashboard /> : <GWXDashboard />
      }
    </>
  )
}

export default Dashboard;