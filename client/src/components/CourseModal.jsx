/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Image, Empty, Carousel, Button, Modal, Form, Select } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Subscribe } from "../redux/subs/subsActions";
import usePrevious from "../helpers/usePrevious";
import { motion } from "framer-motion";

export const CourseModal = ({ ...props }) => {
  const navTo = useNavigate();
  const course = { description: [], sessions: [{ sessions: [] }] };
  const [form] = Form.useForm();
  const [currentObj, setCurrentObj] = useState(course);
  useEffect(() => {
    if (props.currentObj) {
      setCurrentObj(props.currentObj);
    }
  }, [props.currentObj]);

  const imagesW = require.context("../assets/images/student/Course/W", true);
  const imagesListW = imagesW.keys().map((image) => imagesW(image));
  const imagesH = require.context("../assets/images/student/Course/H", true);
  const imagesListH = imagesH.keys().map((image) => imagesH(image));
  const [openModal, setOpenModal] = useState(false);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        props.AddSub({
          course: currentObj._id,
          level: values.level,
        });
        setOpenModal(false);
        navTo("/subscription");
      })
      .catch((errorInfo) => {
        toast.warn("Check your fields !");
        console.log("errorInfo ...", errorInfo);
      });
  };

  const options = [
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" },
  ];

  const prev_loadingUp = usePrevious(props.loadingSub);
  useEffect(() => {
    if (prev_loadingUp && !props.loadingSub) {
      if (props.msg === 1) {
        navTo("/");
      }
      if (props.msg === 0) {
        toast.warn("Something went wrong !");
      }
    }
  }, [props.loadingSub, props.msg]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {currentObj !== null ? (
        <div className="row m-3">
          <h3 className="blue-text">{currentObj.title}</h3>
          {/* Course Side 1 */}
          <div className="mb-3 col-lg-7 col-md-6 col-sm-12 col-xs-12 border-2 border-end">
            {currentObj.description ? (
              currentObj.description.map((d, index) => {
                return (
                  <Fragment key={index}>
                    <p className="text-secondary">{d.description}</p>
                  </Fragment>
                );
              })
            ) : (
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            )}
            {props.isAuth ? (
              <div className="text-center my-5">
                <Button
                  className="subs-btn"
                  size="large"
                  type="text"
                  onClick={() => setOpenModal(true)}
                >
                  Book now
                </Button>
              </div>
            ) : (
              <div className="text-center my-5">
                <Button
                  type="default"
                  size="large"
                  htmlType="submit"
                  onClick={() => {
                    navTo("/login");
                  }}
                >
                  Connect or Register to book a course
                </Button>
              </div>
            )}
          </div>
          {/* Course Side 2 */}
          <div className="mb-3 col-lg-5 col-md-6 col-sm-12 col-xs-12">
            <h5 className="yellow-text">Price description: </h5>
            <p>{currentObj.priceDescription}</p>
            <div>
              {currentObj.sessions.length !== 0 && (
                <>
                  <h5 className="yellow-text">
                    The course dates are as follows:
                  </h5>
                  {currentObj.sessions.map((s, index) => {
                    return (
                      <Fragment key={index}>
                        <p className="blue-text">
                          {moment(s[0]).format("MMMM")}:
                          <b className="mx-1 text-dark">
                            {moment(s[0]).format("MMM Do")}
                          </b>
                          <b className="text-dark">
                            - {moment(s[1]).format("MMM Do YYYY")}
                          </b>
                        </p>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </div>
            <div className="text-center mt-3">
              <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
                {imagesListH.map((img, index) => {
                  return (
                    <Fragment key={index}>
                      <Image
                        width={300}
                        height={500}
                        src={img}
                        alt={index}
                        preview={true}
                        className=" rounded"
                      />
                    </Fragment>
                  );
                })}
              </Carousel>

              <Carousel
                className="py-4"
                autoplay
                speed={1250}
                slidesToShow={1}
                dots={false}
              >
                {imagesListW.map((img, index) => {
                  return (
                    <Fragment key={index}>
                      <Image
                        width={300}
                        height={200}
                        src={img}
                        alt={index}
                        preview={true}
                        className=" rounded"
                      />
                    </Fragment>
                  );
                })}
              </Carousel>
            </div>
          </div>

          {/* Book Modal */}
          <Modal
            open={openModal}
            onCancel={handleCancel}
            width={600}
            bodyStyle={{ height: 300 }}
            footer={null}
          >
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
              <div className="row">
                <h2 className=" blue-text mb-5">
                  Book {currentObj.title} Course
                </h2>
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
                  <div className="text-center">
                    <div className="form-outline text-center d-block m-auto">
                      <h5>Select your level</h5>
                      <Form.Item
                        name="level"
                        rules={[
                          {
                            required: true,
                            message: "Please input your level !",
                          },
                        ]}
                      >
                        <Select options={options} className="w-50"></Select>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="form-outline text-center">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmltype="submit"
                        onClick={handleFormSubmit}
                      >
                        Confirm
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            )}
          </Modal>
          {/* End Book Modal */}
        </div>
      ) : (
        <div className=" my-5">
          <Empty />
        </div>
      )}
    </motion.div>
  );
};
const mapActionToProps = {
  AddSub: Subscribe,
};
const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  loadingSub: state.subs.loading_create,
  msg: state.subs.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(CourseModal);
