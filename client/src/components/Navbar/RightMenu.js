import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../redux/auth/authActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const RightMenu = ({ ...props }) => {
  const navTo = useNavigate();

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
              navTo("/profil");
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
              navTo("/");
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
              Sign up
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
