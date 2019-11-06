import React from 'react';
import { Card, Row, Col, Statistic } from 'antd'
import StatisticCard from '../../../components/UI/StatisticCard';

const MobileHome = () => {
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
              value: "1,429"
            }}
          />

        </Col>
        <Col span={12}>
          <StatisticCard
            size="small"
            cardTitle="Telegram Dashboard"
            pathname="/dashboard/telegram"
            statisticData={{
              title: "Total Users",
              value: "504"
            }}
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
              value: "3"
            }}
          />
        </Col>
        <Col span={12}>
          <StatisticCard
            size="small"
            cardTitle="Verifications"
            pathname="/verifications"
            statisticData={{
              title: "Pending Screenshots",
              value: 4
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default MobileHome