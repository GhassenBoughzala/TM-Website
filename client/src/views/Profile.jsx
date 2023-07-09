/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Layout, Button, Form, Input } from "antd";
import { connect } from "react-redux";
import Footer from "../components/Footer";
import { UserOutlined } from "@ant-design/icons";
import { loadUser } from "../redux/auth/authActions";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { UpdateUser } from "../redux/user/userActions";
import { LoadingOutlined } from "@ant-design/icons";
import usePrevious from "../helpers/usePrevious";
const { Content } = Layout;

export const Profile = ({ ...props }) => {
  useEffect(() => {
    props.GetUser();
  }, []);

  const [User] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  //const User = props.user

  const [view, setView] = useState(false);
  const onFinish = (values) => {
    try {
      props.Update(values);
    } catch (error) {
      console.log(error);
      toast.error("Update failed !");
    }
  };

  const onFinishFailed = () => {
    toast.warn("Check your fields");
  };

  const prev_loading = usePrevious(props.isLoading);
  useEffect(() => {
    if (prev_loading && !props.isLoading) {
      if (props.msg === 1) {
        props.GetUser();
        //navigate("/");
      }
      if (props.msg === 0) {
        toast.error("Something went wrong !");
      }
    }
  }, [props.isLoading, props.isAuth]);

  return (
    <>
      <Content className="container-fluid">
        <div className="container my-5 ">
          <div className="row justify-content-center">
            <div className="col col-lg-4 col-md-12 col-sm-12 col-xs-12 align">
              <Card style={{ height: 420 }}>
                <h1 className="montserrat_bold text-center blue-text ">
                  <UserOutlined style={{ fontSize: "100px" }} />
                </h1>
                <h3 className="text-center mx-lg-5 blue-text "> User informations </h3>
                {!props.isLoading ? (
                  <div className="parag_style mt-4">
                    <p>
                      First name: <b> {User.firstName} </b>
                    </p>
                    <p>
                      Last name: <b> {User.lastName} </b>
                    </p>
                    <p>
                      Email: <b> {User.email} </b>
                    </p>
                    {User.phone && (
                      <p>
                        Phone: <b> {User.phone} </b>
                      </p>
                    )}
                    {User.city && (
                      <p>
                        City: <b> {User.city} </b>
                      </p>
                    )}
                    <div className="text-center">
                      <Button
                        type="primary"
                        className="mt-4"
                        onClick={() => {
                          setView(true);
                        }}
                      >
                        Update informations
                      </Button>
                      
                    </div>
                  </div>
                ) : (
                  <div className="text-center mt-5">
                    <LoadingOutlined style={{ fontSize: 40 }} spin/>
                  </div>
                )}
              </Card>
            </div>
            <AnimatePresence>
              {view && (
                <motion.div
                  initial={{ x: "100vw" }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  exit={{ x: "100vw" }}
                  className="col col-lg-4 col-md-12 col-sm-12 col-xs-12 align"
                >
                  <Card style={{ height: 420 }}>
                    <Form
                      className="form"
                      name="basic"
                      layout="vertical"
                      size={"large"}
                      labelCol={{ span: 20 }}
                      style={{ maxWidth: 600, height: 420 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline text-start">
                            <Form.Item label="First name" name="firstName">
                              <Input defaultValue={User.firstName} />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline text-start">
                            <Form.Item label="Last name" name="lastName">
                              <Input defaultValue={User.lastName} />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-outline text-start">
                          <Form.Item label="Email" name="email">
                            <Input defaultValue={User.email} />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline text-start">
                            <Form.Item label="Phone number" name="phone">
                              <Input type="number" defaultValue={User.phone} />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline text-start">
                            <Form.Item label="City" name="city">
                              <Input defaultValue={User.city} />
                            </Form.Item>
                          </div>
                        </div>
                      </div>

                      <div className="form-outline text-center">
                        <Form.Item>
                          <Button type="default" htmlType="submit">
                            Update
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Content>
      <Footer />
    </>
  );
};

const mapActionToProps = {
  GetUser: loadUser,
  Update: UpdateUser,
};
const mapToStateProps = (state) => ({
  isLoading: state.user.loadingUser,
  msg: state.auth.codeMsg,
  user: state.user.user,
});

export default connect(mapToStateProps, mapActionToProps)(Profile);
