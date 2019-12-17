import React from "react";
import { Card, Statistic, Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

const StatisticCard = ({
  cardTitle,
  pathname,
  statisticData,
  size,
  loading,
  className
}) => {
  let pageTitle;

  if (pathname === "/") {
    pageTitle = "Home";
  } else if (pathname === "/airdrop/1") {
    pageTitle = "Airdrop Dashboard";
  } else if (pathname === "/administrators") {
    pageTitle = "Administrators";
  } else if (pathname === "/verifications") {
    pageTitle = "Verifications";
  }

  return (
    <Link
      to={{
        pathname,
        state: {
          pageTitle
        }
      }}
    >
      <Card
        className={className}
        loading={loading}
        size={size ? size : ""}
        hoverable={true}
      >
        <Meta title={cardTitle} style={{ marginBottom: "1rem" }} size="small" />
        {statisticData.length ? (
          <>
            <Row type="flex" justify="space-around">
              {statisticData.map((data, index) => {
                return (
                  <>
                    {index !== 0 ? (
                      <>
                        <Col>
                          <Divider type="vertical" style={{ height: 100 }} />
                        </Col>
                        <Col key={index}>
                          <Statistic
                            title={data.title}
                            value={data.value}
                            valueStyle={{
                              fontSize: "3rem",
                              textAlign: "center"
                            }}
                            style={{ textAlign: "center" }}
                          />
                        </Col>
                      </>
                    ) : (
                      <Col key={index}>
                        <Statistic
                          title={data.title}
                          value={data.value}
                          valueStyle={{ fontSize: "3rem", textAlign: "center" }}
                          style={{ textAlign: "center" }}
                        />
                      </Col>
                    )}
                  </>
                );
              })}
            </Row>
          </>
        ) : (
          <Statistic
            title={statisticData.title}
            value={statisticData.value}
            valueStyle={{ fontSize: "3rem", textAlign: "center" }}
            style={{ textAlign: "center" }}
          />
        )}
      </Card>
    </Link>
  );
};

export default StatisticCard;
