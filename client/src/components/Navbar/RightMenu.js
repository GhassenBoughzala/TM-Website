import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { logout } from "../../redux/auth/authActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const RightMenu = ({ ...props }) => {
  const navTo = useNavigate();
  const { t } = useTranslation();
  const [User] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const handleLanguage = () => {
    const selectedLan = localStorage.getItem("i18nextLng");
    if (selectedLan === "fr") i18next.changeLanguage("en");
    else i18next.changeLanguage("fr");
  };
  return (
    <>
      {props.isAuth ? (
        <div className="mt-1 mx-3">
          {User.role === "admin" && (
            <Button
              type="default"
              size="default"
              shape="circle"
              className="blue-text"
              icon={<SettingOutlined />}
              onClick={() => {
                navTo("/admin-dashboard");
              }}
            ></Button>
          )}
          <Tooltip placement="bottom" title={t("Language")} dropdownAlign={{ offset: [-40, 4] }}>
            <Button
              type="default"
              size="default"
              shape="circle"
              className=" blue-text bg-transparent"
              icon={<GlobalOutlined />}
              onClick={handleLanguage}
            ></Button>
          </Tooltip>

          <Button
            type="default"
            size="default"
            shape="circle"
            className="mx-3 blue-text bg-transparent"
            icon={<UserOutlined />}
            onClick={() => {
              navTo("/profil");
            }}
          ></Button>
          <Button
            type="default"
            size="default"
            shape="circle"
            icon={<LogoutOutlined />}
            className="blue-text bg-transparent"
            onClick={() => {
              props.Logout();
              navTo("/");
              window.location.reload();
            }}
          ></Button>
        </div>
      ) : (
        <div className="mt-1">
          <Button
            type="default"
            size="default"
            className="mx-2"
            icon={<GlobalOutlined />}
            onClick={handleLanguage}
          >
            | {t("LanguageCode")}
          </Button>
          <Link to="/login">
            <Button type="default" size="default" className=" bg-transparent">
              {t("SignIn")}
            </Button>
          </Link>
          <Link to="/register" className="mx-2">
            <Button type="default" size="default" className=" bg-transparent">
              {t("Register")}
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

const mapActionToProps = {
  Logout: logout,
};
const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
});

export default connect(mapToStateProps, mapActionToProps)(RightMenu);
