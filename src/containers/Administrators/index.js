import React, { useEffect, useState } from 'react';
import Container from '../../components/UI/Container';
import { Table, Divider, Button, Icon, Skeleton, Popover, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from '../../store/actions/user'
import { Link } from 'react-router-dom'

const Administrators = ({ users, fetchUsers, loading, deleteUser, email }) => {
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const deletePopover = (id) => setVisible(visible.concat(id))

  const visibleChangeHandler = (id) => setVisible(visible.filter((visibleId) => visibleId !== id))

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
          <Popover
            content={
              <>
                <Button type="link" onClick={() => visibleChangeHandler(record.id)}>Cancel</Button>
                <Divider type="vertical" />
                <Button type="link" onClick={() => deleteUser(record.id)}>Remove administrator</Button>
              </>
            }
            title="Remove this administrator?"
            visible={visible.indexOf(record.id) !== -1}
            onVisibleChange={() => visibleChangeHandler(record.id)}
          >
            {
              record.email === email.email
                ?
                <Tooltip placement="top" title="You can't remove yourself">
                  <Button type="link" disabled>Remove</Button>
                </Tooltip>
                :
                <Button type="link" onClick={() => deletePopover(record.id)}>Remove</Button>
            }
          </Popover>
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
          Add new administrator
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

const mapStateToProps = ({ user, auth }) => {
  return {
    users: user.users,
    loading: user.loading,
    email: auth.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: (userId) => dispatch(deleteUser(userId)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Administrators)