/* eslint-disable no-mixed-operators */
import React, { Fragment, useState, useRef } from "react";
import { Button, Form, Select, Input, InputNumber, Carousel, Modal } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Subscribe } from "../redux/subs/subsActions";
import { RedoOutlined } from "@ant-design/icons";
import { currencies } from "../helpers/Constants";
import shortid from  "shortid";
import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";
import {indexSlide}  from "./BookModalArabic";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';


const { Option } = Select;
const { TextArea } = Input;


let TypeValues;
let levelValues;
let hoursValues;
let currencyValues;
let sessionsValues;
const stripePromise = loadStripe('pk_test_51NY6GVFCnlnePsBKOF4bYfPkaZDZx31ECzpts3G0GHb3zbvJ2cEYtDkYVC9fBAqIThFRfV3Y3Uu1wHM3J1o8TcSk00XQST1kHL');

export const BookModalFrench = ({ ...props }) => {
  const { t } = useTranslation();
  const navTo = useNavigate();
  const currentObj = props.currentObj;
  const [type, setType] = useState("");
  const [showLevelMessage, setShowLevelMessage] = useState(false);
  const carouselRef = useRef(); 

  const levelChange = (value) => {
    setShowLevelMessage(value !== "Beginner");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        TypeValues = type;
        levelValues = values.level;
        hoursValues = values.hours;
        currencyValues = values.currency;
        sessionsValues = values.sessions?.length ?? 0;
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

        toast.success(t('SubsResult-1'));
        if (levelValues && levelValues !== "Beginner") {  
          indexSlide.idx = 1;
          console.log('getValues inside handleFormSubmit', levelValues);
        } else {
          indexSlide.idx = 1;
          //navTo("/subscription");
        }
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

  const [form] = Form.useForm();
  const reset = () => {
    form.resetFields();
    setType("");
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('/images/test/french/Test-de-niveau.docx');
      const blob = await response.blob();
      saveAs(blob, 'test french.docx');
    } catch (error) {
      console.error('Error fetching the file:', error);
    }
  };

  const makePayment = async (event) => {
    try {
      
      let price_cour = 0;
      if (TypeValues == "Evening") {
        if (currencyValues == 'GBP') {
          price_cour = 260;
        } else if (currencyValues == 'EUR') {
          price_cour = 300;
        } else {
          price_cour = 330;
        }
      } else if (TypeValues == "Private") {       
        if (currencyValues == 'GBP') {
          price_cour = 18.85 * hoursValues;
        } else if (currencyValues == 'EUR') {
          price_cour = 22.15 * hoursValues;
        } else {
          price_cour = 24.24 * hoursValues;
        }
      }

      // Passer les valeurs à votre backend
      const response = await axios.post('/api/api-payment/apiPay', {
        type: TypeValues,
        price: price_cour,
        level: levelValues,
        hours: hoursValues,
        currency: currencyValues,
        sessions: sessionsValues,
        name_cour: 'Book French',
      });

      const session = response.data;

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div>
    { levelValues !== "Beginner" ?
    <Carousel speed={1500} slidesToShow={1} dots={false} ref={carouselRef} initialSlide={indexSlide.idx}>
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
              {/* <div className="col-lg-4 col-xs-12 my-1 text-center">
                <Button
                  type={`${type === "Intensive" ? "primary" : "default"}`}
                  onClick={() => setType("Intensive")}
                >
                  Intensive Classes
                </Button>
              </div> */}
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
              id="id_cours_french"
              type="primary"
              htmltype="submit"
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
      </div>
      <div>
        <h2 className="txt_level_1">{t("txt_level_1")}</h2>
        
        <Button
          className="btn_download url_link m-auto"
          onClick={handleDownload}
        >
          {t("click_here")}
        </Button>

        <Button
          className="subs-btn mt-5 m-auto btn_download"
          size="large"
          type="text"
          onClick={() => {
            carouselRef.current.next();
          }}
        >
          {t("terminer")}
        </Button>
      </div>
      <div>
        
        <a
          href="#"
          className="back_left"
          size="large"
          type="text"
          onClick={() => {
            carouselRef.current.prev();
          }}
        >return
        </a>
        <h2 className="txt_level_1">{t("txt_level_end")}</h2>
        <a 
          href="mailto:info@taamarbouta.com"
          className="btn_download m-auto email_info"
        >
          info@taamarbouta.com
        </a>
        <Button
          className="subs-btn mt-5 m-auto table_style"
          size="large"
          type="text"
          onClick={makePayment}
        >
          Please Pay Here
        </Button>
      </div>
    </Carousel>
    : 
    <div>
      <Carousel speed={1500} slidesToShow={1} dots={false} ref={carouselRef}>
        <div className="pb-5">       
          <p className="parag_style_beginner">{t("msg_pay")}</p>  
          <p className="parag_style_beginner">{t("msg_pay1")}</p> 
          <Button
            className="subs-btn mt-5 m-auto table_style"
            size="large"
            type="text"
            onClick={makePayment}
          >
            Please Pay Here
          </Button>
        </div>
      </Carousel>
    </div>
    }
    </div>
  );
};

const mapActionToProps = {
  AddSub: Subscribe,
};
const mapToStateProps = (state) => ({
  //isAuth: state.auth.isAuthenticated,
  //loadingSub: state.subs.loading_create,
  msg: state.subs.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(BookModalFrench);
