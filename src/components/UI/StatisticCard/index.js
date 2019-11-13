import React from 'react';
import { Card, Statistic, Col } from 'antd'
import { Link } from 'react-router-dom';

const { Meta } = Card;

const StatisticCard = ({ cardTitle, pathname, statisticData, size, loading }) => {
  let pageTitle;

  if (pathname === '/') {
    pageTitle = 'Home'
  } else if (pathname === '/dashboard/gwx') {
    pageTitle = 'GWX Dashboard'
  } else if (pathname === '/dashboard/telegram') {
    pageTitle = 'Telegram Dashboard'
  } else if (pathname === '/administrators') {
    pageTitle = 'Administrators'
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
      <Card className="statistic-card" loading={loading} size={size ? size : ''} hoverable>
        <Meta title={cardTitle} style={{ marginBottom: '1rem' }} size="small" />
        {
          statisticData.length
            ? statisticData.map((data, index) => {
              return (
                <Col span={12} key={index}>
                  <Statistic
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