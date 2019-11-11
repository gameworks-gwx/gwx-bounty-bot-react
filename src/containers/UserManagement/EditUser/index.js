import React, { useEffect } from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux';
import { fetchUsers } from '../../../store/actions/user'

const EditUser = ({ fetchUsers, users }) => {
  useEffect(() => {
    fetchUsers()
  }, [])

  const columns = [
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email'
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
  ]

  return <Table columns={columns} dataSource={users.users} />
}

const mapStateToProps = ({ user }) => {
  return {
    users: user.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)