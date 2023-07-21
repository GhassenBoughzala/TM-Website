import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LeftMenu = ({ mode }) => {
  const { t } = useTranslation();
  const navTo = useNavigate();
  return (
    <>
      <Button
        type="link"
        className="ant-btn-menu"
        onClick={() => {
          navTo("/");
        }}
      >
        {t("Home")}
      </Button>
      <Button
        type="link"
        className="ant-btn-menu"
        onClick={() => {
          navTo("/language-courses");
        }}
      >
        {t("LanguageCourses")}
      </Button>
      <Button
        type="link"
        className="ant-btn-menu"
        onClick={() => {
          navTo("/student-life");
        }}
      >
        {t("StudentLife")}
      </Button>{" "}
      <Button
        type="link"
        className="ant-btn-menu"
        onClick={() => {
          navTo("/about");
        }}
      >
        {t("About")}
      </Button>
    </>
  );
};

export default LeftMenu;
