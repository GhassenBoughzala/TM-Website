import React from "react";
import { Layout, Collapse } from "antd";
import TM from "../assets/images/logo_footer.png";
import Land from "../assets/images/landscape.png";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
const { Content } = Layout;

export const About = () => {
  const { t } = useTranslation();
  const items = [
    {
      key: "1",
      label: <p className="montserrat_regular text-start">{t("AboutT1")}</p>,
      children: (
        <>
          <p>{t("AboutP4")}</p>
          <p>{t("AboutP5")}</p>
          <p>{t("AboutP6")}</p>
        </>
      ),
    },
  ];
  return (
    <>
      <Content className="container-fluid">
        <Helmet>
          <title>About Taa Marbouta</title>
          <meta
            name="description"
            content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
          />
          <link rel="canonical" href="/about" />
        </Helmet>
        <div className="container">
          <div className="aboutus_page full_espace_padding">
            <div className="container-fluid">
              <h1 className="titre mt-5">{t("About")} Taa Marbouta</h1>
              <div className="row">
                <div className="col col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="parag_style style_link text-start">
                    <p>{t("AboutP1")}</p>
                    <p>{t("AboutP2")}</p>
                  </div>
                </div>

                <div className="col col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center my-3">
                  <img src={TM} alt="About" style={{ width: 150 }} />
                </div>
              </div>

              <div className="row parag_style style_link text-start">
                <p>{t("AboutP3")}</p>
                <Collapse ghost items={items} />
              </div>
            </div>
          </div>
          <div className="m-2">
            <div className="container">
              <div className="row">
                <h2 className="title title_center">{t("Testimonials")}</h2>
                <div className="elfsight-app-34f62dcf-0567-4469-b6c6-3f5f35113b3a"></div>
              </div>
            </div>
          </div>
          <div className="our_philosphy full_espace_padding">
            <div className="container">
              <div className="row">
                <h2 className="title title_center">{t("AboutT2")}</h2>
                <div className="parag_style">
                  <p>{t("AboutP7")}</p>
                </div>
                <div className="card bg-light h-auto border-0 overflow-y-scroll overflow-x-hidden">
                  <img className="card-img" alt="example" src={Land} />
                  <div className="card-img-overlay">
                    <div className="row m-3 display-flex">
                      <div className="d-block col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <h4 className="text-center yellow-text">
                          {t("AboutT2.1")}
                        </h4>
                        <div className="parag_style">
                          <p>{t("AboutT2P")}</p>
                        </div>
                      </div>
                      <div className="d-block col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <h4 className="text-center yellow-text">
                          {t("AboutT2.2")}
                        </h4>
                        <div className="parag_style">
                          <p>{t("AboutT2P2")}</p>
                        </div>
                      </div>
                      <div className="d-block col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <h4 className="text-center yellow-text">
                          {t("AboutT2.3")}
                        </h4>
                        <div className="parag_style">
                          <p>{t("AboutT2P3")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </>
  );
};

export default About;
