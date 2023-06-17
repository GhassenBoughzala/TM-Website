import React from "react";
import { Menu, Grid } from "antd";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;

const LeftMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key='home'>
        Home
        <Link to="/home" />
      </Menu.Item>
      <Menu.Item key='courses'>Language Courses</Menu.Item>
      <Menu.Item key='life'>Student Life</Menu.Item>
      <Menu.Item key='about'>About</Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
