import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = ({ mode }) => {
  const items = [
    {
      label: (<> Home <Link to="/" /> </>),
      key: "/" || "",
    },    
    {
      label: (<> Language Courses <Link to="/language-courses" /> </>),
      key: "/language-courses",
    },    
    {
      label: (<> Student Life <Link to="/student-life" /> </>),
      key: "/student-life",
    },    
    {
      label: (<> About <Link to="/about" /> </>),
      key: "/about",
    },
  ];
  return (
    <Menu mode={mode} items={items}>
    
    </Menu>
  );
};

export default LeftMenu;
