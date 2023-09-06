/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Col, Layout, Carousel } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Partners from "../components/Partners";
import HomeCourses from "../components/HomeCourses";
import { useTranslation } from "react-i18next";
import { cloudinaryBaseUrl, imageParams } from "../helpers/Constants";

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

  const firstImage = `${cloudinaryBaseUrl}/c_fill,g_auto,f_auto,q_70/v1693852960/TM/header_home.png`;
  const [imgsLoaded, setImgsLoaded] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const handleWindowSizeChange = () => {
          setWidth(window.innerWidth);
  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      if(width <= 768){
        setIsMobile(true)
      }else setIsMobile(false)
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }    
  }, [width]);

    
  
  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image);
          }, 100);

        loadImg.onerror = (err) => reject(err);
      });
    };
    loadImage(firstImage)
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load image", err));
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
                width={"100%"}
                height={"600px"}
              />
              <img
                src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/hbg-2.png`}
                alt="Taa Marbouta"
                width={"100%"}
                height={"600px"}
              />
            </Carousel>
            <div className="card-img-overlay justify-content-center mt-4">
              <div className="container">
                <div className="row">
                  <div className="col col-lg-5 col-md-12 col-sm-12 col-12 align">
                    <div className="contenu_header_home mt-3">
                      <h1 className="averiaseriflibre_bold blue-text">
                        Taa Marbouta
                      </h1>
                      <h2 className="averiaseriflibre_bold">
                        {t("LanguageCourses")}
                      </h2>
                      <div className="parag_style">
                        <p className="text-dark">{t("HomeP1")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col col-lg-7 col-md-12 col-sm-12 col-12 order-lg-last order-first">
                    {imgsLoaded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
                        <img
                          src={firstImage}
                          alt="Taa Marbouta"
                          width={"100%"}
                          height={"auto"}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="category_details row mt-5">
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
          </div>
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
                <motion.div variants={cardVariantts}>
                  <h2 className="title title_center">{t("HomeWhy")}</h2>
                  <div className="card bg-light h-auto border-0">
                    <img
                      className={`card-img  ${isMobile ? ("mobile-cover-margin"):("")}`}
                      alt="example"
                      src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/landscape.png`}
                      width={270}
                      height={"500px"}
                    />
                    <div className="card-img-overlay">
                      <div className="row m-3 justify-content-center">
                        <div className="col d-block m-auto col-lg-4 col-md-4 col-sm-4 col-12 mb-4">
                          <img
                            width={170}
                            height={170}
                            className=" mx-auto d-block"
                            alt="Quality Team"
                            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/evening_classes.png`}
                          />
                          <h3 className="text-center blue-text">
                            {t("HomeTeam")}
                          </h3>
                        </div>
                        <div className="col d-block m-auto col-lg-4 col-md-4 col-sm-12 col-12 mb-4">
                          <img
                            className="mx-auto d-block"
                            alt="Quality Team"
                            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/culture-1.png`}
                            width={170}
                            height={170}
                          />
                          <h3 className="text-center blue-text">
                            {t("HomeCul")}
                          </h3>
                        </div>
                        <div className="col d-block m-auto col-lg-4 col-md-4 col-sm-12 col-12 ">
                          <img
                            width={170}
                            height={170}
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
        </div>
      </Content>
      <Footer />
    </>
  );
};

export default Home;
