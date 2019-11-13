import React from 'react';
import { Card, Row, Col, Statistic } from 'antd'
import StatisticCard from '../../../components/UI/StatisticCard';

const MobileHome = ({ loading, dashboardData }) => {
  const {gwxUsersCount, adminCount, telegramUsersCount, pendingCount} = dashboardData
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <StatisticCard
            size="small"
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
            size="small"
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
            size="small"
            cardTitle="User Management"
            pathname="/user-management"
            statisticData={{
              title: "Total Admins",
              value: adminCount
            }}
            loading={loading}
          />
        </Col>
        <Col span={12}>
          <StatisticCard
            size="small"
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

export default MobileHome