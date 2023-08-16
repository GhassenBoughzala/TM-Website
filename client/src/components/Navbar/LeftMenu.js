import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LeftMenu = ({ ...props }) => {
  const { t } = useTranslation();
  const navTo = useNavigate();
  return (
    <>
      <Button
        type="link"
        className="ant-btn-menu"
        onClick={() => {
          navTo("/");
          props.setOpen(false);
        }}
      >
        {t("Home")}
      </Button>
      <Button
        type="link"
        className="ant-btn-menu"
        onClick={() => {
          navTo("/language-courses");
          props.setOpen(false);
        }}
      >
        {t("LanguageCourses")}
      </Button>
      <Button
        type="link"
        className="ant-btn-menu"
        onClick={() => {
          navTo("/student-life");
          props.setOpen(false);
        }}
      >
        {t("StudentLife")}
      </Button>
      <Button
        type="link"
        className="ant-btn-menu"
        onClick={() => {
          navTo("/about");
          props.setOpen(false);
        }}
      >
        {t("About")}
      </Button>{" "}
      <Button
        type="link"
        className="ant-btn-menu"
        onClick={() => {
          navTo("/contact");
          props.setOpen(false);
        }}
      >
        Contact
      </Button>
    </>
  );
};

export default LeftMenu;
