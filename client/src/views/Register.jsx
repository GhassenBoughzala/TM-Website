/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import { register } from "../redux/auth/authActions";
import { Layout, Button, Form, Input, Select, Checkbox } from "antd";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import usePrevious from "../helpers/usePrevious";
import { cloudinaryBaseUrl, countryList, imageParams } from "../helpers/Constants";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
//const State = require("country-state-city").State;
const { Content } = Layout;

export const Register = ({ ...props }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
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
      warningOnly: false,
      message: "At least one Special Characters (?, !, @, $,&)",
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

  const [ciso, setCiso] = useState("");
  const [policy, setPolicy] = useState(false);
  /*  const cities = State.getStatesOfCountry(ciso);
   const cityList = Object.entries(cities).map(([code, country]) => ({
    label: country.name,
    value: country.name,
  })); */

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        props.Register(values);
      })
      .catch((errorInfo) => {
        toast.error("Register failed !");
        console.log("errorInfo ...", errorInfo);
      });
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

  const handleCountry = async (val, options) => {
    setCiso(options.code);
  };

  const onChangeCheck = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      setPolicy(true);
    } else {
      setPolicy(false);
    }
  };

  return (
    <Content className="container-fluid">
      <Helmet>
        <title>Register</title>
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
                <div className="card-body p-5 shadow-5 text-center mb-5">
                  <img
                    src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/logo_footer.png`}
                    width={"100%"}
                    height={"auto"}
                    alt="TaaMarbouta"
                    style={{ width: "12%" }}
                    className="mb-3"
                  />

                  <Form
                    form={form}
                    className="form"
                    name="basic"
                    layout="vertical"
                    size={"large"}
                    labelCol={{ span: 20 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-outline text-start">
                          <Form.Item
                            label={t("firstName")}
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
                            label={t("lastName")}
                            name="lastName"
                            rules={[
                              {
                                required: true,
                                message: "Please input your last name !",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-outline text-start">
                          <Form.Item
                            label={t("co")}
                            name="country"
                            rules={[
                              {
                                required: true,
                                message: "Please input your country !",
                              },
                            ]}
                          >
                            <Select
                              onSelect={(val, options) =>
                                handleCountry(val, options)
                              }
                              showSearch
                              options={countryList}
                            ></Select>
                          </Form.Item>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-outline text-start">
                          <Form.Item
                            label={t("ci")}
                            name="city"
                            rules={[
                              {
                                required: true,
                                message: "Please input your city !",
                              },
                            ]}
                          >
                            <Input disabled={ciso === "" ? true : false} />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
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

                      <div className="col-md-6">
                        <div className="form-outline text-start">
                          <Form.Item
                            label={t("ph")}
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Please input your phone number !",
                              },
                            ]}
                          >
                            <Input pattern="[0-9]{0,5}" type="number" />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-outline text-start">                      
                          <Form.Item
                            label={t("ui")}
                            name="institution"
                            rules={[
                              {
                                required: true,
                                message: `${t("Please input your")} ${t("ui")} !`,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <div className="form-outline text-start">
                          <Form.Item
                            label={t("pwd")}
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
                            label={t("pwdc")}
                            dependencies={["password"]}
                            hasFeedback
                            rules={ArrayOfConfirmationRules}
                          >
                            <Input.Password />
                          </Form.Item>
                        </div>
                      </div>
                      <Checkbox onChange={onChangeCheck}>
                        <span className="text-start">{t("check")}</span>
                      </Checkbox>
                    </div>

                    <div className="form-outline text-center">
                      <Form.Item>
                        <Button
                          type="primary"
                          htmltype="submit"
                          onClick={handleFormSubmit}
                          disabled={!policy}
                        >
                          {t("create")}
                        </Button>
                      </Form.Item>
                      <p>
                        {t("acc")} <Link to="/login">{t("lo")}</Link>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <img
                src="/images/Artboard-5-100.webp"
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
  Register: register,
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
  msg: state.auth.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(Register);
