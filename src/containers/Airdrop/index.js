import React, { useEffect, useState } from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchAirdropDashboardData,
  airdropUser,
  airdropAllUsers,
  fetchSpecificLedger,
  searchUsers
} from "../../store/actions/dashboard";
import Container from "../../components/UI/Container";
import useDebounce from "../../util/hooks/useDebounce";
import AirdropAllModal from "../../components/UI/AirdropAllModal";
import {
  Table,
  Button,
  Tooltip,
  Statistic,
  Row,
  Col,
  Pagination,
  Skeleton,
  Input,
  Icon,
  Typography
} from "antd";

const { Search } = Input;
const { Text } = Typography;

const Airdrop = ({
  history,
  match,
  fetchAirdropDashboardData,
  usersData,
  loading,
  airdropUser,
  gwxLoading,
  telegramLoading,
  successGwxUsers,
  failedGwxUsers,
  successTelegramUsers,
  failedTelegramUsers,
  airdropAllUsers,
  fetchSpecificLedger,
  ledger,
  ledgerLoading,
  searchUsers
}) => {
  const [visible, setVisible] = useState(false); //!! For modal
  const [search, setSearch] = useState("");
  const { users, total } = usersData;
  const momentDate = moment(new Date()).format("MM/DD/YYYY");
  const date = Math.floor(new Date(momentDate).getTime());
  const debouncedQuery = useDebounce(search, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      if (!match.params.page) {
        history.push({
          pathname: `/airdrop/1`,
          state: {
            pageTitle: "Airdrop Dashboard"
          }
        });
      } else {
        fetchAirdropDashboardData(match.params.page);
      }
    } else {
      searchUsers(debouncedQuery, match.params.page || 1);
    }
  }, [
    fetchAirdropDashboardData,
    history,
    match.params.page,
    debouncedQuery,
    searchUsers
  ]);

  const airdropHandler = (event, airdropType, user) => {
    event.stopPropagation();
    let tokensDisbursed;
    const { email, wallet_address } = user;

    if (airdropType === "telegram") {
      const verifiedTasks = user.tasks.filter(task => task.verified !== false);
      tokensDisbursed = verifiedTasks.length * 600;
    } else {
      tokensDisbursed = 600;
    }

    const body = {
      date,
      tokensDisbursed,
      email: email || "Unregistered",
      walletAddress: wallet_address,
      isTelegram: airdropType === "telegram",
      air_drop_created_at: user.air_drop_created_at || ""
    };

    airdropUser(airdropType, body);
  };

  const showModalHandler = () => {
    setVisible(true);
    fetchSpecificLedger(date);
  };

  const airdropAllHandler = users => {
    setVisible(false);
    const filteredUsers = users.filter(
      user => !user.air_drop_created_at || user.telegramId
    );

    airdropAllUsers(filteredUsers, date, 0);
  };

  const cancelHandler = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "Email Address",
      key: "email",
      render: (_, record) =>
        record.email ? (
          <label htmlFor="">{record.email}</label>
        ) : (
          <Text type="secondary" style={{ fontStyle: "italic" }}>
            None
          </Text>
        )
    },
    {
      title: "Wallet Address",
      key: "wallet_address",
      render: (_, record) =>
        record.wallet_address ? (
          <label htmlFor="">{record.wallet_address}</label>
        ) : (
          <Text type="secondary" style={{ fontStyle: "italic" }}>
            None
          </Text>
        )
    },
    {
      title: "Telegram Username",
      key: "telegramUsername",
      render: (_, record) => {
        if (!record.telegramId) {
          return (
            <Text type="secondary" style={{ fontStyle: "italic" }}>
              Unregistered
            </Text>
          );
        } else {
          if (record.telegramUsername) {
            return <label htmlFor="">{record.telegramUsername}</label>;
          }

          return (
            <Text type="secondary" style={{ fontStyle: "italic" }}>
              None
            </Text>
          );
        }
      }
    },
    {
      title: "Tasks",
      key: "tasks",
      render: (_, record) => {
        let approvedTasks;
        if (record.tasks) {
          approvedTasks = record.tasks.filter(task => task.verified !== false);
        }
        return (
          <>
            {record.tasks ? (
              approvedTasks.length >= 6 ? (
                <label>
                  <h4>{approvedTasks.length}/6</h4>
                </label>
              ) : (
                <label>{approvedTasks.length}/6</label>
              )
            ) : (
              <Text type="secondary" style={{ fontStyle: "italic" }}>
                Unregistered
              </Text>
            )}
          </>
        );
      }
    },
    {
      title: "GWX Airdrop",
      key: "gwxAirdrop",
      align: "center",
      render: (_, record) => (
        <>
          {record.air_drop_created_at ? (
            <>
              <Text type="secondary" style={{ fontSize: "10px" }}>
                Last airdropped
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: "10px" }}>
                {moment(record.air_drop_created_at).format("MM/DD/YYYY h:m a")}
              </Text>
              <br />
            </>
          ) : null}
          {record.wallet_address ? (
            record.air_drop_created_at ? (
              <Tooltip
                placement="topLeft"
                title="This user has already been airdropped"
              >
                <Button type="primary" shape="round" disabled>
                  <Icon type="check" />
                  Airdrop succeeded
                </Button>
              </Tooltip>
            ) : gwxLoading.indexOf(record.wallet_address) !== -1 ? (
              <Button type="primary" shape="round" loading>
                Loading
              </Button>
            ) : successGwxUsers.indexOf(record.wallet_address) !== -1 ? (
              <Button type="primary" shape="round" disabled>
                <Icon type="check" />
                Airdrop succeeded
              </Button>
            ) : failedGwxUsers.indexOf(record.wallet_address) !== -1 ? (
              <Button type="danger" shape="round" disabled>
                <Icon type="close" />
                Airdrop failed
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={event => airdropHandler(event, "gwx", record)}
                shape="round"
              >
                Airdrop
              </Button>
            )
          ) : (
            <Tooltip
              placement="topLeft"
              title="This user has no wallet address registered"
            >
              <Button type="primary" shape="round" disabled>
                Airdrop
              </Button>
            </Tooltip>
          )}
        </>
      )
    },
    {
      title: "Telegram Airdrop",
      key: "telegramAirdrop",
      align: "center",
      render: (_, record) => {
        let tokens;
        if (record.telegramId) {
          const verifiedTasks = record.tasks.filter(
            task => task.verified !== false
          );
          tokens = verifiedTasks.length * 600;
        }
        return (
          <>
            {record.lastAirdropped ? (
              <>
                <Text type="secondary" style={{ fontSize: "10px" }}>
                  Last airdropped
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: "10px" }}>
                  {moment(record.lastAirdropped).format("MM/DD/YYYY h:m a")}
                </Text>
                <br />
              </>
            ) : null}
            {record.wallet_address ? (
              record.telegramId ? (
                record.tokensReceived === tokens ? (
                  <Tooltip
                    placement="topLeft"
                    title="This user has already been airdropped"
                  >
                    <Button type="primary" shape="round" disabled>
                      <Icon type="check" />
                      Airdrop succeeded
                    </Button>
                  </Tooltip>
                ) : telegramLoading.indexOf(record.wallet_address) !== -1 ? (
                  <Button type="primary" shape="round" loading>
                    Loading
                  </Button>
                ) : successTelegramUsers.indexOf(record.wallet_address) !==
                  -1 ? (
                  <Button type="primary" shape="round" disabled>
                    <Icon type="check" />
                    Airdrop succeeded
                  </Button>
                ) : failedTelegramUsers.indexOf(record.wallet_address) !==
                  -1 ? (
                  <Button type="danger" shape="round" disabled>
                    <Icon type="close" />
                    Airdrop failed
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={event => airdropHandler(event, "telegram", record)}
                    shape="round"
                  >
                    Airdrop
                  </Button>
                )
              ) : (
                <Tooltip
                  placement="topLeft"
                  title="This user has no telegram profile yet"
                >
                  <Button type="primary" shape="round" disabled>
                    Airdrop
                  </Button>
                </Tooltip>
              )
            ) : (
              <Tooltip
                placement="topLeft"
                title="This user has no wallet address registered"
              >
                <Button type="primary" shape="round" disabled>
                  Airdrop
                </Button>
              </Tooltip>
            )}
          </>
        );
      }
    }
  ];

  return (
    <Container>
      <>
        <Row
          type="flex"
          justify="space-around"
          style={{ margin: "1vh 0 1vh 0" }}
        >
          <Col>
            <Statistic
              title="Total users for airdrop"
              value={total}
              valueStyle={{ textAlign: "center" }}
            />
          </Col>
          <Col>
            {telegramLoading.length || gwxLoading.length ? (
              <Button
                type="primary"
                shape="round"
                style={{ marginTop: "1rem" }}
                disabled
              >
                Airdrop all users
              </Button>
            ) : (
              <Button
                type="primary"
                shape="round"
                style={{ marginTop: "1rem" }}
                onClick={() => showModalHandler()}
                size="large"
              >
                Airdrop all users
              </Button>
            )}
          </Col>
          {match.params.page === "1" || !match.params.page ? (
            <Col>
              <Search
                placeholder="Search users"
                style={{ width: "18rem", marginTop: "1rem" }}
                onChange={event => setSearch(event.target.value)}
                value={search}
                size="large"
              />
            </Col>
          ) : null}
          <Col>
            <Tooltip placement="topLeft" title="Refresh list">
              <Button
                icon="reload"
                style={{ marginTop: "1rem" }}
                size="large"
                shape="circle"
                onClick={() =>
                  fetchAirdropDashboardData(match.params.page || 1)
                }
              />
            </Tooltip>
          </Col>
        </Row>
        <AirdropAllModal
          props={{ title: "Airdrop All Users" }}
          airdropAll={airdropAllHandler}
          users={users}
          cancel={cancelHandler}
          visible={visible}
          ledger={ledger}
          loading={ledgerLoading}
        />
        {loading ? (
          <>
            <Skeleton active data-test="loading" />
            <Skeleton active data-test="loading" />
            <Skeleton active data-test="loading" />
            <Skeleton active data-test="loading" />
          </>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={users}
              pagination={false}
              scroll={{ x: 1300, y: 500 }}
            />
            <Pagination
              defaultCurrent={
                match.params.page ? parseInt(match.params.page) : 1
              }
              onChange={page =>
                history.push({
                  pathname: `/airdrop/${page}`,
                  state: {
                    pageTitle: "Airdrop Dashboard"
                  }
                })
              }
              defaultPageSize={20}
              total={total}
            />
          </>
        )}
      </>
    </Container>
  );
};

const mapStateToProps = ({ dashboard }) => {
  return {
    usersData: dashboard.usersData,
    loading: dashboard.fetchLoading,
    gwxLoading: dashboard.gwxLoading,
    telegramLoading: dashboard.telegramLoading,
    messageData: dashboard.message,
    successGwxUsers: dashboard.successAirdroppedGwxUsers,
    failedGwxUsers: dashboard.failedAirdroppedGwxUsers,
    successTelegramUsers: dashboard.successAirdroppedTelegramUsers,
    failedTelegramUsers: dashboard.failedAirdroppedTelegramUsers,
    ledger: dashboard.ledger,
    ledgerLoading: dashboard.ledgerLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAirdropDashboardData: page =>
      dispatch(fetchAirdropDashboardData(page)),
    airdropUser: (airdropType, body) =>
      dispatch(airdropUser(airdropType, body)),
    airdropAllUsers: (users, date, count) =>
      dispatch(airdropAllUsers(users, date, count)),
    fetchSpecificLedger: date => dispatch(fetchSpecificLedger(date)),
    searchUsers: (query, page) => dispatch(searchUsers(query, page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Airdrop));
