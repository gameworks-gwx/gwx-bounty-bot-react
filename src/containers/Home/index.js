import React, { useEffect } from 'react';
import Responsive from '../../components/UI/Responsive'
import MobileHome from './MobileHome';
import PCHome from './PCHome';
import { connect } from 'react-redux';
import { fetchDashboardData } from '../../store/actions/dashboard'

const Home = ({ fetchDashboardData, dashboardData, loading }) => {

  useEffect(() => {
    fetchDashboardData()
  }, [])


  return (
    <>
      <PCHome dashboardData={dashboardData} loading={loading} />
    </>
  )
}

const mapStateToProps = ({ dashboard }) => {
  return {
    dashboardData: dashboard.dashboardData,
    loading: dashboard.fetchLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDashboardData: () => dispatch(fetchDashboardData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)