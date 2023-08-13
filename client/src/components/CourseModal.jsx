/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Image,
  Empty,
  Carousel,
  Button,
  Modal,
  Form,
  Select,
  Input,
} from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Subscribe } from "../redux/subs/subsActions";
import usePrevious from "../helpers/usePrevious";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const { Option } = Select;
const { TextArea } = Input;

export const CourseModal = ({ ...props }) => {
  const navTo = useNavigate();
  const { t } = useTranslation();
  const course = { description: [], sessions: [{ sessions: [] }], image: [] };
  const [form] = Form.useForm();
  const [currentObj, setCurrentObj] = useState(course);
  useEffect(() => {
    if (props.currentObj) {
      setCurrentObj(props.currentObj);
    }
  }, [props.currentObj]);

  const [openModal, setOpenModal] = useState(false);

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        props.AddSub({
          course: currentObj._id,
          level: values.level,
          sessions: values.sessions,
          notes: values.notes,
          title: currentObj.title,
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

  const handleChange = (value) => {
    form.setFieldValue({
      sessions: [],
    });
    console.log(value);
  };

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
            <h5 className="yellow-text">{t("priceDesc")}</h5>
            <p>{currentObj.priceDescription}</p>
            <div>
              {currentObj.sessions.length !== 0 && (
                <>
                  <h5 className="yellow-text">{t("sessions")}</h5>
                  {currentObj.sessions.map((s, index) => {
                    return (
                      <Fragment key={index}>
                        <p className="blue-text">
                          <b className="mx-1">
                            {moment(s[1]).format("MMM Do")}
                          </b>
                          <b>- {moment(s[0]).format("MMM Do YYYY")}</b>
                        </p>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </div>
            <div className="text-center mt-3">
              <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
                {currentObj.image.map((img, index) => {
                  return (
                    <Fragment key={index}>
                      <Image
                        width={"75%"}
                        src={img.base64}
                        alt={index}
                        preview={false}
                        className=" rounded my-5"
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
            width={500}
            bodyStyle={{ height: "100%" }}
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
                <h2 className=" blue-text mb-5 text-center mt-4">
                  Book {currentObj.title} Course
                </h2>
                <Form
                  form={form}
                  className="form"
                  name="basic"
                  layout="vertical"
                  size={"large"}
                  labelCol={{ span: 15 }}
                  autoComplete="off"
                >
                  <div className="row">
                    <div className="form-outline text-start">
                      <Form.Item
                        label="Select you level"
                        name="level"
                        rules={[
                          {
                            required: true,
                            message: "Please select your level",
                          },
                        ]}
                      >
                        <Select options={options} />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-outline text-start">
                      {currentObj.sessions.length !== 0 && (
                        <Form.Item
                          label="Select your sessions"
                          name="sessions"
                          onChange={handleChange}
                        >
                          <Select mode="multiple" maxLength={3}>
                            {currentObj.sessions.map((s, index) => {
                              return (
                                <Fragment key={index}>
                                  <Option
                                    value={s[0]}
                                    key={index}
                                    label={`${moment(s[0]).format(
                                      "MMMM"
                                    )} session`}
                                  >
                                    <p className=" text-dark">
                                      <b className="mx-1">
                                        {moment(s[1]).format("MMM Do")}
                                      </b>
                                      <b>
                                        - {moment(s[0]).format("MMM Do YYYY")}
                                      </b>
                                    </p>
                                  </Option>
                                </Fragment>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <Form.Item
                      label="Tell us more about your level :"
                      name="notes"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <TextArea rows={3} />
                    </Form.Item>
                  </div>

                  <div className="form-outline text-center mt-1">
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
