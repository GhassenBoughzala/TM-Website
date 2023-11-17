/* eslint-disable no-mixed-operators */
import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, Select, Input, InputNumber, Carousel } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Subscribe } from "../redux/subs/subsActions";
import { RedoOutlined } from "@ant-design/icons";
import { currencies } from "../helpers/Constants";
import shortid from  "shortid";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { TextArea } = Input;

export const BookModal = ({ ...props }) => {
  const { t } = useTranslation();
  const navTo = useNavigate();
  const currentObj = props.currentObj;
  const [type, setType] = useState("");
  const [showLevelMessage, setShowLevelMessage] = useState(false);

  // State to track whether everything is okay
  const [isEverythingOkay, setIsEverythingOkay] = useState(false);

  // useEffect to check if everything is okay whenever props.msg changes
  useEffect(() => {
    // Assuming props.msg is a code where 0 means an error and 1 means success
    setIsEverythingOkay(props.msg === 1);
  }, [props.msg]);

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
          type: type,
          hours: values.hours,
          currency: values.currency,
        });
        //props.setOpenModal(false);
        //navTo("/subscription");
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

  const handleChange = (value) => {
    form.setFieldValue({
      sessions: [],
    });
  };

  const levelChange = (value) => {
    // Check if the selected level is not "Beginner"
    setShowLevelMessage(value !== "Beginner");
  };

  const [form] = Form.useForm();
  const reset = () => {
    form.resetFields();
    setType("");
  };
  
  /*if (props.msg == 0) {
    toast.warn(t('SubsResult-0')); // Assuming 'SubsResult-0' is a translation key
  } else if (props.msg == 1) {
    toast.success(t('SubsResult-1')); // Assuming 'SubsResult-1' is a translation key
  }*/

  const handleEverythingOkay = () => {
    if (isEverythingOkay) {
      // Do something when everything is okay
      console.log("Everything is okay!");
    } else {
      // Do something when there's an issue
      console.log("There's an issue.");
    }
  };

  return (
    <Carousel speed={1500} slidesToShow={1} dots={true}>
      <div>
      <Form
        form={form}
        className="form"
        name="basic"
        layout="vertical"
        size={"medium"}
        labelCol={{ span: 20 }}
        autoComplete="off"
      >
        <div className="row">
          <div className="form-outline text-start">
            <div className="mb-4">
              
              
              {props.msg && (
                <div className="row">
                  <p className="error-message">{props.msg}</p>
                </div>
              )}
              <Form.Item
                label="Select your level"
                name="level"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: "Please select your level",
                  },
                ]}
              >
                <Select options={options} onChange={levelChange} />
              </Form.Item>
              {showLevelMessage && (
                <p className="msg_test_level">{t("msg_test_level")}</p>
              )}
            </div>
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
            <TextArea rows={2} />
          </Form.Item>
        </div>
        <div className="row">
          <Form.Item
            label="Pick an option"
            name="type"
            rules={[
              {
                required: type === "" && true,
                message: "This field is required",
              },
            ]}
          >
            <div className="row text-start">
              <div className="col-lg-4 col-xs-12 my-1 text-center">
                <Button
                  type={`${type === "Evening" ? "primary" : "default"}`}
                  onClick={() => setType("Evening")}
                >
                  Next Evening Class
                </Button>
              </div>
              <div className="col-lg-4 col-xs-12 my-1 text-center">
                <Button
                  type={`${type === "Private" ? "primary" : "default"}`}
                  onClick={() => setType("Private")}
                >
                  Private Classes
                </Button>
              </div>
              <div className="col-lg-4 col-xs-12 my-1 text-center">
                <Button
                  type={`${type === "Intensive" ? "primary" : "default"}`}
                  onClick={() => setType("Intensive")}
                >
                  Intensive Classes
                </Button>
              </div>
            </div>
          </Form.Item>
        </div>
        {type === "Intensive" && (
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
                        <Fragment key={shortid.generate() + index}>
                          <Option
                            value={s.startDate}
                            key={s.id}
                            label={`${dayjs(s.startDate).format("MMMM")} session`}
                          >
                            <p className=" text-dark">
                              <b className="mx-1">
                              {dayjs(s.startDate).format("MMM D")}
                              </b>
                              <b>- {dayjs(s.endDate).format("MMM D YYYY")}</b>
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
        )}

        <div className="row">
          <div className=" col col-6">
            <Form.Item
              label="Payment currency"
              name="currency"
              rules={[
                {
                  required: true,
                  message: "Currency is required",
                },
              ]}
            >
              <Select options={currencies} />
            </Form.Item>
          </div>
          <div className=" col col-6">
            {type === "Private" && (
              <Form.Item
                label="Number of hours"
                name="hours"
                style={{width: "100%"}}
                rules={[
                  {
                    required: type === "Private" && true,
                    message: "This field is required",
                  },
                ]}
              >
                <InputNumber width={"100%"} />
              </Form.Item>
            )}
          </div>
        </div>
        <div className="form-outline text-center mt-1">
          <Form.Item>
            <Button
              type="primary"
              htmltype="submit"
              onClick={() => {
                handleFormSubmit();
                handleEverythingOkay(); // Call the new event handler
              }}
            >
              Confirm
            </Button>
            {type !== "" && (
              <Button
                type="dashed"
                className="mx-2"
                icon={<RedoOutlined />}
                onClick={() => reset()}
              ></Button>
            )}
          </Form.Item>
        </div>
      </Form>
      </div>
      <div>Test</div>
    </Carousel>
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

export default connect(mapToStateProps, mapActionToProps)(BookModal);
