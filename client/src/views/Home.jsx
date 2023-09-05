/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useState, useEffect } from "react";
import { Button, Col, Layout, Carousel } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Partners from "../components/Partners";
import HomeCourses from "../components/HomeCourses";
import { useTranslation } from "react-i18next";
import { cloudinaryBaseUrl, imageParams } from "../helpers/Constants";
import { LoadingOutlined } from "@ant-design/icons";
import Loader from "../components/Loader";

const { Content } = Layout;

export const Home = () => {
  const { t } = useTranslation();
  const navTo = useNavigate();
  const cardVariantts = {
    offScreen: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.8, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] },
    },
    onScreen: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] },
    },
  };

  const [state, setstate] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setstate(false);
    }, 1000);
  }, []);

  return (
    <>
      <Helmet>
        <title>Taa Marbouta</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage, Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <Content className="container-fluid">
        <div className="row">
          <div className="card border-0">
            <Carousel
              className="cover-img text-center"
              autoplay
              speed={1000}
              dots={false}
              fade={true}
            >
              <img
                src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/hbg-1.png`}
                alt="Taa Marbouta"
                className="h-50"
                width={"100%"}
                height={"auto"}
              />
              <img
                src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/hbg-2.png`}
                alt="Taa Marbouta"
                className="h-50"
                width={"100%"}
                height={"auto"}
              />
              <img
                src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/hbg-3.png`}
                alt="Taa Marbouta"
                className="h-50"
                width={"100%"}
                height={"auto"}
              />
            </Carousel>
            <div className="card-img-overlay justify-content-center overflow-x-hidden overflow-y-scroll">
              <div className="container my-5">
                <div className="row">
                  <div className="col col-lg-5 col-md-5 col-sm-5 col-xs-3 align">
                    <div className="contenu_header_home">
                      <h1 className="averiaseriflibre_bold blue-text">
                        Taa Marbouta
                      </h1>
                      <h2 className="averiaseriflibre_bold mb-4">
                        {t("LanguageCourses")}
                      </h2>
                      <div className="parag_style">
                        <p className="text-dark">{t("HomeP1")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col col-lg-7 col-md-7 col-sm-6 col-xs-6">
                    <Suspense fallback={<LoadingOutlined />}>
                      <img
                        src={`${cloudinaryBaseUrl}/c_fill,g_auto,f_auto,q_40/v1693852960/TM/header_home.png`}
                        alt="Taa Marbouta"
                        width={"100%"}
                        height={"auto"}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!state ? (
          <Suspense fallback={<Loader />}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="category_details row mt-5"
            >
              <div className="container">
                <div className="row">
                  <h2 className="title title_center">{t("HomeT2")}</h2>
                  <div className="parag_style">
                    <p className="w-75 d-block m-auto">{t("HomeP2")}</p>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="parag_style">
                    <p className="w-75 d-block m-auto">{t("HomeP4")}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="container">
              <HomeCourses />
            </div>
            <div className="category_details row m-2">
              <div className="container">
                <div className="row">
                  <Col span={16}>
                    <h2 className="title text-start">{t("HomeT3")}</h2>
                    <div className="parag_style text-start">
                      <p className="text-start">{t("HomeP3")}</p>
                      <Button
                        size="large"
                        onClick={() => navTo("/learn-french")}
                        type="primary"
                      >
                        {t("HomeDiscover")}
                      </Button>
                    </div>
                  </Col>
                  <Col span={8}>
                    <img
                      alt="example"
                      src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/french.png`}
                      width={"100%"}
                      height={"auto"}
                      className="w-100"
                    />
                  </Col>
                </div>
              </div>
            </div>
            <motion.div
              initial="offScreen"
              whileInView="onScreen"
              viewport={{ once: true, amount: 0.5 }}
              className="why_taamarbouta"
            >
              <div>
                <div className="row">
                  <motion.div
                    variants={cardVariantts}
                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                  >
                    <h2 className="title title_center">{t("HomeWhy")}</h2>
                    <div className="card bg-light h-auto border-0 overflow-x-hidden overflow-y-scroll">
                      <img
                        className="card-img"
                        alt="example"
                        src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/landscape.png`}
                        width={170}
                        height={"auto"}
                      />
                      <div className="card-img-overlay">
                        <div className="row m-3 display-flex">
                          <div className="col d-block m-auto col-lg-4 col-md-4 col-sm-4 col-xs-4 mb-4">
                            <img
                              width={170}
                              height={"auto"}
                              className=" mx-auto d-block"
                              alt="Quality Team"
                              src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/evening_classes.png`}
                            />
                            <h3 className="text-center blue-text">
                              {t("HomeTeam")}
                            </h3>
                          </div>
                          <div className="col d-block m-auto col-lg-4 col-md-4 col-sm-4 col-xs-4 mb-4">
                            <img
                              className="mx-auto d-block"
                              alt="Quality Team"
                              src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/culture-1.png`}
                              width={170}
                              height={"auto"}
                            />
                            <h3 className="text-center blue-text">
                              {t("HomeCul")}
                            </h3>
                          </div>
                          <div className="col d-block m-auto col-lg-4 col-md-4 col-sm-4 col-xs-4 mb-4">
                            <img
                              width={170}
                              height={"auto"}
                              className="mx-auto d-block"
                              src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/experience-1.png`}
                              alt="Quality Team"
                            />
                            <h3 className="text-center blue-text">
                              {t("HomeWork")}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <div className="m-2 mb-5 my-5">
              <div className="container">
                <div className="row">
                  <Partners />
                </div>
              </div>
            </div>
          </Suspense>
        ) : (
          <Loader />
        )}
      </Content>
      <Footer />
    </>
  );
};

export default Home;
