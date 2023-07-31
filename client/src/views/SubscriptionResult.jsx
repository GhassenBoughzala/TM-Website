/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Result } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TM from "../assets/images/TM.png";

export const SubscriptionResult = ({ ...props }) => {
  const navTo = useNavigate();
  const { t } = useTranslation();

  /*   useEffect(() => {
    if (props.msg === null) {
      navTo("/");
    }
  }, [props.msg]); */

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
                title={t("SubsResult-1")}
                //subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                  <Button type="primary" key="console">
                    Download Language Test
                  </Button>,
                ]}
              />
            </>
          )}
          {props.msg === 0 && (
            <Result
              status="warning"
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
  loadingSub: state.subs.loading_create,
  msg: state.subs.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(SubscriptionResult);
