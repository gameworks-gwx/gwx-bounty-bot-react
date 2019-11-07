import React, { useEffect } from 'react'
import Container from '../../../components/UI/Container'
import { connect } from 'react-redux';
import { fetchGWXUsers } from '../../../store/actions/user'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { Pagination } from 'antd';

const GWXDashboard = ({ fetchUsers, match, gwxUsers, history }) => {
  useEffect(() => {
    if (!match.params.page) {
      fetchUsers(1)
    } else {
      fetchUsers(match.params.page)
    }
  }, [fetchUsers, match.params.page])

  console.log(gwxUsers);

  return (
    <Container>
      <Pagination onChange={(page) => history.push(`/dashboard/gwx/${page}`)} defaultPageSize="15" total="316" />
    </Container>
  )
}

const mapStateToProps = ({ user }) => {
  return {
    gwxUsers: user.gwxUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (page) => dispatch(fetchGWXUsers(page))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GWXDashboard))

