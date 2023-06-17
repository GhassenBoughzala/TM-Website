import React from "react";
import { Menu, Grid } from "antd";

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="sign">Signin</Menu.Item>
      <Menu.Item key="app">Signup</Menu.Item>
    </Menu>
  );
};

export default RightMenu;
