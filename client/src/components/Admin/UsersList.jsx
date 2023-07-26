/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { getUsers } from "../../redux/user/userActions";
import { Collapse, Empty, List, Steps, theme } from "antd";

export const UsersList = ({ ...props }) => {
  useEffect(() => {
    props.AllUsers();
  }, []);

  const statusOfSub = (status) => {
    if (status === "pending") return 1;
    else if (status === "test") return 2;
    else if (status === "confirmed") return 3;
  };

  const items = [
    { title: "Subscription" },
    { title: "Language Test" },
    { title: "Payment" },
  ];

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 10,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const subsList = props.usersList
    .filter((user) => {
      if (user.role === "user") {
        return user;
      }
    })
    .map((item, index) => ({
      key: index,
      label: (
        <List.Item.Meta
          title={
            <p className=" fw-lighter fs-5">
              {item.firstName} {item.lastName} - {item.email} -
              <span className="mx-1 yellow-text">
                {item.subscription.length} Booked courses
              </span>
            </p>
          }
        />
      ),
      children: (
        <div className="my-4">
          {item.subscription.length === 0 ? (
            <>
              <Empty description="No booked courses"></Empty>
            </>
          ) : (
            <>
              {item.subscription.map((su, index) => {
                return (
                  <Fragment key={index}>
                    <p>Course {index + 1}</p>
                    <Steps
                      className="my-3"
                      current={statusOfSub(su.status)}
                      items={items}
                    />
                  </Fragment>
                );
              })}
            </>
          )}
        </div>
      ),
      style: panelStyle,
    }));

  return (
    <div className="row">
      <h3 className="yellow-text">Users Management</h3>

      {!props.isLoading ? (
        <>
          <List itemLayout="horizontal">
            <Collapse ghost accordion items={subsList} />
          </List>
        </>
      ) : (
        <div className="text-center mt-5">
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        </div>
      )}
    </div>
  );
};

const mapActionToProps = {
  AllUsers: getUsers,
};
const mapStateToProps = (state) => ({
  usersList: state.user.users,
  isLoading: state.user.loading,
});

export default connect(mapStateToProps, mapActionToProps)(UsersList);
