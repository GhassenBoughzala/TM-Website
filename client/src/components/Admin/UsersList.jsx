/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { getUsers, updateSub } from "../../redux/user/userActions";
import {
  Button,
  Collapse,
  Empty,
  List,
  Modal,
  Select,
  Steps,
  theme,
} from "antd";
import usePrevious from "../../helpers/usePrevious";
import { toast } from "react-toastify";

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

  const options = [
    { label: "Subscription", value: "pending" },
    { label: "Language Test", value: "test" },
    { label: "Payment", value: "confirmed" },
  ];

  const [status, setStatus] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleUpdate = (id) => {
    if (status === "") {
      toast.warn("Select a status !");
    } else {
      props.UpdateStatus(id, status);
      setShowUpdate(false);
    }
  };

  const handleCancel = () => {
    setShowUpdate(false);
    setStatus("");
    setSelectedIndex(null);
  };

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
                    <>
                      <p>
                        Course {index + 1}
                        <Button
                          type="default"
                          className="mx-2"
                          size="small"
                          loading={props.loadingStatus}
                          onClick={() => {
                            setShowUpdate(true);
                            setSelectedIndex(su._id);
                          }}
                        >
                          Update status
                        </Button>
                      </p>

                      <div className="row my-3">
                        <Steps current={statusOfSub(su.status)} items={items} />
                      </div>
                    </>
                  </Fragment>
                );
              })}
            </>
          )}
        </div>
      ),
      style: panelStyle,
    }));

  const prev_loadingUp = usePrevious(props.loadingStatus);
  useEffect(() => {
    if (prev_loadingUp && !props.isLoadingUpdate) {
      if (props.msg === 1) {
        props.AllUsers();
      }
      if (props.msg === 0) {
        //toast.warn("Something went wrong !");
      }
    }
  }, [props.loadingStatus, props.usersList]);

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
        <div className="text-center mt-5 yellow-text">
          <LoadingOutlined
            style={{
              fontSize: 30,
            }}
            spin
          />
          <p className="my-2">Loading users </p>
        </div>
      )}

      <Modal
        title={"Update user subscription status"}
        open={showUpdate}
        onCancel={handleCancel}
        width={400}
        bodyStyle={{ height: 50 }}
        footer={null}
        centered={true}
        closeIcon={null}
      >
        <div className="container text-center">
          <div className="row mt-4">
            <div className="col col-7">
              <Select
                style={{ width: "100%" }}
                options={options}
                onSelect={(value) => {
                  setStatus(value);
                }}
              ></Select>
            </div>
            <div className="col col-5">
              <Button
                type="default"
                loading={props.loadingStatus}
                onClick={() => {
                  handleUpdate(selectedIndex);
                }}
              >
                Update status
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapActionToProps = {
  AllUsers: getUsers,
  UpdateStatus: updateSub,
};
const mapStateToProps = (state) => ({
  usersList: state.user.users,
  isLoading: state.user.loading,
  loadingStatus: state.user.loading_update,
  msg: state.user.codeMsg,
});

export default connect(mapStateToProps, mapActionToProps)(UsersList);
