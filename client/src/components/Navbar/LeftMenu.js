import React from "react";
import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LeftMenu = ({ ...props }) => {
  const { t } = useTranslation();
  const navTo = useNavigate();

  const onClick = ({ key }) => {
    props.setOpen(false);
    navTo(`${key}`);
  };

  const items = [
    {
      label: <span className=" blue-text">Modern Standard Arabic</span>,
      key: "/learn-arabic",
    },
    {
      label: <span className=" blue-text">Tunisian Arabic</span>,
      key: "/learn-tunisian-arabic",
    },
    // {
    //   label: <span className=" blue-text">Libyan Arabic</span>,
    //   key: "/learn-libyan-arabic",
    // },
    {
      label: <span className=" blue-text">French</span>,
      key: "/learn-french",
    },
    {
      label: <span className=" blue-text">English</span>,
      key: "/learn-english",
    },
  ];

  return (
    <div className={`${props.open ? "d-inline-grid gap-2 " : ""}`}>
      <Button
        type="link"
        className="ant-btn-menu text-start"
        onClick={() => {
          navTo("/");
          props.setOpen(false);
        }}
      >
        {t("Home")}
      </Button>
      <Dropdown
        placement="bottom"
        arrow
        menu={{
          items,
          onClick,
        }}
      >
        <Button
          type="link"
          className="ant-btn-menu text-start"
          onClick={() => {
            navTo("/language-courses");
          }}
        >
          {t("LanguageCourses")}
        </Button>
      </Dropdown>
      <Button
        type="link"
        className="ant-btn-menu text-start"
        onClick={() => {
          navTo("/student-life");
          props.setOpen(false);
        }}
      >
        {t("StudentLife")}
      </Button>
      <Button
        type="link"
        className="ant-btn-menu text-start"
        onClick={() => {
          navTo("/scholarships");
          props.setOpen(false);
        }}
      >
        {t("sco")}
      </Button>
      <Button
        type="link"
        className="ant-btn-menu text-start"
        onClick={() => {
          navTo("/ambassadors");
          props.setOpen(false);
        }}
      >
        Ambassadors
      </Button>
      <Button
        type="link"
        className="ant-btn-menu text-start"
        onClick={() => {
          navTo("/about");
          props.setOpen(false);
        }}
      >
        {t("About")}
      </Button>
      <Button
        type="link"
        className="ant-btn-menu text-start"
        onClick={() => {
          navTo("/contact");
          props.setOpen(false);
        }}
      >
        Contact
      </Button>
    </div>
  );
};

export default LeftMenu;
