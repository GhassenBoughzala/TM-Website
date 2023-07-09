import React from "react";
import { Layout } from "antd";
import { InstagramFilled, FacebookFilled } from "@ant-design/icons";
import TM from "../assets/images/TM.png";
const { Footer } = Layout;

export const HomeFooter = () => {
  return (
    <Footer>
      <div className="container position-sticky">
        <footer className="py-1">
          <div className="row">
            <div className="col-4">
              <img src={TM} alt="Taa Marbouta" />
            </div>

            <div className="col-6 offset-1 mt-5">
              <div className="contenu_footer">
                <h2 className="averiaseriflibre_bold text-start">
                  Taa Marbouta
                </h2>
                <p className="montserrat_regular text-start">
                  Taa Marbouta is a language school based in Carthage, Tunis.
                </p>
                <p className="montserrat_regular text-start">
                  We aim to better connect Tunisia with the world. Our focus is
                  on quality language tuition, immersive experiences, and
                  extra-curricular career development.
                </p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between py-4 my-4 border-top">
            <p>© 2023 Company, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3 w-25">
                <a
                  href="https://www.instagram.com/taa_marbouta/"
                  className="link-dark"
                >
                  <h2>
                    <InstagramFilled />
                  </h2>
                </a>
              </li>
              <li className="ms-3">
                <a
                  href="https://www.facebook.com/TaaMarboutaTunis/"
                  className="link-dark"
                >
                  <h2>
                    <FacebookFilled />
                  </h2>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </Footer>
  );
};

export default HomeFooter;
