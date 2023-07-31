/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Result } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TM from "../assets/images/TM.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SubscriptionResult = ({ ...props }) => {
  const navTo = useNavigate();
  const { t } = useTranslation();
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

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
                subTitle={t("PayResult-2")}
                extra={[
                  <Button
                    size="large"
                    icon={<FontAwesomeIcon icon="fa-brands fa-whatsapp" />}
                    className="bg-success text-white"
                    key="console"
                    onClick={() =>
                      openInNewTab(
                        `https://api.whatsapp.com/send?phone=1234567890`
                      )
                    }
                  >
                    Contact Us on WhatsApp
                  </Button>,
                  <Button type="primary" key="console">
                    Download Language Test
                  </Button>,
                ]}
              />
            </>
          )}
          {props.msg === 0 && (
            <Result
              status="error"
              title={t("SubsResult-0")}
              extra={
                <Button
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
