import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo_footer.png";

class Navbar extends Component {
  state = {
    current: "current",
    visible: false,
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <nav className="navbar">
        <div className="logo">
          <Link to="/home">
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
          <Button className="menuButton" type="text" onClick={this.showDrawer}>
            <span className="barsBtn"></span>
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={this.onClose}
            open={this.state.visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </div>
      </nav>

    );
  }
}

export default Navbar;