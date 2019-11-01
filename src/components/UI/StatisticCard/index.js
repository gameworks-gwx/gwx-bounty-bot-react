import React from 'react';
import { Card, Statistic, Col } from 'antd'
import { Link } from 'react-router-dom';

const StatisticCard = ({ cardTitle, pathname, statisticData, size }) => {
  let pageTitle;


  if (pathname === '/') {
    pageTitle = 'Home'
  } else if (pathname === '/dashboard/gwx') {
    pageTitle = 'GWX Dashboard'
  } else if (pathname === '/dashboard/telegram') {
    pageTitle = 'Telegram Dashboard'
  } else if (pathname === '/user-management') {
    pageTitle = 'User Management'
  } else if (pathname === '/verifications') {
    pageTitle = 'Verifications'
  }

  return (
    <Link to={{
      pathname,
      state: {
        pageTitle
      }
    }}>
      <Card title={cardTitle} size={size ? size : ''} hoverable>
        {
          statisticData.length
            ? statisticData.map((data, index) => {
              return (
                <Col span={12}>
                  <Statistic
                    key={index}
                    title={data.title}
                    value={data.value}
                    valueStyle={{ fontSize: '3rem', textAlign: 'center' }}
                    style={{ textAlign: 'center' }}
                  />
                </Col>
              )
            })
            :
            <Statistic
              title={statisticData.title}
              value={statisticData.value}
              valueStyle={{ fontSize: '3rem', textAlign: 'center' }}
              style={{ textAlign: 'center' }}
            />
        }
      </Card>
    </Link >
  )
}

export default StatisticCard