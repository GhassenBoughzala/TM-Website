/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { getUsers, updateSub } from "../../redux/user/userActions";
import {
  Button,
  Collapse,
  Divider,
  Empty,
  Input,
  InputNumber,
  List,
  Modal,
  Select,
  Steps,
  theme,
} from "antd";
import usePrevious from "../../helpers/usePrevious";
import { toast } from "react-toastify";
import PaginationComponent from "../../helpers/pagination";
import moment from "moment";

export const UsersList = ({ ...props }) => {
  useEffect(() => {
    props.AllUsers();
  }, []);

  const statusOfSub = (status) => {
    if (status === "pending") return 1;
    else if (status === "test") return 2;
    else if (status === "request") return 3;
    else if (status === "confirmed") return 4;
  };

  const items = [
    { title: "Subscription" },
    { title: "Language Test" },
    { title: "Payment Access" },
    { title: "Payment" },
  ];

  const options = [
    { label: "Language Test", value: "test" },
    { label: "Payment Access", value: "request" },
    { label: "Payment", value: "confirmed" },
  ];

  const [status, setStatus] = useState("");
  const [topay, setToPay] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const handleUpdate = () => {
    if (status === "") {
      toast.warn("Select a status !");
    } else {
      const values = { status: status, topay: topay };
      props.UpdateStatus(values, selectedIndex?._id);
      setShowUpdate(false);
    }
  };

  const handleCancel = () => {
    setShowUpdate(false);
    setStatus("");
    setSelectedIndex(undefined);
    setToPay(null);
  };

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 10,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

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

  const [Search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const offresPerPage = 10;
  const data = props.usersList;
  const dataToSearch = useMemo(() => {
    let computed = data;
    if (Search) {
      computed = computed.filter(
        (i) =>
          i.lastName.toLowerCase().includes(Search.toLowerCase()) ||
          i.firstName.toLowerCase().includes(Search.toLowerCase()) ||
          i.email.toLowerCase().includes(Search.toLowerCase())
      );
    }
    setPageNumber(computed.length);
    return computed.slice(
      (currentPage - 1) * offresPerPage,
      (currentPage - 1) * offresPerPage + offresPerPage
    );
  }, [data, currentPage, Search]);

  const subsList = dataToSearch
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
        <div className="my-1">
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
                            setSelectedIndex(su);
                          }}
                        >
                          Update process
                        </Button>
                      </p>

                      <div className="row my-3">
                        <span>
                          Type:
                          <span className="blue-text mx-1">
                            {su.type} Class
                            {su.hours != null ? `- ${su.hours}h` : ``}
                          </span>
                        </span>
                        {su.sessions.length !== 0 && (
                          <span>
                            Sessions:
                            {su.sessions.map((se, inedx) => {
                              return (
                                <span key={index} className="blue-text mx-1">
                                  • {moment(se).format("MMM Do YYYY")}
                                </span>
                              );
                            })}
                          </span>
                        )}
                        <p>Notes: {su.notes}</p>
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

  const [format, setFormat] = useState(0);
  const handleAmountChange = (e) => {
    setFormat(e / 100);
    setToPay(e);
  };

  return (
    <div className="row">
      <h3 className="yellow-text">Users Management</h3>

      {!props.isLoading ? (
        <div className=" container-fluid">
          <Input
            placeholder="Search by First name, Last name or email"
            size="large"
            className="w-50 d-block m-auto mb-4"
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
          <List itemLayout="horizontal">
            <Collapse ghost accordion items={subsList} />
          </List>
          {!Search && (
            <PaginationComponent
              total={pageNumber}
              itemsPerPage={offresPerPage}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
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
        title={"Update user subscription process"}
        open={showUpdate}
        onCancel={handleCancel}
        width={400}
        bodyStyle={{ height: 150 }}
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
              <InputNumber
                style={{ width: "100%" }}
                min={100}
                onChange={handleAmountChange}
                //addonBefore={currency}
                addonAfter="cents"
              />
            </div>
            <Divider orientation="center">
              <h4 className=" blue-text">
                {format.toFixed(2)} {selectedIndex?.currency}
              </h4>
            </Divider>
            <Button
              type="default"
              loading={props.loadingStatus}
              onClick={() => {
                handleUpdate(selectedIndex._id);
              }}
            >
              Update status
            </Button>
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
