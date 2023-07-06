import React, { useState, useEffect } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import { Link, Navigate } from "react-router-dom";
import Logo from "../../assets/images/logo_footer.png";
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

  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    if(userLocal.role === 'admin'){
      <Navigate to="/admin-dashboard"/>
    }
  }, [userLocal]);

  return (
    <nav className="col-lg-12 col-md-12 col-sm-12 col-xs-3 align header_one navbar">
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
  );
};

export default Navbar;
