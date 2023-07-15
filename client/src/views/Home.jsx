import React from "react";
import { Button, Col, Layout, Carousel } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
import { ElfsightWidget } from "react-elfsight-widget";
const { Content } = Layout;

export const Home = () => {
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
        <div>
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
            <div className="card-img-overlay ">
              <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 align">
                  <div className="contenu_header_home">
                    <h1 className="averiaseriflibre_bold">Taa Marbouta</h1>
                    <h2 className="averiaseriflibre_bold">Language Courses</h2>
                    <div className="parag_style">
                      <p className="text-dark">
                        Your gateway to North Africa &#038; the Arabic-speaking
                        world. We teach Modern Standard Arabic, French, Tunisian
                        Arabic, Libyan Arabic, Amazigh &#038; English. Study
                        abroad and internship packages are available.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 align">
                  <img src={HeaderHome} alt="Taa Marbouta" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="category_details">
          <div className="container">
            <div className="row">
              <h2 className="title title_center">Learn Arabic in Tunisia</h2>
              <div className="parag_style">
                <p className="w-75 d-block m-auto">
                  Arabic is one of the six official UN languages and the mother
                  tongue of hundreds of millions of people around the world.
                  Modern Standard Arabic is the language of the media and formal
                  communication. At the Taa Marbouta Language Centre we provide
                  Modern Standard Arabic classes targeting working professionals
                  and students, whether they are at a beginner, intermediate or
                  advanced level. Students can benefit from the flexible
                  curriculum that we have designed, based on their interests and
                  goals. Group classes are available in-person at our centre in
                  Carthage, Tunis, while private classes can be taken online or
                  in-person.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <HomeCourses />
        </div>

        <div className="category_details">
          <div className="container">
            <div className="row">
              <Col span={16}>
                <h2 className="title text-start">Learn French in Tunisia</h2>
                <div className="parag_style text-start">
                  <p className="text-start">
                    French is one of the six official UN languages, a working
                    language for international organisations and institutions
                    the world over, and a key language of European history and
                    culture. And of course, it is often called the language of
                    love. As a former French colony, Tunisia has long been a
                    Francophone country. At the Taa Marbouta Language Centre we
                    provide French classes targeting working professionals and
                    students, whether they are at a beginner, intermediate or
                    advanced level. Group classes are available in-person at our
                    centre in Carthage, Tunis, while private classes can be
                    taken online or in-person.
                  </p>
                  <Button
                    size="large"
                    onClick={() => navTo("/language-courses")}
                    type="primary"
                  >
                    Discover more
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
                <h2 className="title text-end">
                  Learn different Arabic Dialects
                </h2>
                <div className="parag_style text-end">
                  <p className="text-end">
                    While formal Arabic provides an element of linguistic unity
                    throughout the Arab world, dozens of dialects are spoken ‘on
                    the street’ across the region. In reality, many dialects mix
                    both Modern Standard Arabic and local terminology. At the
                    Taa Marbouta Language Centre we teach the Tunisian and
                    Libyan dialects, also known as Darija. Our experienced
                    teachers will give you lessons and courses that are tailored
                    to help you learn Tunisian Arabic and Libyan Arabic
                    effectively. Group classes are available in-person at our
                    centre in Carthage, Tunis, while private classes can be
                    taken online or in-person.
                  </p>
                  <Button
                    size="large"
                    onClick={() => navTo("/language-courses")}
                    type="primary"
                  >
                    Discover more
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
                <h2 className="title title_center">Why Taa Marbouta?</h2>
                <div className="card bg-light h-auto border-0">
                  <img className="card-img" alt="example" src={Land} />
                  <div className="card-img-overlay">
                    <div className="row m-3 display-flex">
                      <div className="d-block m-auto col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <img
                          className="w-50 mx-auto d-block"
                          src={Ev}
                          alt="Quality Team"
                        />
                        <h4 className="text-center blue-text">Quality Team</h4>
                      </div>
                      <div className="d-block m-auto col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <img
                          className="w-50 mx-auto d-block"
                          src={Cul}
                          alt="Quality Team"
                        />
                        <h4 className="text-center blue-text">
                          Cultural Immersion
                        </h4>
                      </div>
                      <div className="d-block m-auto col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <img
                          className="w-50 mx-auto d-block"
                          src={Ex}
                          alt="Quality Team"
                        />
                        <h4 className="text-center blue-text">
                          International Work Experience
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <div className="m-2">
          <div className="container">
            <div className="row">
              <h2 className="title title_center">Why Taa Marbouta?</h2>
              <ElfsightWidget
                widgetId="34f62dcf-0567-4469-b6c6-3f5f35113b3"
                lazy
                modern
              />
              
            </div>
          </div>
        </div>
        <div className="m-2">
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
