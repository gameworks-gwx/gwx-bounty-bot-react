import React from 'react';
import { Row, Col } from 'antd'
import StatisticCard from '../../../components/UI/StatisticCard';

const MobileHome = ({ loading, dashboardData }) => {
  const { gwxUsersCount, adminCount, telegramUsersCount, pendingCount } = dashboardData
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <StatisticCard
            size="small"
            cardTitle="Airdrop dashboard"
            pathname="/dashboard/airdrop"
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
        <Col span={24}>
          <StatisticCard
            size="small"
            cardTitle="Administrators"
            pathname="/administrators"
            statisticData={{
              title: "Total Admins",
              value: adminCount
            }}
            loading={loading}
          />

        </Col>
        <Col span={24}>
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