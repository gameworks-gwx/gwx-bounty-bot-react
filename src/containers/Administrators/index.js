import React, { useEffect } from 'react';
import Container from '../../components/UI/Container';
import { Table, Divider, Button, Icon, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from '../../store/actions/user'
import { Link } from 'react-router-dom'

const Administrators = ({ users, fetchUsers, loading, deleteUser }) => {
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
      align: 'center',
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
          <Button type="link" onClick={() => deleteUser(record.id)}>Delete</Button>
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
          <Table columns={columns} dataSource={users} scroll={{ x: 1200 }} />
      }
    </Container >
  )
}

const mapStateToProps = ({ user }) => {
  return {
    users: user.users,
    loading: user.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: (userId) => dispatch(deleteUser(userId)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Administrators)