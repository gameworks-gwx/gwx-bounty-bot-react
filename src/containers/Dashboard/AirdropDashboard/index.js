import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchAirdropDashboardData, airdropUser, airdropAllUsers } from '../../../store/actions/dashboard'
import Container from '../../../components/UI/Container';
import {
  Table,
  Button,
  Tooltip,
  Statistic,
  Row,
  Col,
  Pagination,
  Skeleton,
  Input,
  Modal,
  Icon,
  Typography
} from 'antd'

const { Search } = Input;
const { Text } = Typography

const AirdropDashboard = ({
  history,
  match,
  fetchAirdropDashboardData,
  usersData,
  loading,
  airdropUser,
  gwxLoading,
  telegramLoading,
  successGwxUsers,
  failedGwxUsers,
  successTelegramUsers,
  failedTelegramUsers,
  airdropAllUsers
}) => {

  const [visible, setVisible] = useState(false); //!! For modal

  useEffect(() => {
    if (!match.params.page) {
      fetchAirdropDashboardData(1)
    } else {
      fetchAirdropDashboardData(match.params.page)
    }
  }, [fetchAirdropDashboardData, match.params.page])


  const { users = [], total } = usersData;

  const airdropHandler = (event, airdropType, user) => {
    event.stopPropagation()
    const momentDate = moment(new Date()).format('MM/DD/YYYY')
    const date = Math.floor(new Date(momentDate).getTime())
    let tokensDisbursed;
    const { email, wallet_address } = user;

    if (airdropType === 'telegram') {
      const verifiedTasks = user.tasks.filter((task) => task.verified !== false)
      tokensDisbursed = verifiedTasks.length * 600;

    } else {
      tokensDisbursed = 600;
    }

    console.log(wallet_address);

    const body = {
      date,
      tokensDisbursed,
      email: email ? email : 'Unregistered',
      walletAddress: wallet_address
    }
    airdropUser(airdropType, body)
  }

  const showModalHandler = () => {
    setVisible(true)
  }

  const airdropAllHandler = (users) => {
    setVisible(false);
    const momentDate = moment(new Date()).format('MM/DD/YYYY')
    const date = Math.floor(new Date(momentDate).getTime())
    airdropAllUsers(users, date)

  }

  const cancelHandler = () => {
    setVisible(false);
  }

  const columns = [
    {
      title: 'Email Address',
      key: 'email',
      render: (_, record) => (
        record.email
          ?
          <label htmlFor="">{record.email}</label>
          :
          <Text type="secondary" style={{ fontStyle: 'italic' }}>None</Text>
      )
    },
    {
      title: 'Wallet Address',
      key: 'wallet_address',
      render: (_, record) => (
        record.wallet_address
          ? <label htmlFor="">{record.wallet_address}</label>
          : <Text type="secondary" style={{ fontStyle: 'italic' }}>None</Text>
      )
    },
    {
      title: 'Telegram Username',
      key: 'telegramUsername',
      render: (_, record) => {
        if (!record.telegramId) {
          return <Text type="secondary" style={{ fontStyle: 'italic' }}>Unregistered</Text>
        } else {
          if (record.telegramUsername) {
            return <label htmlFor="">{record.telegramUsername}</label>
          }

          return <Text type="secondary" style={{ fontStyle: 'italic' }}>None</Text>
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
                :
                <Text type="secondary" style={{ fontStyle: 'italic' }}>Unregistered</Text>
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
                  successGwxUsers.indexOf(record.wallet_address) !== -1
                    ?
                    <Button type="primary" shape="round" disabled>
                      <Icon type="check" />Airdrop succeeded
                    </Button>
                    :
                    failedGwxUsers.indexOf(record.wallet_address) !== -1
                      ?
                      <Button type="danger" shape="round" disabled>
                        <Icon type="close" />Airdrop failed
                      </Button>

                      :
                      <Button type="primary" onClick={(event) => airdropHandler(event, 'gwx', record)} shape="round">Airdrop</Button>
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

              record.lastAirdropped ?
                <>
                  <Text type="secondary" style={{ fontSize: '10px' }}>Last airdropped</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '10px' }}>{moment(record.lastAirdropped).format("MM/DD/YYYY h:m a")}</Text>
                  <br />
                </>
                :
                null
            }
            {
              record.wallet_address
                ?
                record.telegramId
                  ?
                  telegramLoading.indexOf(record.wallet_address) !== -1
                    ?
                    <Button type="primary" shape="round" loading>Loading</Button>
                    :
                    successTelegramUsers.indexOf(record.wallet_address) !== -1
                      ?
                      <Button type="primary" shape="round" disabled>
                        <Icon type="check" />Airdrop succeeded
                      </Button>
                      :
                      failedTelegramUsers.indexOf(record.wallet_address) !== -1
                        ?
                        <Button type="danger" shape="round" disabled>
                          <Icon type="close" />Airdrop failed
                        </Button>
                        :
                        <Button type="primary" onClick={(event) => airdropHandler(event, 'telegram', record)} shape="round">Airdrop</Button>
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
                {
                  telegramLoading.length || gwxLoading.length
                    ?
                    <Button
                      type="primary"
                      shape="round"
                      style={{ marginTop: '1rem' }}
                      disabled
                    >
                      Airdrop all users
                    </Button>
                    :
                    <Button
                      type="primary"
                      shape="round"
                      style={{ marginTop: '1rem' }}
                      onClick={() => showModalHandler()}
                    >
                      Airdrop all users
                    </Button>
                }
              </Col>
            </Row>
            <Modal
              title="Airdrop All Users"
              visible={visible}
              onOk={() => airdropAllHandler(users)}
              onCancel={() => cancelHandler()}
              okText="Confirm airdrop"
              okButtonProps={{ shape: 'round' }}
              cancelButtonProps={{ shape: 'round' }}
            >
              <p>boo</p>
            </Modal>
            <Table
              columns={columns}
              dataSource={users}
              pagination={false}
              scroll={{ x: 1300, y: 500 }}
            />
            <Pagination
              defaultCurrent={match.params.page ? parseInt(match.params.page) : 1}
              onChange={(page) => history.push({
                pathname: `/dashboard/airdrop/${page}`,
                state: {
                  pageTitle: 'Airdrop Dashboard'
                }
              })}
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
    messageData: dashboard.message,
    successGwxUsers: dashboard.successAirdroppedGwxUsers,
    failedGwxUsers: dashboard.failedAirdroppedGwxUsers,
    successTelegramUsers: dashboard.successAirdroppedTelegramUsers,
    failedTelegramUsers: dashboard.failedAirdroppedTelegramUsers,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAirdropDashboardData: (page) => dispatch(fetchAirdropDashboardData(page)),
    airdropUser: (airdropType, body) => dispatch(airdropUser(airdropType, body)),
    airdropAllUsers: (users, date) => dispatch(airdropAllUsers(users, date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AirdropDashboard))