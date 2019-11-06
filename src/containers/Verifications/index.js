import React, { useEffect } from 'react'
import Container from '../../components/UI/Container'
import { connect } from 'react-redux'
import { profilePendingFetch } from '../../store/actions/profile'
import { Table, Button, Popover } from 'antd'

const Verifications = ({
  pendingProfiles,
  fetchPendingProfiles,
}) => {

  useEffect(() => {
    fetchPendingProfiles()
  }, [])

  const imagePopup = (imageId, alt) => {
    return <img src={'https://gwx-bounty-bot.s3-ap-southeast-1.amazonaws.com/' + imageId + '.jpg'} alt={alt} />
  }

  const columns = [
    {
      title: 'Telegram Username',
      dataIndex: 'telegramUsername',
      key: 'telegramUsername',
    },
  ]

  const expandedRowRender = (profile) => {
    let profiles = profile.tasks.filter((task) => {
      return task.taskNumber === 3 || task.taskNumber === 5
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
            <Button.Group>
              <Button type="primary" size="small" onClick={() => console.log('Approve', profile.telegramId)} ghost>Approve</Button>
              <Button type="danger" size="small" onClick={() => console.log('Reject', profile.telegramId)} ghost>Reject</Button>
            </Button.Group>
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
      <Table
        dataSource={pendingProfiles}
        columns={columns}
        expandedRowRender={(record) => expandedRowRender(record)}
      />
    </Container>
  )
}

const mapStateToProps = ({ profile }) => {
  return {
    pendingProfiles: profile.pendingProfiles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPendingProfiles: () => dispatch(profilePendingFetch()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Verifications);