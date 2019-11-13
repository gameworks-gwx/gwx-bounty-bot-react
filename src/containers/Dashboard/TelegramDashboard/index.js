import React, { useEffect } from 'react'
import Container from '../../../components/UI/Container'
import { withRouter } from 'react-router-dom';
import { Table, Button, Tooltip, Statistic, Row, Col, Pagination, Skeleton, Input } from 'antd'
import { connect } from 'react-redux'
import { profileFetchAll, searchProfile } from '../../../store/actions/profile'

const { Search } = Input;

const TelegramDashboard = ({
  history,
  profileData,
  fetchAllProfiles,
  match,
  loading,
  searchProfile
}) => {

  useEffect(() => {
    if (!match.params.page) {
      fetchAllProfiles(1)
    } else {
      fetchAllProfiles(match.params.page)
    }

    if (history.location.search && !match.params.page) {
      const paramsQuery = new URLSearchParams(history.location.search);
      const query = paramsQuery.get('q')

      if (query) {
        searchProfile(query)
      } else {
        history.push('/dashboard/telegram')
      }
    }

  }, [fetchAllProfiles, history, history.location.search, match.params.page, searchProfile])

  const airdropHandler = (event, test) => {
    event.stopPropagation()
    console.log(test)
  }

  const { profiles = [], total } = profileData;


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
      key: 'tasks',
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
      key: 'airdropReward',
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
    <Container>
      {
        loading
          ?
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
                <Statistic title="Total Airdrop" value={6000} valueStyle={{ textAlign: 'center' }} />
              </Col>
              <Col>
                <Button type="primary" shape="round" style={{ marginTop: '1rem' }}>Airdrop all users</Button>
              </Col>
            </Row>

            <Search
              placeholder="Search by telegram username"
              style={{ width: '18rem', marginBottom: '1rem' }}
              onSearch={(query) => history.push(`/dashboard/telegram?q=${query}`)}
            />
            <Table
              onRow={(record) => {
                return {
                  onClick: (_) => history.push({
                    pathname: `/profile/${record._id}`,
                    state: {
                      pageTitle: 'Profile'
                    }
                  })
                }
              }}
              dataSource={profiles}
              columns={columns}
              scroll={{ x: 1300, y: 500 }}
              size="middle"
              pagination={false}
            />
            <Pagination
              defaultCurrent={match.params.page ? parseInt(match.params.page) : 1}
              onChange={(page) => history.push(`/dashboard/telegram/${page}`)}
              defaultPageSize={20}
              total={total}
            />
          </>

      }

    </Container>
  )
}

const mapStateToProps = ({ profile }) => {
  return {
    profileData: profile.profiles,
    loading: profile.fetchAllLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProfiles: (page) => dispatch(profileFetchAll(page)),
    searchProfile: (query) => dispatch(searchProfile(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TelegramDashboard))