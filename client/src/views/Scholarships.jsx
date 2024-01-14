import React, { useRef, useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import TextArea from "antd/es/input/TextArea";
import { Button, Form, Input, Upload, Layout, Carousel } from "antd";
import { CaretLeftOutlined, CaretRightOutlined, UploadOutlined } from "@ant-design/icons";
import { cloudinaryBaseUrl, imageParams } from "../helpers/Constants";
import axios from 'axios';

const { Content } = Layout;
export const Scholarships = () => {

  const videoRef = useRef();
  const carouselRef = useRef(); 
  const [form] = Form.useForm();
  const { t } = useTranslation();

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

    return () => {
      observer.unobserve(videoElement);
    };
  }, []); // Run effect only once on mount

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
          // Handle the response from the server as needed
          // For example, you can show a success message to the user
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
          className="page_style overflow-x-hidden overflow-y-scroll scholarships_page"
        >
          
          <div className="container-fluid">
            <div className="full_espace_padding">
              <div className="banner_header">
                <img src="/images/banner.png" />
              </div>

              <div className="titre_page_one">
                <h1>Malek Sghiri Scholarships</h1>
                <h2 className="blue-text">Fully-Funded | <span className="yellow-text">Deadline: 15/01/2024</span></h2>
              </div>

              <div className="slide_block">
                <div className="row">
                  
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="parag_style style_link">
                      <p>{t("sco-ov")}</p>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
                          <div><img alt="example" src="/images/slides/1.png" width={"100%"} /></div>
                          <div><img alt="example" src="/images/slides/2.png" width={"100%"} /></div>
                          <div><img alt="example" src="/images/slides/3.png" width={"100%"} /></div>
                      </Carousel>
                      <button className="carousel_prev" onClick={carousel_prev}><CaretLeftOutlined /></button>
                      <button className="carousel_next" onClick={carousel_next}><CaretRightOutlined /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="video_block full_espace_padding">
              <div className="row">             
                
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <video ref={videoRef} height="360" controls autoPlay muted>
                    <source src="/images/malek.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <h2 className="blue-text">Eligibility creator</h2>              
                  <ul>
                    <li>Between 18 and 35 years old.</li>
                    <li>From all countries and territories.</li>
                    <li>Demonstrable interest in human rights, anti-corruption & civil society</li>
                  </ul>
                </div>   

              </div>
            </div>

            <div className="form_page text-center justify-content-center">

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
