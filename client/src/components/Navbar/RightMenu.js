import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const RightMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="sign">
        Signin
        <Link to="/login" />
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/register" />
        Signup
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
