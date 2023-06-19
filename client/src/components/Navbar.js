import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo_footer.png";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
    if (open) {
      setOpen(false);
    }
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo-header" />
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="leftMenu">
          <LeftMenu mode={"horizontal"} />
        </div>

        <div className="rightMenu">
          <RightMenu mode={"horizontal"} />
        </div>
        <Button className="menuButton" type="text" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title={"TaaMarbouta"}
          placement="right"
          closable={true}
          onClose={onClose}
          open={open}
          style={{ zIndex: 99999 }}
        >
          <LeftMenu mode={"inline"} />
          <RightMenu mode={"inline"} />
        </Drawer>
      </div>
    </nav>
    /*     <nav className="navbar">
      <div className="logo">
        <Link to="/">
            <img src={Logo} alt="logo" className="logo-header" />
          </Link>
      </div>
      <div className="navbar-menu">
        <div className="leftMenu">
          <LeftMenu />
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
        <Button className="menuButton" type="text" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav> */
  );
};

export default Navbar;
