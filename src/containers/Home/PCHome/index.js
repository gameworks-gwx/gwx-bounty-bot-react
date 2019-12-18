import React from "react";
import StatisticCard from "../../../components/UI/StatisticCard";
import { Row, Col } from "antd";

const PCHome = ({ loading, dashboardData }) => {
  const {
    gwxUsersCount,
    adminCount,
    telegramUsersCount,
    pendingCount
  } = dashboardData;
  return (
    <>
      <Row
        gutter={[32, 32]}
        type="flex"
        justify="center"
        style={{ marginTop: "6rem" }}
      >
        <Col span={12}>
          <StatisticCard
            className="statistic-card"
            cardTitle="Airdrop dashboard"
            pathname="/airdrop"
            data-test="pcStatisticCard"
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
      </Row>
      <Row gutter={[16, 32]} type="flex" justify="center">
        <Col span={6}>
          <StatisticCard
            className="statistic-card"
            cardTitle="Administrators"
            pathname="/administrators"
            data-test="pcStatisticCard"
            statisticData={{
              title: "Total Admins",
              value: adminCount
            }}
            loading={loading}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            className="statistic-card"
            cardTitle="Verifications"
            pathname="/verifications"
            data-test="pcStatisticCard"
            statisticData={{
              title: "Pending Screenshots",
              value: pendingCount
            }}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default PCHome;
