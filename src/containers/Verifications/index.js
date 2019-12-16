import React, { useEffect } from 'react'
import Container from '../../components/UI/Container'
import { connect } from 'react-redux'
import { profilePendingFetch, profileVerifyScreenshot } from '../../store/actions/profile'
import { Table, Button, Popover, Skeleton, Typography, Divider } from 'antd'

const { Text } = Typography
const Verifications = ({
  pendingProfiles,
  fetchPendingProfiles,
  verifyProfileScreenshot,
  loading
}) => {

  useEffect(() => {
    fetchPendingProfiles()
  }, [fetchPendingProfiles])

  const imagePopup = (imageId, alt) => {
    return <img src={'https://gwx-bounty-bot.s3-ap-southeast-1.amazonaws.com/' + imageId + '.jpg'} alt={alt} />
  }

  const verifyHandler = (id, taskNumber, verified) => {
    const body = {
      taskNumber,
      verified
    }
    verifyProfileScreenshot(id, body);
  }

  const columns = [
    {
      title: 'Telegram Username',
      key: 'telegramUsername',
      render: (_, record) => (
        record.telegramUsername
          ?
          record.telegramUsername
          :
          <Text type="secondary" style={{ fontStyle: 'italic' }}>No telegram username</Text>
      )
    },
  ]

  const expandedRowRender = (profile) => {
    let profiles = profile.tasks.filter((task) => {
      return (task.taskNumber === 3 && !task.verified) || (task.taskNumber === 5 && !task.verified)
    })

    const columns = [
      {
        title: 'Image',
        key: 'fileId',
        render: (_, record) => {
          return (
            <>
              {
                record.taskNumber === 3
                  ?
                  <Popover content={imagePopup(record.fileId, "Facebook")}>
                    <a href={'https://gwx-bounty-bot.s3-ap-southeast-1.amazonaws.com/' + record.fileId + '.jpg'}>Facebook</a>
                  </Popover>
                  :
                  <Popover content={imagePopup(record.fileId, "Youtube")}>
                    <a href={'https://gwx-bounty-bot.s3-ap-southeast-1.amazonaws.com/' + record.fileId + '.jpg'}>Youtube</a>
                  </Popover>

              }
            </>
          )
        },
      },
      {
        title: 'Action',
        key: 'operation',
        render: (_, record) => {
          return (
            <>
              <Button type="primary" size="small" onClick={() => verifyHandler(profile._id, record.taskNumber, true)} ghost>Approve</Button>
              <Divider type="vertical" />
              <Button type="danger" size="small" onClick={() => verifyHandler(profile._id, record.taskNumber, false)} ghost>Reject</Button>
            </>
          )
        },
      },
    ]

    return <Table
      columns={columns}
      dataSource={profiles}
      pagination={false}
      size="small"
    />

  }

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
          <Table
            dataSource={pendingProfiles}
            columns={columns}
            expandedRowRender={(record) => expandedRowRender(record)}
          />
      }
    </Container>
  )
}

const mapStateToProps = ({ profile }) => {
  return {
    pendingProfiles: profile.pendingProfiles,
    loading: profile.fetchAllLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPendingProfiles: () => dispatch(profilePendingFetch()),
    verifyProfileScreenshot: (id, body) => dispatch(profileVerifyScreenshot(id, body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Verifications);