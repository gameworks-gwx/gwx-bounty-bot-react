import React, { useEffect } from 'react'
import Responsive from '../../../components/UI/Responsive'
import { withRouter } from 'react-router-dom';
import { Table, Button, Tooltip, Statistic, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { profileFetchAll } from '../../../store/actions/profile'
import { removeError } from '../../../store/actions/error'

const TelegramDashboard = ({
  history,
  profiles,
  fetchAllProfiles,
  error,
  removeError
}) => {

  useEffect(() => {
    fetchAllProfiles()
  }, [])

  if (error.status === 401) {
    history.push({
      pathname: '/logout',
      state: {
        message: "You are not authorized to view the page",
        type: 'Error'
      }
    })
    removeError()
  }


  const airdropHandler = (event, test) => {
    event.stopPropagation()
    console.log(test)
  }

  const columns = [
    {
      title: 'Telegram Username',
      dataIndex: 'telegramUsername',
      key: 'telegramUsername',
      fixed: 'left',
      width: 150,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      width: 250
    },
    {
      title: 'Tasks',
      dataIndex: '',
      key: '',
      width: 80,
      align: 'center',
      render: (_, record) => {
        return (
          <>
            {
              record.tasks.length >= 6
                ?
                <label><h4>{record.tasks.length}/6</h4></label>
                :
                <label>{record.tasks.length}/6</label>
            }
          </>
        )
      }
    },
    {
      title: 'Airdrop Reward',
      dataIndex: '',
      key: '',
      width: 70,
      render: (_, record) => {
        return (
          <label>{record.tasks.length * 600}</label>
        )
      }
    },
    {
      title: 'Airdrop',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (_, record) => {
        return (
          <>
            {
              record.gwxAddress
                ?
                <Button type="primary" onClick={(event) => airdropHandler(event, record.gwxAddress)} shape="round">Airdrop</Button>
                :
                <Tooltip placement="topLeft" title="This user has no GWX address registered">
                  <Button type="primary" shape="round" disabled>Airdrop</Button>
                </Tooltip>

            }
          </>
        )
      }
    },
  ]

  return (
    <>
      <div className="content-subcontainer">

        <Row type="flex" justify="space-around" style={{ margin: '1vh 0 1vh 0' }}>
          <Col>
            <Statistic title="Total Users" value={profiles.length} valueStyle={{ textAlign: 'center' }} />
          </Col>
          <Col>
            <Statistic title="Total Airdrop" value={6000} valueStyle={{ textAlign: 'center' }} />
          </Col>
          <Col>
            <Button type="primary" shape="round" style={{ marginTop: '1rem' }}>Airdrop all users</Button>
          </Col>
        </Row>
        <Responsive device="mobile">
          <Table
            onRow={(record) => {
              return {
                onClick: (_) => history.push(`telegram/${record.telegramId}`)
              }
            }}
            dataSource={profiles}
            columns={columns}
            scroll={{ x: 1300 }}
            size="small"
            bordered
          />
        </Responsive>

        <Responsive device="pc">
          <Table
            onRow={(record) => {
              return {
                onClick: (_) => history.push(`telegram/${record.telegramId}`)
              }
            }}
            dataSource={profiles}
            columns={columns}
            scroll={{ x: 1300 }}
            size="middle"
            bordered
          />
        </Responsive>

      </div>
    </>
  )
}

const mapStateToProps = ({ profile, error }) => {
  return {
    profiles: profile.profiles,
    error: error.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProfiles: () => dispatch(profileFetchAll()),
    removeError: () => dispatch(removeError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TelegramDashboard))