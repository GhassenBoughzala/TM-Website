/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import Art from "../assets/images/Artboard-5-100.jpg";
import Logo from "../assets/images/logo_footer.png";
import { register } from "../redux/auth/authActions";
import { Layout, Button, Form, Input } from "antd";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import usePrevious from "../helpers/usePrevious";
const { Content } = Layout;

export const Register = ({ ...props }) => {
  const navigate = useNavigate();
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const minLengthRegExp = /.{8,}/;
  const ArrayOfRules = [
    {
      required: true,
      message: "Please input your password !",
    },
    {
      pattern: minLengthRegExp,
      warningOnly: true,
      message: "At least minumum 8 characters",
    },
    {
      pattern: uppercaseRegExp,
      warningOnly: true,
      message: "At least one Uppercase",
    },
    {
      pattern: lowercaseRegExp,
      warningOnly: true,
      message: "At least one Lowercase",
    },
    {
      pattern: digitsRegExp,
      warningOnly: true,
      message: "At least one digit",
    },
    {
      pattern: specialCharRegExp,
      warningOnly: true,
      message: "At least one Special Characters",
    },
  ];
  const ArrayOfConfirmationRules = [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("The new password that you entered do not match!")
        );
      },
    }),
  ];

  const onFinish = (values) => {
    try {
      props.Register(values);
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed !");
    }
  };
  const onFinishFailed = () => {
    toast.error("Sign up failed !");
  };

  const prev_loading = usePrevious(props.isLoading);
  useEffect(() => {
    if (prev_loading && !props.isLoading) {
      if (props.msg === 1) {
        navigate("/");
      }
      if (props.msg === 0) {
        toast.error("Failed to Register");
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
                <div className="card-body p-5 shadow-5 text-center mb-5">
                  <img
                    src={Logo}
                    alt="TaaMarbouta"
                    style={{ width: "12%" }}
                    className="mb-3"
                  />
                  <h2 className="fw-bold mb-2 text-start">Sign up</h2>
                  <Form
                    className="form"
                    name="basic"
                    layout="vertical"
                    size={"large"}
                    labelCol={{ span: 20 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-outline text-start">
                          <Form.Item
                            label="First name"
                            name="firstName"
                            rules={[
                              {
                                required: true,
                                message: "Please input your first name !",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-outline text-start">
                          <Form.Item
                            label="Last name"
                            name="lastName"
                            rules={[
                              {
                                required: true,
                                message: "Please input your lastName !",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
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
                          <Input />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="row mb-5">
                      <div className="col-md-6">
                        <div className="form-outline text-start">
                          <Form.Item
                            label="Password"
                            name="password"
                            rules={ArrayOfRules}
                            hasFeedback
                          >
                            <Input.Password />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-outline text-start">
                          <Form.Item
                            name="confirm"
                            label="Password confirmation"
                            dependencies={["password"]}
                            hasFeedback
                            rules={ArrayOfConfirmationRules}
                          >
                            <Input.Password />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="form-outline text-center">
                      <Form.Item>
                        <Button type="primary" htmltype="submit">
                          Submit
                        </Button>
                      </Form.Item>
                      <p>
                        Already have an account? <Link to="/login">Log in</Link>{" "}
                      </p>
                    </div>
                  </Form>
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
  Register: register,
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
  msg: state.auth.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(Register);
