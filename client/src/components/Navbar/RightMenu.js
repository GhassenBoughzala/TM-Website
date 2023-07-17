import React, { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { logout } from "../../redux/auth/authActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const RightMenu = ({ ...props }) => {
  const navTo = useNavigate();
  const [User] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  return (
    <>
      {props.isAuth ? (
        <div className="mt-1 mx-3">
          {User.role === "admin" && (
            <Button
              type="default"
              size="default"
              shape="circle"
              className="blue-text"
              icon={<SettingOutlined />}
              onClick={() => {
                navTo("/admin-dashboard");
              }}
            ></Button>
          )}{" "}
          <Button
            type="default"
            size="default"
            shape="circle"
            className="mx-3 blue-text"
            icon={<UserOutlined />}
            onClick={() => {
              navTo("/profil");
            }}
          ></Button>
          <Button
            type="default"
            size="default"
            shape="circle"
            icon={<LogoutOutlined />}
            className="blue-text"
            onClick={() => {
              props.Logout();
              navTo("/");
              window.location.reload();
            }}
          ></Button>
        </div>
      ) : (
        <div className="mt-1">
          <Link to="/login">
            <Button type="default" size="default">
              Sign in
            </Button>
          </Link>
          <Link to="/register" className="mx-2">
            <Button type="default" size="default">
              Register
            </Button>
          </Link>
        </div>
      )}
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
