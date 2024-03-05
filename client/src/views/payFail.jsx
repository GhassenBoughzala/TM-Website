import React from 'react';
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cloudinaryBaseUrl, imageParams } from "../helpers/Constants";

export const PayFail = () => {
  
  const navTo = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className="my-3 text-center">
        <img
          className="mx-auto d-block"
          alt="Quality Team"
          src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/TM.png`}
          width={300}
          height={"auto"}
        />
      </div>
      <Result
        status="error"
        title={[
          t("pay_fail"),
          <br key="br" />,
          t("pay_fail1"),
          <br key="br2" />,
          <a 
            key="email_link"
            href="mailto:info@taamarbouta.com"
            className="table_style pt-3 m-auto email_info"
          >
            info@taamarbouta.com
          </a>
        ]}
        extra={[
          <Button
            size="large"
            type="primary"
            key={1}
            onClick={() => navTo("/profil")}
          >
            View booked Courses
          </Button>,
          <Button
            size="large"
            type="primary"
            key={2}
            onClick={() => navTo("/language-courses")}
          >
            Back to courses
          </Button>,
        ]}
      />
    </div>
  )
}

export default PayFail
