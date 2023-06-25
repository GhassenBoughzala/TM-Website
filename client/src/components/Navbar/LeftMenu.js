import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = ({mode}) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="home">
        Home
        <Link to="/" />
      </Menu.Item>
      <Menu.Item key="courses">Language Courses</Menu.Item>
      <Menu.Item key="life">Student Life</Menu.Item>
      <Menu.Item key="about">About</Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
