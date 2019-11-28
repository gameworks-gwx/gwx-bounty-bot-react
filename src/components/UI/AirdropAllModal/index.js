import React from 'react'
import { Modal, Typography, Table, Skeleton } from 'antd'
import moment from 'moment'

const { Title, Paragraph, Text } = Typography

const AirdropAllModal = ({ visible, airdropAll, users, cancel, props, ledger, loading }) => {

  const columns = [
    {
      title: 'Email Address',
      key: 'email',
      width: 100,
      render: (_, record) => (
        <>
          {
            record.email
              ? <label htmlFor="">{record.email}</label>
              : <Text type="secondary" style={{ fontStyle: 'italic' }}>Unregistered</Text>
          }
        </>
      )
    },
    {
      title: 'Wallet Address',
      dataIndex: 'walletAddress',
      width: 100,
      key: 'walletAddress',
    },
  ]

  return (
    <Modal
      {...props}
      visible={visible}
      onOk={() => airdropAll(users)}
      onCancel={() => cancel()}
      okText="Confirm airdrop"
      okButtonProps={{ shape: 'round' }}
      cancelButtonProps={{ shape: 'round' }}
    >
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
          ledger
            ?
            <Typography>
              <Title level={4}>Previous Airdrop Summary</Title>
              <Paragraph>
                Date Airdropped: <Text strong>
                  {moment(ledger.date).format('MMMM DD, YYYY')}
                </Text>
              </Paragraph>
              <Paragraph>
                Tokens Disbursed: <Text strong>
                  {ledger.tokensDisbursed || 0}
                </Text>
              </Paragraph>
              <Paragraph>
                Successful Transactions: <Text strong>
                  {ledger.successUsers || 0}
                </Text>
              </Paragraph>
              <Paragraph>
                <Paragraph style={{ fontSize: 20 }}>Failed Users: <Text strong>
                  {ledger.failedUsers ? ledger.failedUsers.length : 0}
                </Text></Paragraph>
                <Table dataSource={ledger.failedUsers} columns={columns} size="small" scroll={{ y: 200 }} pagination={false} />
              </Paragraph>
            </Typography>
            :
            <Typography>
              <Title level={4} type="secondary" style={{ fontStyle: 'italic' }}>No previous airdrop data</Title>
            </Typography>
      }
    </Modal>
  )
}

export default AirdropAllModal