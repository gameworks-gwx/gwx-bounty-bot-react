import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/profile';

const Dashboard = ({
  profiles,
  error,
  fetchAllProfiles,
  loading,
  history
}) => {

  useEffect(() => {
    fetchAllProfiles()
  }, [fetchAllProfiles])

  if (error) {
    if (error.status === 401) {
      localStorage.removeItem('token');
      history.replace('/login');
    }
  }
  return (
    <>
      {
        loading ? 'wait lang'
          : profiles.map((profile) => {
            return (
              <p>{profile.telegramUsername}</p>
            )
          })
      }
    </>
  )
}

const mapStateToProps = ({ profile }) => {
  return {
    loading: profile.fetchAllLoading,
    error: profile.fetchAllError,
    profiles: profile.profiles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProfiles: () => dispatch(actions.profileFetchAll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);