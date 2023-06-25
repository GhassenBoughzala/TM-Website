import React from "react";
import { Menu } from "antd";
const RightMenu = ({mode}) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="sign">Signin</Menu.Item>
      <Menu.Item key="app">Signup</Menu.Item>
    </Menu>
  );
};

export default RightMenu;
