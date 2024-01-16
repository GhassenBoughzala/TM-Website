import React, { useRef, useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import TextArea from "antd/es/input/TextArea";
import { Button, Form, Input, Upload, Layout, Carousel } from "antd";
import { CaretLeftOutlined, CaretRightOutlined, UploadOutlined } from "@ant-design/icons";
import { cloudinaryBaseUrl, imageParams } from "../helpers/Constants";
import { toast } from "react-toastify";
import Sticky from 'react-sticky-el';
import axios from 'axios';

const { Content } = Layout;
export const Scholarships = () => {

  const formRef = useRef();
  const videoRef = useRef();
  const carouselRef = useRef(); 
  const applyNowRef = useRef();
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  
  const [isApplyNowVisible, setApplyNowVisible] = useState(true);
  const [removeUpload, setRemoveUpload] = useState(false);

  const carousel_prev = () => {
    carouselRef.current.prev();
  }

  const carousel_next = () => {
    carouselRef.current.next();
  }
  

  useEffect(() => {
    const videoElement = videoRef.current;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold based on your needs
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(videoElement);

    const formElement = formRef.current;
    const formOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const formCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setApplyNowVisible(true);
        } else {
          setApplyNowVisible(false);
        }
      });
    };

    const formObserver = new IntersectionObserver(formCallback, formOptions);
    formObserver.observe(formElement);

    return () => {
      observer.unobserve(videoElement);
      formObserver.unobserve(formElement);
    };
  }, []); // Run effect only once on mount

  const handleApplyNowClick = () => {
    // Scroll to the form_page section when Apply Now is clicked
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [cvFile, setCvFile] = useState({ fileList: [] });
  const [lettreMotivationFile, setLettreMotivationFile] = useState({ fileList: [] });


  const handleCvUpload = (info) => {
    let fileList = [...info.fileList];
    setCvFile({ fileList });
    console.log('setCvFile', fileList);
  };

  const handleBeforeUploadCV = (file) => {
    return false;
  };
  
  const handleLettreMotivationUpload = (info) => {
    let fileList = [...info.fileList];
    setLettreMotivationFile({ fileList });
    console.log('setCvFile', fileList);
  };

  const handleBeforeUploadLettre = (file) => {
    return false;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    form
      .validateFields()
      .then((values) => {
        console.log('Form values:', values);
        var formData = new FormData();
        
        Object.keys(values).forEach((e) => formData.append(e, values[e] && values[e].file || values[e]))
        
        axios.post('/api/sholarship/saveForm', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
          console.log('Server response:', response.data);
          toast.success(response.data.message);
          
          setCvFile({ fileList: [] });
          setLettreMotivationFile({ fileList: [] });
          setRemoveUpload(true);

          form.resetFields();
        })
        .catch(error => {
          console.error('Error sending form data to server:', error);
        });
      })
      .catch((errorInfo) => {
        console.log("Form validation error:", errorInfo);
      });
  };
 

  return (
    <>
      <Helmet>
        <title>Scholarships</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/scholarships" />
      </Helmet>
      <Content>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="page_style scholarships_page"
        >
          <button ref={applyNowRef} onClick={handleApplyNowClick} className={`apply_now ${isApplyNowVisible ? 'opacityShow' : ''}`}>
            {t("apply_now")}
          </button>

          <div className="container-fluid">
            <div className="full_espace_padding">
              
              <div className="banner_header">
                <img src="/images/banner.webp" className="banner_header_pc" />
                <img src="/images/banner_mobile.webp" className="banner_header_mobile" />
              </div>

              <div className="box_title">
                <div className="titre_page_one">
                  <h1>{t("sco-abt-new")}</h1>
                  <h2 className="blue-text">{t("fully-funded")} | <span className="yellow-text">{t("deadline")}: 31/03/2024</span></h2>
                </div>
                <button 
                  onClick={handleApplyNowClick} 
                  type="button" 
                  className={`apply_now_static ant-btn css-12jzuas ant-btn-text ant-btn-lg subs-btn style_${i18n.language}`}
                ><span>{t("apply_now")}</span></button>
              </div>

              <div className="slide_block">
                <div className="row">
                  
                  <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-slide">
                    <h3>{t("sco-ovt")}</h3>
                    <div className="parag_style style_link">
                      <p>"{t("sco-ovt-new")}"</p>
                    </div>
                    
                    <h3>{t("scholarship_benefits")}</h3>
                    <div className="parag_style style_link">
                      <p><strong>{t("sb-1-strong")}</strong> {t("sb-1")}</p>
                      <p><strong>{t("sb-2-strong")}</strong> {t("sb-2")}</p>
                      <p><strong>{t("sb-3-strong")}</strong> {t("sb-3")}</p>
                      <p><strong>{t("sb-4-strong")}</strong> {t("sb-4")}</p>
                    </div>
                    
                    <h3>{t("sco-elt")}</h3>
                    <ul>
                      <li>{t("sco-elt1")}</li>
                      <li>{t("sco-elt2")}</li>
                      <li>{t("sco-elt3")}</li>
                    </ul>

                  </div>

                  <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 col-slide">
                  <Sticky boundaryElement=".col-slide" hideOnBoundaryHit={false}>
                    <div className="carousel_block">
                      <Carousel
                        autoplay 
                        dots={false} 
                        speed={1500} 
                        slidesToShow={1} 
                        ref={carouselRef}
                        autoplaySpeed={5000} 
                        className="carousel_box"
                      >
                        <div><img alt="example" src="/images/slides/1.webp" width={"100%"} /></div>
                        <div><img alt="example" src="/images/slides/2.webp" width={"100%"} /></div>
                        <div><img alt="example" src="/images/slides/3.webp" width={"100%"} /></div>
                      </Carousel>
                      <button className="carousel_prev" onClick={carousel_prev}><CaretLeftOutlined /></button>
                      <button className="carousel_next" onClick={carousel_next}><CaretRightOutlined /></button>
                    </div>
                    </Sticky>
                  </div>
                </div>
              </div>
            </div>

            <div className="video_block full_espace_padding">
              <div className="row">  

                <div className="col-xs-12">
                    <h2>{t("sco-abt")}</h2>
                    <div className="parag_style style_link">
                      <p>{t("about-ms-1")}</p>
                      <p>{t("about-ms-2")}</p>
                      <p>{t("about-ms-3")}</p>
                      <p>{t("about-ms-4")}</p>
                    </div>
                </div>            
                
                <div className="col-xs-12">
                  <video ref={videoRef} height="360" controls autoPlay muted>
                    <source src="/images/malek.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>  

              </div>
            </div>

            <div ref={formRef} className="form_page text-center justify-content-center">

                <img
                  src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/logo_footer.png`}
                  alt="TaaMarbouta"
                  className="logo_tm"
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
                        label="Téléversez votre CV"
                        name='file_cv'
                        rules={[
                          {
                            required: true,
                            message: 'Téléversez votre CV.',
                          },
                        ]}
                      >
                        <Upload
                          accept='.doc,.docx,application/pdf'
                          beforeUpload={handleBeforeUploadCV}
                          onChange={handleCvUpload}
                          showUploadList={{ removeUpload }}
                          maxCount={1}
                          listType='file'
                          fileList={cvFile.fileList}
                        >
                          <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                      </Form.Item>
                      
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-outline text-start">                    
                      <Form.Item
                        label="Téléversez votre Lettre de motivation"
                        name='file_lettreMotivation'
                        rules={[
                          {
                            required: true,
                            message: 'Téléversez votre lettre de motivation.',
                          },
                        ]}
                      >
                        <Upload
                          accept='.doc,.docx,application/pdf'
                          beforeUpload={handleBeforeUploadLettre}
                          onChange={handleLettreMotivationUpload}
                          showUploadList={{ removeUpload }}
                          maxCount={1}
                          listType='file'
                          fileList={lettreMotivationFile.fileList}
                        >
                          <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                      </Form.Item>
                      
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-outline text-start">
                      <Form.Item
                        label="Your message"
                        name="msg"
                        rules={[
                          {
                            required: false,
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

          </div>

        </motion.div>
        <Footer />
      </Content>
    </>
  );
};

export default Scholarships;
