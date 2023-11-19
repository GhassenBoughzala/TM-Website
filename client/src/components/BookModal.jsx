/* eslint-disable no-mixed-operators */
import React, { Fragment, useState } from "react";
import { Button, Form, Select, Input, InputNumber } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Subscribe } from "../redux/subs/subsActions";
import { RedoOutlined } from "@ant-design/icons";
import { currencies } from "../helpers/Constants";
import shortid from  "shortid";
import Doc2Pdf from '../../public/images/test/Doc2.pdf';

const { Option } = Select;
const { TextArea } = Input;

export const BookModal = ({ ...props }) => {
  const navTo = useNavigate();
  const currentObj = props.currentObj;
  const [type, setType] = useState("");
  
  const [formSubmissionCompleted, setFormSubmissionCompleted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
        setFormSubmissionCompleted(true);
        //props.setOpenModal(false);
        //navTo("/subscription");
      })
      .catch((errorInfo) => {
        toast.warn("Check your fields !");
        console.log("errorInfo ...", errorInfo);
        setFormSubmissionCompleted(false);
      });
  };
  console.log('formSubmissionCompleted', formSubmissionCompleted);

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

  const [form] = Form.useForm();
  const reset = () => {
    form.resetFields();
    setType("");
  };

  return (
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
          <Form.Item
            label="Select your level"
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
          <Button type="primary" htmltype="submit" 
            onClick={(e) => {
              handleFormSubmit(e);
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
