import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LeftMenu = ({ mode }) => {
  const { t } = useTranslation();
  const items = [
    {
      label: (<> {t("Home")} <Link to="/" /> </>),
      key: "/" || "",
    },    
    {
      label: (<> {t("LanguageCourses")} <Link to="/language-courses" /> </>),
      key: "/language-courses",
    },    
    {
      label: (<> {t("StudentLife")} <Link to="/student-life" /> </>),
      key: "/student-life",
    },    
    {
      label: (<> {t("About")} <Link to="/about" /> </>),
      key: "/about",
    },
  ];
  return (
    <Menu mode={mode} items={items}>
    
    </Menu>
  );
};

export default LeftMenu;
