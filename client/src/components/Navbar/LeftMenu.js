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
      <Menu.Item key="/student-life">
        Student Life <Link to="/student-life" />
      </Menu.Item>
      <Menu.Item key="/about">
        About <Link to="/about" />
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
