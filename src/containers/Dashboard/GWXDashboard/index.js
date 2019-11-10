import React, { useEffect } from 'react'
import moment from 'moment'
import Container from '../../../components/UI/Container'
import { connect } from 'react-redux';
import { fetchGWXUsers } from '../../../store/actions/user'
import { withRouter } from 'react-router-dom'
import { Pagination, Table, Row, Col, Statistic, Skeleton } from 'antd';

const GWXDashboard = ({
  fetchUsers,
  match,
  gwxUsers,
  history,
  loading
}) => {
  useEffect(() => {
    if (!match.params.page) {
      fetchUsers(1)
    } else {
      fetchUsers(match.params.page)
    }
  }, [fetchUsers, match.params.page])

  const { users, total } = gwxUsers;

  const columns = [
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      fixed: 'left',
      width: 200
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name'
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Created at',
      key: 'created_at',
      render: (_, record) => {
        return <label htmlFor="">{moment(record.created_at).format("MM/DD/YYYY hh:mm a")}</label>
      }
    },
  ]


  return (
    <Container>
      {
        loading ?
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
          :
          <>
            <Row
              type="flex"
              justify="space-around"
              style={{ margin: '1vh 0 1vh 0' }}
            >
              <Col>
                <Statistic title="Total Users" value={total} valueStyle={{ textAlign: 'center' }} />
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={users}
              pagination={false}
              size="middle" 
              scroll={{ x: 1300, y: 500 }}
            />
            <Pagination
              defaultCurrent={match.params.page ? parseInt(match.params.page) : 1}
              onChange={(page) => history.push(`/dashboard/gwx/${page}`)}
              defaultPageSize={15}
              total={total}
            />
          </>
      }
    </Container>
  )
}

const mapStateToProps = ({ user }) => {
  return {
    gwxUsers: user.gwxUsers,
    loading: user.fetchUsersLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (page) => dispatch(fetchGWXUsers(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GWXDashboard))

