import React, { useState, useEffect } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import { Link, Navigate } from "react-router-dom";
import { cloudinaryBaseUrl, imageParams } from "../../helpers/Constants";
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
    if (userLocal.role === "admin") {
      <Navigate to="/admin-dashboard" />;
    }
  }, [userLocal]);

  return (
    <nav className="align header_one navbar">
      <div className="logo">
        <Link to="/">
          <img
            alt="logo"
            className="logo-header h-25"
            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/logo_footer.png`}
            width={125}
            height={200}
          />
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="leftMenu my-1">
          <LeftMenu {...{ open, setOpen }} />
        </div>

        <div className="rightMenu">
          <RightMenu {...{ open, setOpen }} />
        </div>
        <Button className="menuButton" name="drawer" type="text" onClick={showDrawer}>
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
          <LeftMenu {...{ open, setOpen }} />
          <RightMenu {...{ open, setOpen }} />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
