import React from 'react';
import StatisticCard from '../../../components/UI/StatisticCard'
import { Card, Row, Col, Statistic } from 'antd'

const PCHome = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <StatisticCard
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
            cardTitle="User Management"
            pathname="/user-management"
            statisticData={[
              {
                title: "Total Admins",
                value: "3"
              },
              {
                title: "Total Staffs",
                value: "8"
              },
            ]}
          />

        </Col>
        <Col span={12}>
          <StatisticCard
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

export default PCHome
