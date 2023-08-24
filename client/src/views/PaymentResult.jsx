/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TM from "../assets/images/TM.png";
import axios from "axios";

export const SubscriptionResult = ({ ...props }) => {
  const navTo = useNavigate();
  const { t } = useTranslation();

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const [contact, setContact] = useState({});
  useEffect(() => {
    axios
      .get(`/api/contact/`)
      .then((res) => {
        setContact(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" container-fluid">
      {!props.loadingSub ? (
        <div className="text-center">
          <LoadingOutlined
            style={{
              fontSize: 40,
              margin: 130,
            }}
            spin
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {props.msg === 1 && (
            <>
              <div className="my-3 text-center">
                <img
                  width={300}
                  className="mx-auto d-block"
                  src={TM}
                  alt="Quality Team"
                />
              </div>
              <Result
                status="success"
                title={t("PayResult-1")}
                extra={[
                  <Button
                    size="large"
                    icon={<WhatsAppOutlined style={{ fontSize: 23 }} />}
                    className="bg-success text-white"
                    key="num1"
                    onClick={() =>
                      openInNewTab(
                        `https://api.whatsapp.com/send?phone=${contact.mobile}`
                      )
                    }
                  >
                    Contact us for accommodation
                  </Button>,
                  <Button
                    size="large"
                    icon={<WhatsAppOutlined style={{ fontSize: 23 }} />}
                    className="bg-success text-white"
                    key="num2"
                    onClick={() =>
                      openInNewTab(
                        `https://api.whatsapp.com/send?phone=${contact.work}`
                      )
                    }
                  >
                    Contact us for internships
                  </Button>,
                ]}
              >
                <div className=" bg-transparent text-center">
                  <div className=" mt-3">
                    <h5> {t("PayResult-2")} </h5>
                    <h5> {t("PayResult-3")} </h5>
                  </div>
                  <Button
                    className="mt-4"
                    size="large"
                    type="primary"
                    key="num3"
                    onClick={() => navTo("/profil")}
                  >
                    View booked Courses
                  </Button>
                </div>
              </Result>
            </>
          )}
          {props.msg === 0 && (
            <Result
              status="error"
              title={t("SubsResult-0")}
              extra={
                <Button
                  size="large"
                  type="primary"
                  key="console"
                  onClick={() => navTo("/profil")}
                >
                  View booked Courses
                </Button>
              }
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

const mapActionToProps = {};
const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  loadingSub: state.subs.loading_update,
  msg: state.subs.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(SubscriptionResult);
