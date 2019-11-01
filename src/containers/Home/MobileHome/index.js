import React from 'react';
import { Card, Row, Col, Statistic } from 'antd'

const MobileHome = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="GWX Dashboard" size="small">
            <Statistic
              title="Total GWX Users"
              value="1,429"
              valueStyle={{ fontSize: '3rem', textAlign: 'center' }}
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Telegram Dashboard" size="small">
            <Statistic
              title="Total Telegram Users"
              value="502"
              valueStyle={{ fontSize: '3rem', textAlign: 'center' }}
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="User Management" size="small">
            <Col span={12}>
              <Statistic
                title="Total Admins"
                value="3"
                valueStyle={{ fontSize: '3rem', textAlign: 'center' }}
                style={{ textAlign: 'center' }}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Staffs"
                value="7"
                valueStyle={{ fontSize: '3rem', textAlign: 'center' }}
                style={{ textAlign: 'center' }}
              />

            </Col>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Verifications" size="small">
            <Statistic
              title="Pending Screenshots"
              value="5"
              valueStyle={{ fontSize: '3rem', textAlign: 'center' }}
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default MobileHome