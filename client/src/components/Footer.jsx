import React from "react";
import { Layout } from "antd";
import {
  InstagramFilled,
  FacebookFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const { Footer } = Layout;

export const HomeFooter = () => {
  const { t } = useTranslation();

  return (
    <Footer>
      <div className="container position-sticky fixed-footer">
        <footer className="py-1">
          <div className="row">

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <h2 className="averiaseriflibre_bold text-start">Taa Marbouta</h2>
              <p className="montserrat_regular text-start text-dark">
                {t("Footer")}
              </p>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <h2 className="averiaseriflibre_bold">{t("legal_esources")}</h2>
              <ul className="legal_esources">
                <li><Link className="montserrat_regular text-dark pointer" to="/cookie_policy">{t("cookie_policy")}</Link></li>
                <li><Link className="montserrat_regular text-dark pointer" to="/terms_conditions">{t("conditions_utilisation")}</Link></li>
                <li><Link className="montserrat_regular text-dark pointer" to="/privacy_policy">{t("politique_confidentialiter")}</Link></li>
              </ul>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div>
                  <p
                    className="montserrat_regular text-end text-dark pointer"
                    onClick={() =>
                      window.open(
                        "https://wa.me/+21624223422",
                        "_blank",
                        "noreferrer"
                      )
                    }
                  >
                    <i className="bi bi-telephone-fill mx-1"></i>
                    +216 24 223 422
                  </p>
                  <p
                    className="montserrat_regular text-end text-dark pointer"
                    onClick={() =>
                      window.open(
                        "https://wa.me/+21622920666",
                        "_blank",
                        "noreferrer"
                      )
                    }
                  >
                    <i className="bi bi-telephone-fill mx-1"></i>
                    +216 22 920 666
                  </p>
                <p
                  className="montserrat_regular text-end text-dark pointer"
                  onClick={() =>
                    window.open(
                      "mailto:info@taamarbouta.com",
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  <i className="bi bi-envelope-fill mx-1"></i>
                  info@taamarbouta.com
                </p>
                <p
                  className="montserrat_regular text-end text-dark pointer"
                  onClick={() =>
                    window.open(
                      "https://goo.gl/maps/aimTSB3dzKoHUr7c6",
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  <i className="bi bi-geo-alt-fill mx-1"></i>
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
