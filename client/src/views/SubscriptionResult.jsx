/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Result } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export const SubscriptionResult = ({ ...props }) => {
  const navTo = useNavigate();
  const { t } = useTranslation();

  return (
    <div className=" container-fluid">
      <Helmet>
        <title>Course Subscription</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/subscription" />
      </Helmet>
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
                  className="mx-auto d-block"
                  alt="Quality Team"
                  src="/images/TM.png"
                  width={300}
                  height={"auto"}
                />
              </div>
              <Result
                status="success"
                title={t("SubsResult-1")}
                //subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
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
            </>
          )}
          {props.msg === 0 && (
            <Result
              status="error"
              title={t("SubsResult-0")}
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
