import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import SCO from "../assets/images/sco.jpeg";
import { Layout } from "antd";

const { Content } = Layout;
export const Scholarships = () => {
  const { t } = useTranslation();

  return (
    <Content>
      <Helmet>
        <title>Scholarships</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/scholarships" />
      </Helmet>
      <div className="page_style full_espace_padding overflow-x-hidden overflow-y-scroll">
        <div className="container-fluid">
          <div className="row">
            <h1 className="titre">{t("sco-T")}</h1>
            <h4 className="blue-text">{t("sco-ovt")}</h4>
            <div className="parag_style style_link mb-4">
              <p className="fs-6">{t("sco-ov")}</p>
            </div>
            <div className="mb-3 col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <h4 className="blue-text">{t("sco-objt")}</h4>
              <div className="parag_style style_link text-start">
                <ul class="list-unstyled text-start">
                  <li>
                    <p>{t("sco-objt2")} </p>
                    <ul>
                      <li>
                        <p>1- {t("sco-obj1")} </p>
                      </li>
                      <li>
                        <p>2- {t("sco-obj2")} </p>
                      </li>
                      <li>
                        <p>3- {t("sco-obj3")} </p>
                      </li>
                      <li>
                        <p>4- {t("sco-obj4")} </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-3 col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <h4 className="blue-text">{t("sco-elt")}</h4>
              <div className="parag_style style_link text-start">
                <ul class="list-unstyled text-start">
                  <li>
                    <ul>
                      <li>
                        <p>1- {t("sco-elt1")} </p>
                      </li>
                      <li>
                        <p>2- {t("sco-elt2")} </p>
                      </li>
                      <li>
                        <p>3- {t("sco-elt3")} </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <h4 className="yellow-text">{t("sco-howt")}</h4>
              <div className="parag_style style_link mb-4">
                <p className="fs-6">{t("sco-how")}</p>
              </div>
              <h4 className="blue-text">{t("sco-ft")}</h4>
              <div className="parag_style style_link mb-4">
                <p className="fs-6">{t("sco-f1")}</p>
                <p className="fs-6">{t("sco-f2")}</p>
              </div>
            </div>
            <div className="row">
              <h4 className="yellow-text">{t("sco-abt")}</h4>
              <div className="mb-3 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div className="parag_style style_link mb-4">
                  <p className="fs-6">{t("sco-abt-1")}</p>
                  <p className="fs-6">{t("sco-abt-2")}</p>
                  <p className="fs-6">{t("sco-abt-3")}</p>
                </div>
              </div>
              <div className="mb-3 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <img alt="example" src={SCO} className="w-100 rounded my-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Content>
  );
};

export default Scholarships;
