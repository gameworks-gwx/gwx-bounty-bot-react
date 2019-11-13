import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchAirdropDashboardData, airdropUser } from '../../../store/actions/dashboard'
import Container from '../../../components/UI/Container';
import { Table, Button, Tooltip, Statistic, Row, Col, Pagination, Skeleton, Input, message } from 'antd'

const { Search } = Input;

const AirdropDashboard = ({
  history,
  match,
  fetchAirdropDashboardData,
  usersData,
  loading,
  airdropUser,
  gwxLoading,
  telegramLoading,
  messageData
}) => {


  useEffect(() => {
    if (!match.params.page) {
      fetchAirdropDashboardData(1)
    } else {
      fetchAirdropDashboardData(match.params.page)
    }
    if (messageData) {
      message.success(messageData)
    }
  }, [fetchAirdropDashboardData, match.params.page, messageData])


  const { users = [], total } = usersData;

  const airdropHandler = (event, airdropType, walletAddress) => {
    event.stopPropagation()
    airdropUser(airdropType, walletAddress)
  }


  const columns = [
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Wallet Address',
      dataIndex: 'wallet_address',
      key: 'wallet_address'
    },
    {
      title: 'Telegram Username',
      key: 'telegramUsername',
      render: (_, record) => {
        if (!record.telegramId) {
          return <label htmlFor="">NO TELEGRAM PROFILE</label>
        } else {
          if (record.telegramUsername) {
            return <label htmlFor="">{record.telegramUsername}</label>
          }

          return <label htmlFor="">None</label>
        }
      }
    },
    {
      title: 'Tasks',
      key: 'tasks',
      render: (_, record) => {
        let approvedTasks;
        if (record.tasks) {
          approvedTasks = record.tasks.filter((task) => task.verified !== false)
        }
        return (
          <>
            {
              record.tasks
                ?
                approvedTasks.length >= 6
                  ?
                  <label><h4>{approvedTasks.length}/6</h4></label>
                  :
                  <label>{approvedTasks.length}/6</label>
                : <label htmlFor="">NO TELEGRAM PROFILE</label>
            }
          </>
        )
      }
    },
    {
      title: 'GWX Airdrop',
      key: 'gwxAirdrop',
      align: 'center',
      render: (_, record) => {
        return (
          <>
            {
              record.wallet_address
                ?
                gwxLoading.indexOf(record.wallet_address) !== -1
                  ?
                  <Button type="primary" shape="round" loading>Loading</Button>
                  :
                  <Button type="primary" onClick={(event) => airdropHandler(event, 'gwx', record.wallet_address)} shape="round">Airdrop</Button>
                :
                <Tooltip placement="topLeft" title="This user has no wallet address registered">
                  <Button type="primary" shape="round" disabled>Airdrop</Button>
                </Tooltip>
            }
          </>
        )
      }
    },
    {
      title: 'Telegram Airdrop',
      key: 'telegramAirdrop',
      align: 'center',
      render: (_, record) => {
        return (
          <>
            {
              record.wallet_address
                ?
                record.telegramId ?
                  telegramLoading.indexOf(record.wallet_address) !== -1
                    ?
                    <Button type="primary" shape="round" loading>Loading</Button>
                    :
                    <Button type="primary" onClick={(event) => airdropHandler(event, 'telegram', record.wallet_address)} shape="round">Airdrop</Button>
                  :
                  <Tooltip placement="topLeft" title="This user has no telegram profile yet">

                    <Button type="primary" shape="round" disabled>Airdrop</Button>
                  </Tooltip>
                :
                <Tooltip placement="topLeft" title="This user has no wallet address registered">
                  <Button type="primary" shape="round" disabled>Airdrop</Button>
                </Tooltip>

            }
          </>
        )
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
            <Row type="flex" justify="space-around" style={{ margin: '1vh 0 1vh 0' }}>
              <Col>
                <Statistic title="Total Users" value={total} valueStyle={{ textAlign: 'center' }} />
              </Col>
              <Col>
                <Statistic title="Total Airdrop" value={0} valueStyle={{ textAlign: 'center' }} />
              </Col>
              <Col>
                <Button type="primary" shape="round" style={{ marginTop: '1rem' }}>Airdrop all users</Button>
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={users}
              pagination={false}
              scroll={{ y: 500 }}
            />
            <Pagination
              defaultCurrent={match.params.page ? parseInt(match.params.page) : 1}
              onChange={(page) => history.push(`/dashboard/airdrop/${page}`)}
              defaultPageSize={20}
              total={total}
            />
          </>
      }
    </Container>
  )
}

const mapStateToProps = ({ dashboard }) => {
  return {
    usersData: dashboard.usersData,
    loading: dashboard.fetchLoading,
    gwxLoading: dashboard.gwxLoading,
    telegramLoading: dashboard.telegramLoading,
    messageData: dashboard.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAirdropDashboardData: (page) => dispatch(fetchAirdropDashboardData(page)),
    airdropUser: (airdropType, walletAddress) => dispatch(airdropUser(airdropType, walletAddress))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AirdropDashboard))