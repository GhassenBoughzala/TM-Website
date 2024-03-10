/* eslint-disable no-mixed-operators */
import React, { Fragment, useState, useEffect, useRef } from "react";
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
import Doc2Pdf from '../../public/images/test/Doc2.pdf';
import Doc4Pdf from '../../public/images/test/Doc4.pdf';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

let TypeValues;
let levelValues;
let hoursValues;
let currencyValues;
let sessionsValues;
let indexSlide = {idx:0};
const stripePromise = loadStripe('pk_test_51NY6GVFCnlnePsBKOF4bYfPkaZDZx31ECzpts3G0GHb3zbvJ2cEYtDkYVC9fBAqIThFRfV3Y3Uu1wHM3J1o8TcSk00XQST1kHL');

const BookModalArabicCmp = ({ ...props }) => {
  const { t } = useTranslation();
  const navTo = useNavigate();
  const currentObj = props.currentObj;
  const [type, setType] = useState("");
  const [showLevelMessage, setShowLevelMessage] = useState(false);

  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);  

  const audioRef = useRef(null); // Create a ref for the audio element
  const videoRef1 = useRef(null); // Create a ref for the first video element
  const videoRef2 = useRef(null); // Create a ref for the second video element
  const carouselRef = useRef(); 
  
  
  useEffect(() => {
    const playMedia = () => {
      if (isModal1Open) {
        audioRef.current.play();
      } else if (isModal2Open) {
        videoRef1.current.play();
      } else if (isModal3Open) {
        videoRef2.current.play();
      }
    };

    const pauseMedia = () => {
      if (isModal1Open) {
        audioRef.current.pause();
      } else if (isModal2Open) {
        videoRef1.current.pause();
      } else if (isModal3Open) {
        videoRef2.current.pause();
      }
    };

    playMedia();

    return () => {
      // Clean up and pause media when component is unmounted
      pauseMedia();
    };
  }, [isModal1Open, isModal2Open, isModal3Open]);  

  const levelChange = (value) => {
    // Check if the selected level is not "Beginner"
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
        } else {
          indexSlide.idx = 1;
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

  const showModal1 = () => {
    setIsModal1Open(true);
  };

  const showModal2 = () => {
    setIsModal2Open(true);
  };

  const showModal3 = () => {
    setIsModal3Open(true);
  };

  const handleCancel = () => {
    setIsModal1Open(false);
    setIsModal2Open(false);
    setIsModal3Open(false);
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
          price_cour = 19 * hoursValues;
        } else if (currencyValues == 'EUR') {
          price_cour = 23 * hoursValues;
        } else {
          price_cour = 25 * hoursValues;
        }
      } else if (TypeValues == "Intensive") {
        if (sessionsValues == 1) {
          if (currencyValues == 'GBP') {
            price_cour = 775;
          } else if (currencyValues == 'EUR') {
            price_cour = 899;
          } else {
            price_cour = 975;
          }
        }
        else if (sessionsValues == 2) {
          if (currencyValues == 'GBP') {
            price_cour = 1470;
          } else if (currencyValues == 'EUR') {
            price_cour = 1730;
          } else {
            price_cour = 1900;
          }
        }
        else if (sessionsValues > 2) {
          if (currencyValues == 'GBP') {
            price_cour = 735 * sessionsValues;
          } else if (currencyValues == 'EUR') {
            price_cour = 865 * sessionsValues;
          } else {
            price_cour = 950 * sessionsValues;
          }
        }
      }

      // Passer les valeurs à votre backend
      const response = await axios.post('/api/api-payment/apiPay', {
        type: TypeValues,
        price: price_cour,
        level: levelValues,
        hours: hoursValues,
        sessions: sessionsValues,
        currency: currencyValues,
        name_cour: 'Book Arabic',
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
                id="id_cours_modern_standard_arabic"
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
          <img src="/images/alert.jpg" className="img_alert" />
          <h2 className="txt_level_1">{t("test-txt")}</h2>
          <ul className="test_notice">
            <li>{t("test-txt-1")}</li>
            <li>{t("test-txt-2")}</li>
          </ul>

          <Button
            className="subs-btn mt-5 m-auto btn_download"
            size="large"
            type="text"
            onClick={() => {
              carouselRef.current.next();
            }}
          >
            {t("btn-test")}
          </Button>

        </div>

        <div>
          <h2 className="txt_level_1">{t("txt_level_1")}</h2>
          <a
            href={Doc2Pdf}
            download="Test 1"
            target="_blank"
            rel="noreferrer"
            className="btn_download m-auto"
          >
            {t("click_here")}
          </a>
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
          <h2 className="txt_level_1">{t("txt_level_2")}</h2>
          
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <Button className="box_listening" onClick={(event) => { 
                event.stopPropagation(); // Add this line
                showModal1();
              }}
            >
                <img src="images/test/audio.png" alt="IconAudio" />          
              </Button>
              <Modal className="modal_test" open={isModal1Open} onCancel={handleCancel} footer={null}>
              <audio controls ref={audioRef}>
                <source src="images/test/audio1.mp3" type="audio/mp3" />
                Your browser does not support the audio tag.
              </audio>
              </Modal>
            </div>
          
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <Button className="box_listening" onClick={showModal2}>
                <img src="images/test/video.png" alt="IconVideo" />          
              </Button>
              <Modal className="modal_test" open={isModal2Open} onCancel={handleCancel} footer={null}>
              <video controls ref={videoRef1} width="100%">
                <source src="images/test/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              </Modal>
            </div>
          
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <Button className="box_listening" onClick={showModal3}>
                <img src="images/test/video.png" alt="IconVideo" />          
              </Button>
              <Modal className="modal_test" open={isModal3Open} onCancel={handleCancel} footer={null}>
                <video controls ref={videoRef2} width="100%">
                  <source src="images/test/video2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Modal>
            </div>
          </div>

          <a
            href={Doc4Pdf}
            download="Test 2"
            target="_blank"
            rel="noreferrer"
            className="btn_download m-auto pt-3"
          >
            {t("click_here")}
          </a>
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
  isAuth: state.auth.isAuthenticated,
  loadingSub: state.subs.loading_create,
  msg: state.subs.codeMsg,
});

const BookModalArabic = connect(mapToStateProps, mapActionToProps)(BookModalArabicCmp);
export {
  indexSlide,
  BookModalArabic
};