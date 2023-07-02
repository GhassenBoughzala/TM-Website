/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "../assets/css/login.css";
import { Layout, Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Art from "../assets/images/Artboard-4-100.jpg";
import Logo from "../assets/images/logo_footer.png";
import { login } from "../redux/auth/authActions";
import usePrevious from "../helpers/usePrevious";
const { Content } = Layout;

export const Login = ({ ...props }) => {
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
      <section className="text-center text-lg-start">
        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card cascading-right">
                <div className="card-body p-5 shadow-5 text-center">
                  <img
                    src={Logo}
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
                          label="Password"
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
                            Submit
                          </Button>
                        </Form.Item>
                        <p>
                          Don’t have an account?
                          <Link to="/register" className="mx-1">
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </Form>
                  ) : (
                    <>
                      <h2> Already connected </h2>
                      <Button
                        type="primary"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Back home
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <img src={Art} className="w-100 rounded-4 shadow-4" alt="" />
            </div>
          </div>
        </div>
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
