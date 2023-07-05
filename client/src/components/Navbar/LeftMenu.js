import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode} items={""}>
      <Menu.Item key="/">
        Home
        <Link to="/" />
      </Menu.Item>
      <Menu.Item key="/language-courses">
        Language Courses <Link to="/language-courses" />
      </Menu.Item>
      <Menu.Item key="life">Student Life</Menu.Item>
      <Menu.Item key="about">About</Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
