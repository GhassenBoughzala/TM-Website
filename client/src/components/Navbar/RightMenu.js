import React, { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../redux/auth/authActions";
import { connect } from "react-redux";

const RightMenu = ({ ...props }) => {
  const userExist = localStorage.getItem("user");
  useEffect(() => {}, [userExist]);
  return (
    <>
      {props.isAuth ? (
        <div className="mt-1">
          <Button
            type="default"
            size="default"
            shape="circle"
            icon={<UserOutlined />}
            onClick={() => {
              //props.Logout();
            }}
          ></Button>
          <Button
            type="default"
            size="default"
            shape="circle"
            icon={<LogoutOutlined />}
            className="mx-3"
            onClick={() => {
              props.Logout();
            }}
          ></Button>
        </div>
      ) : (
        <div className="mt-1">
          <Link to="/login">
            <Button type="default" size="default">
              Log in
            </Button>
          </Link>
          <Link to="/register" className="mx-2">
            <Button type="default" size="default">
              Sign up
            </Button>
          </Link>
        </div>
      )}

      {/* <Menu.Item key="sign">
        Signin
        <Link to="/login" />
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/register" />
        Signup
      </Menu.Item> */}
    </>
  );
};

const mapActionToProps = {
  Logout: logout,
};
const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
});

export default connect(mapToStateProps, mapActionToProps)(RightMenu);
