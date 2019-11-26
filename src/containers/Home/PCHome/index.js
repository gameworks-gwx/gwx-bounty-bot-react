import React from 'react';
import StatisticCard from '../../../components/UI/StatisticCard'
import { Row, Col } from 'antd'

const PCHome = ({ loading, dashboardData }) => {
  const { gwxUsersCount, adminCount, telegramUsersCount, pendingCount } = dashboardData
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '6rem' }}>
        <Col span={8}>
          <StatisticCard
            cardTitle="Airdrop dashboard"
            pathname="/airdrop"
            statisticData={[
              {
                title: "Total GWX Users",
                value: gwxUsersCount
              },
              {
                title: "Total Telegram Users",
                value: telegramUsersCount
              }
            ]}
            loading={loading}
          />
        </Col>
        <Col span={8}>
          <StatisticCard
            cardTitle="Administrators"
            pathname="/administrators"
            statisticData={{
              title: "Total Admins",
              value: adminCount
            }}
            loading={loading}
          />

        </Col>
        <Col span={8}>
          <StatisticCard
            cardTitle="Verifications"
            pathname="/verifications"
            statisticData={{
              title: "Pending Screenshots",
              value: pendingCount
            }}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  )
}

export default PCHome
