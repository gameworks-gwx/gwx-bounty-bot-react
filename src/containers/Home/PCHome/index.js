import React from 'react';
import StatisticCard from '../../../components/UI/StatisticCard'
import { Row, Col } from 'antd'

const PCHome = ({ loading, dashboardData }) => {
  const { gwxUsersCount, adminCount, telegramUsersCount, pendingCount } = dashboardData
  return (
    <>
      <Row gutter={[8, 8]} style={{ marginTop: '2rem' }}>
        <Col span={12}>
          <StatisticCard
            cardTitle="GWX Dashboard"
            pathname="/dashboard/gwx"
            statisticData={{
              title: "Total Users",
              value: gwxUsersCount
            }}
            loading={loading}
          />
        </Col>
        <Col span={12}>
          <StatisticCard
            cardTitle="Telegram Dashboard"
            pathname="/dashboard/telegram"
            statisticData={{
              title: "Total Users",
              value: telegramUsersCount
            }}
            loading={loading}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>

        <Col span={12}>
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
        <Col span={12}>
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
