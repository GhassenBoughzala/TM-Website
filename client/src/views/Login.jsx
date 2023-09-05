/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "../assets/css/login.css";
import { Layout, Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { login } from "../redux/auth/authActions";
import usePrevious from "../helpers/usePrevious";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { cloudinaryBaseUrl, imageParams } from "../helpers/Constants";
const { Content } = Layout;

export const Login = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onFinish = (values) => {
    try {
      props.Login(values);
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed !");
    }
  };
  const onFinishFailed = () => {
    toast.warn("Check your fields");
  };
  const userExist = localStorage.getItem("user");

  const prev_loading = usePrevious(props.isLoading);
  useEffect(() => {
    if (prev_loading && !props.isLoading) {
      if (props.msg === 1) {
        navigate("/");
      }
      if (props.msg === 0) {
        toast.error("Failed to login");
      }
    }
  }, [props.isLoading, props.isAuth]);

  return (
    <Content className="container-fluid">
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/register" />
      </Helmet>
      <section className="text-center text-lg-start">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container py-4"
        >
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card cascading-right">
                <div className="card-body p-5 shadow-5 text-center">
                  <img
                    src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/logo_footer.png`}
                    width={"100%"}
                    height={"auto"}
                    alt="TaaMarbouta"
                    style={{ width: "12%" }}
                    className="mb-3"
                  />
                  {!userExist ? (
                    <Form
                      className="form"
                      name="basic"
                      layout="vertical"
                      size={"large"}
                      labelCol={{ span: 8 }}
                      style={{ maxWidth: 600 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      role="form"
                      autoComplete="off"
                    >
                      <div className="row">
                        <div className="form-outline text-start">
                          <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please input your email !",
                                type: "email",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <UserOutlined className="site-form-item-icon" />
                              }
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="form-outline text-start">
                        <Form.Item
                          label={t("pwd")}
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Password!",
                            },
                          ]}
                        >
                          <Input.Password
                            prefix={
                              <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                          />
                        </Form.Item>
                      </div>
                      <div className="form-outline text-center">
                        <Form.Item>
                          <Button
                            //loading={props.isLoading}
                            type="primary"
                            htmlType="submit"
                          >
                            {t("login")}
                          </Button>
                        </Form.Item>
                        <p>
                          {t("login-1")}
                          <Link to="/register" className="mx-1">
                            {t("login-2")}
                          </Link>
                        </p>
                      </div>
                    </Form>
                  ) : (
                    <>
                      <h2> {t("connected")} </h2>
                      <Button
                        type="primary"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        {t("back")}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <img
                src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/Artboard-4-100.jpeg`}
                width={"100%"}
                height={"auto"}
                className="w-100 rounded-4 shadow-4"
                alt="board"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </Content>
  );
};

const mapActionToProps = {
  Login: login,
};
const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
  msg: state.auth.codeMsg,
});
export default connect(mapToStateProps, mapActionToProps)(Login);
