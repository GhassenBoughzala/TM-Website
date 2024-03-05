import React from 'react';
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cloudinaryBaseUrl, imageParams } from "../helpers/Constants";

export const PaySuccess = () => {
  
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
        status="success"
        title={t("pay_success")}
        extra={[
          <Button
            size="large"
            type="primary"
            key="num3"
            onClick={() => navTo("/profil")}
          >
            View booked courses
          </Button>,
        ]}
      ></Result>
    </div>
  )
}

export default PaySuccess
