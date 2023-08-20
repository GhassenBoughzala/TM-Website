import React from "react";
import { Layout } from "antd";
import {
  InstagramFilled,
  FacebookFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
//import TM from "../assets/images/TM.png";
const { Footer } = Layout;

export const HomeFooter = () => {
  const { t } = useTranslation();

  return (
    <Footer>
      <div className="container position-sticky fixed-footer">
        <footer className="py-1">
          <div className="row">
            <div className="col col-lg-6 col-xs-12">
              <h2 className="averiaseriflibre_bold text-start">Taa Marbouta</h2>
              <p className="montserrat_regular text-start">{t("Footer")}</p>
            </div>

            <div className="col col-lg-6 col-xs-12">
              <div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <p className="montserrat_regular text-start">
                    <FontAwesomeIcon icon="fa-solid fa-phone" /> +216 24 223 422
                  </p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <p className="montserrat_regular text-start">
                    <FontAwesomeIcon icon="fa-solid fa-phone" />
                    +216 22 920 666
                  </p>
                </div>
                <p className="montserrat_regular text-start">
                  <FontAwesomeIcon
                    icon="fa-solid fa-envelope"
                    className="mx-1"
                  />
                  info@taamarbouta.com
                </p>
                <p className="montserrat_regular text-start">
                  <FontAwesomeIcon
                    icon="fa-solid fa-location-dot"
                    className="mx-1"
                  />
                  15 Rue Taieb Mehiri, Site archéologique de Carthage 2016
                </p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between py-4 my-4 border-top">
            <p>© 2023 Taa Marbouta</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3 w-25">
                <h2>
                  <InstagramFilled
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/taa_marbouta/",
                        "_blank",
                        "noreferrer"
                      )
                    }
                  />
                </h2>
              </li>
              <li className="ms-3">
                <h2>
                  <FacebookFilled
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/TaaMarboutaTunis/",
                        "_blank",
                        "noreferrer"
                      )
                    }
                  />
                </h2>
              </li>
              <li className="ms-3">
                <h2>
                  <LinkedinFilled
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/company/taa-marbouta-language-centre/",
                        "_blank",
                        "noreferrer"
                      )
                    }
                  />
                </h2>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </Footer>
  );
};

export default HomeFooter;
