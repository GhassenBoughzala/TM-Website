import React, { useState, Fragment } from "react";
import Footer from "../components/Footer";
import { Layout, Modal, Carousel, Image, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const { Content } = Layout;
export const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <Content>
      <Helmet>
        <title>{t("SLP1")}</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/contactus" />
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
