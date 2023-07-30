/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Result } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const SubscriptionResult = ({ ...props }) => {
  const navTo = useNavigate();
  const { t } = useTranslation();

  /*   useEffect(() => {
    if (props.msg === null) {
      navTo("/");
    }
  }, [props.msg]); */

  return (
    <div>
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
        <div>
          {props.msg === 1 && (
            <Result
              className="my-5"
              status="success"
              title={t("SubsResult-1")}
              //subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                <Button type="primary" key="console">
                  Download Language Test
                </Button>,
              ]}
            />
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
        </div>
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
