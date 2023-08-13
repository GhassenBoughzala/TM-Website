import React, { useState, Fragment } from "react";
import Footer from "../components/Footer";
import { Layout, Modal, Carousel, Image, Button } from "antd";
import { motion } from "framer-motion";
import Accommodation from "../components/Modals/Accomodation";
import Travel from "../components/Modals/Travel";
import LivingInTunis from "../components/Modals/Tunis";
import Work from "../components/Modals/Work";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";

const { Content } = Layout;
export const ContactUs = () => {
  const { t } = useTranslation();
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const imagesW = require.context("../assets/images/student/Course/W", true);
  const imagesListW = imagesW.keys().map((image) => imagesW(image));
  const imagesH = require.context("../assets/images/student/Course/H", true);
  const imagesListH = imagesH.keys().map((image) => imagesH(image));

  return (
    <Content>
      <Helmet>
        <title>Contact us</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/student-life" />
      </Helmet>
      <div className="page_style full_espace_padding">
        <div className="container-fluid">
          <div className="row">
            <h1 className="titre">{t("StudentLife")}</h1>
            <div className="mb-3 col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className="parag_style style_link">
                <p>{t("SLP1")} </p>
                <p>{t("SLP2")} </p>
                <p>{t("SLP3")} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Content>
  );
};

export default ContactUs;
