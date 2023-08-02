import React from "react";
import { Button, Col, Layout, Carousel } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Footer from "../components/Footer";
import Partners from "../components/Carousel";
import HeaderHome from "../assets/images/header_home.png";
import Fresh from "../assets/images/french.png";
import Libyan from "../assets/images/libyan.png";
import Land from "../assets/images/landscape.png";
import Ev from "../assets/images/evening_classes.png";
import Cul from "../assets/images/culture-1.png";
import Ex from "../assets/images/experience-1.png";
import BG1 from "../assets/images/hbg-1.png";
import BG2 from "../assets/images/hbg-2.png";
import BG3 from "../assets/images/hbg-3.png";
import HomeCourses from "../components/HomeCourses";
import { useTranslation } from "react-i18next";
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

  return (
    <>
      <Content className="container-fluid">
        <Helmet>
          <title>Taa Marbouta</title>
          <meta
            name="description"
            content="Taa Marbouta is a language school based in Carthage, Tunis. We aim to better connect Tunisia with the world."
          />
          <link rel="canonical" href="/" />
        </Helmet>
        <div className="row">
          <div className="card border-0">
            <Carousel
              className="cover-img text-center"
              autoplay
              speed={1000}
              dots={false}
              fade={true}
            >
              <img src={BG1} alt="Taa Marbouta" className="h-50" />
              <img src={BG2} alt="Taa Marbouta" className="h-50" />
              <img src={BG3} alt="Taa Marbouta" className="h-50" />
            </Carousel>
            <div className="card-img-overlay justify-content-center overflow-x-hidden overflow-y-scroll">
              <div className="container my-5">
                <div className="row">
                  <div className="col col-lg-5 col-md-5 col-sm-5 col-xs-3 align">
                    <div className="contenu_header_home">
                      <h1 className="averiaseriflibre_bold blue-text">
                        Taa Marbouta
                      </h1>
                      <h3 className="averiaseriflibre_bold">
                        {t("LanguageCourses")}
                      </h3>
                      <div className="parag_style">
                        <p className="text-dark">{t("HomeP1")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col col-lg-7 col-md-7 col-sm-6 col-xs-6">
                    <img src={HeaderHome} alt="Taa Marbouta" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="category_details row mt-5">
          <div className="container">
            <div className="row">
              <h2 className="title title_center">{t("HomeT2")}</h2>
              <div className="parag_style">
                <p className="w-75 d-block m-auto">{t("HomeP2")}</p>
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
                    onClick={() => navTo("/language-courses")}
                    type="primary"
                  >
                    {t("HomeDiscover")}
                  </Button>
                </div>
              </Col>
              <Col span={8}>
                <img alt="example" src={Fresh} className="w-100" />
              </Col>
            </div>

            <div className="row">
              <Col span={8}>
                <img alt="example" src={Libyan} className="w-100" />
              </Col>
              <Col span={16}>
                <h2 className="title text-end">{t("HomeT4")}</h2>
                <div className="parag_style text-end">
                  <p className="text-end">{t("HomeP4")}</p>
                  <Button
                    size="large"
                    onClick={() => navTo("/language-courses")}
                    type="primary"
                  >
                    {t("HomeDiscover")}
                  </Button>
                </div>
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
                  <img className="card-img" alt="example" src={Land} />
                  <div className="card-img-overlay">
                    <div className="row m-3 display-flex">
                      <div className="col d-block m-auto col-lg-4 col-md-4 col-sm-4 col-xs-4 mb-4">
                        <img
                          width={170}
                          className=" mx-auto d-block"
                          src={Ev}
                          alt="Quality Team"
                        />
                        <h4 className="text-center blue-text">
                          {t("HomeTeam")}
                        </h4>
                      </div>
                      <div className="col d-block m-auto col-lg-4 col-md-4 col-sm-4 col-xs-4 mb-4">
                        <img
                          width={170}
                          className="mx-auto d-block"
                          src={Cul}
                          alt="Quality Team"
                        />
                        <h4 className="text-center blue-text">
                          {t("HomeCul")}
                        </h4>
                      </div>
                      <div className="col d-block m-auto col-lg-4 col-md-4 col-sm-4 col-xs-4 mb-4">
                        <img
                          width={170}
                          className="mx-auto d-block"
                          src={Ex}
                          alt="Quality Team"
                        />
                        <h4 className="text-center blue-text">
                          {t("HomeWork")}
                        </h4>
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
      </Content>
      <Footer />
    </>
  );
};

export default Home;
