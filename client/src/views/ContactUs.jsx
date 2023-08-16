/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import { Button, Form, Input, Layout } from "antd";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import TextArea from "antd/es/input/TextArea";
import { connect } from "react-redux";
import { sendContact } from "../redux/user/userActions";
import { motion } from "framer-motion";
import Logo from "../assets/images/logo_footer.png";

const { Content } = Layout;
export const ContactUs = ({ ...props }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        props.Send(values);
      })
      .catch((errorInfo) => {
        console.log("errorInfo ...", errorInfo);
      });
  };

  useEffect(() => {
    if (props.code === 1) {
      form.resetFields();
    }
  }, [props.code]);

  return (
    <Content>
      <Helmet>
        <title>Contact us</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/contact" />
      </Helmet>
      <div className="page_style full_espace_padding">
        <div className="container-fluid">
          <div className="row">
            <h1 className="titre">{t("ContactT")}</h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="container py-4"
            >
              <div className="text-center justify-content-center">
                <img
                  src={Logo}
                  alt="TaaMarbouta"
                  style={{ width: "5%" }}
                  className="mb-3"
                />
                <Form
                  form={form}
                  className="form d-block m-auto"
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
                    <div className="form-outline text-start">
                      <Form.Item
                        label="Your Email"
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

                  <div className="row">
                    <div className="form-outline text-start">
                      <Form.Item
                        label="Your message"
                        name="text"
                        rules={[
                          {
                            required: true,
                            message: "Please input your message !",
                          },
                        ]}
                      >
                        <TextArea rows={5} />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="form-outline text-center">
                    <Form.Item>
                      <Button
                        loading={true ? props.loading : props.loading}
                        type="primary"
                        htmltype="submit"
                        onClick={handleFormSubmit}
                      >
                        Send
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </Content>
  );
};

const mapActionToProps = {
  Send: sendContact,
};
const mapToStateProps = (state) => ({
  loading: state.user.loading,
  code: state.user.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(ContactUs);
