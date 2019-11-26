import React, { useEffect } from 'react';
import Container from '../../components/UI/Container';
import { Table, Divider, Button, Icon, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { fetchUsers } from '../../store/actions/user'
import { Link } from 'react-router-dom'

const UserManagement = ({ users, fetchUsers, loading }) => {
  useEffect(() => {
    fetchUsers()
  }, [])


  const columns = [
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      fixed: 'left',
      width: 210
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Link to={{
            pathname: '/administrators/edit/' + record.id,
            state: {
              pageTitle: 'Edit User'
            }
          }}>
            <Button type="link">
              Edit
            </Button>
          </Link>
          <Divider type="vertical" />
          <Button type="link">Delete</Button>
        </span>
      )
    }
  ]

  return (
    <Container>
      <Link to={{
        pathname: '/administrators/add',
        state: {
          pageTitle: 'Administrators'
        }
      }}>
        <Button type="primary" size="large" shape="round" style={{ marginBottom: '1rem' }}>
          <Icon type="user-add" />
          Add new user
        </Button>
      </Link>
      {
        loading ?
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
          :
          <Table columns={columns} dataSource={users.users} scroll={{ x: 1200 }} />
      }
    </Container >
  )
}

const mapStateToProps = ({ user }) => {
  return {
    users: user.users,
    loading: user.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)