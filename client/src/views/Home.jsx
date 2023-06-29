import React from "react";
import { Card, Col, Layout, Row } from "antd";
import { motion } from "framer-motion";

import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import HeaderHome from "../assets/images/header_home.png";
import Arabic from "../assets/images/arabic.png";
import StudyArabic from "../assets/images/studyarabic.png";
import Fresh from "../assets/images/french.png";
import Libyan from "../assets/images/libyan.png";
import Land from "../assets/images/landscape.png";
import Ev from "../assets/images/evening_classes.png";
import Cul from "../assets/images/culture-1.png";
import Ex from "../assets/images/experience-1.png";
const { Content } = Layout;

export const Home = () => {
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

  const learnVariantsCard = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <>
    <Content className="container-fluid">
      <div className="header_home">
        <div className="container">
          <Row>
            <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 align">
              <div className="contenu_header_home">
                <h1 className="averiaseriflibre_bold">Taa Marbouta</h1>
                <h2 className="averiaseriflibre_bold">Language Courses</h2>
                <div className="parag_style">
                  <p>
                    Your gateway to North Africa &#038; the Arabic-speaking
                    world. We teach Modern Standard Arabic, French, Tunisian
                    Arabic, Libyan Arabic, Amazigh &#038; English. Study abroad
                    and internship packages are available.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 align">
              <img src={HeaderHome} alt="Taa Marbouta" />
            </div>
          </Row>
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
                Modern Standard Arabic classNamees targeting working
                professionals and students, whether they are at a beginner,
                intermediate or advanced level. Students can benefit from the
                flexible curriculum that we have designed, based on their
                interests and goals. Group classNamees are available in-person
                at our centre in Carthage, Tunis, while private classNamees can
                be taken online or in-person.
              </p>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
        className="list_learn"
      >
        <div className="container">
          <motion.div variants={learnVariantsCard} className="row">
            <div className="mb-3 col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <Card hoverable cover={<img alt="example" src={Arabic} />}>
                <h2 className="montserrat_bold">Evening class</h2>
                <div className="parag_style">
                  <p>
                    If you are a working professional or simply have other
                    commitments during the day, these evening courses are for
                    you.
                  </p>
                </div>
              </Card>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <Card hoverable cover={<img alt="example" src={StudyArabic} />}>
                <h2 className="montserrat_bold">
                  Study Arabic and Work Abroad
                </h2>
                <div className="parag_style">
                  <p>
                    This option includes twenty hours of language study per week
                    and is perfect if you are also looking to gain real-world
                    work.
                  </p>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className="category_details">
        <div className="container">
          <div className="row mb-5">
            <Col span={16}>
              <h2 className="title text-start">Learn French in Tunisia</h2>
              <div className="parag_style">
                <p className="text-start">
                  French is one of the six official UN languages, a working
                  language for international organisations and institutions the
                  world over, and a key language of European history and
                  culture. And of course, it is often called the language of
                  love. As a former French colony, Tunisia has long been a
                  Francophone country. At the Taa Marbouta Language Centre we
                  provide French classNamees targeting working professionals and
                  students, whether they are at a beginner, intermediate or
                  advanced level. Group classNamees are available in-person at
                  our centre in Carthage, Tunis, while private classNamees can
                  be taken online or in-person.
                </p>
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
              <div className="parag_style">
                <p className="text-end">
                  While formal Arabic provides an element of linguistic unity
                  throughout the Arab world, dozens of dialects are spoken ‘on
                  the street’ across the region. In reality, many dialects mix
                  both Modern Standard Arabic and local terminology. At the Taa
                  Marbouta Language Centre we teach the Tunisian and Libyan
                  dialects, also known as Darija. Our experienced teachers will
                  give you lessons and courses that are tailored to help you
                  learn Tunisian Arabic and Libyan Arabic effectively. Group
                  classNamees are available in-person at our centre in Carthage,
                  Tunis, while private classNamees can be taken online or
                  in-person.
                </p>
              </div>
            </Col>
          </div>
        </div>
      </div>
      <motion.div
        initial="offScreen"
        whileInView="onScreen"
        viewport={{ once: true, amount: 0.8 }}
        className="why_taamarbouta"
      >
        <div className="container">
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
                    <Col span={8} className="d-block m-auto">
                      <img
                        className="w-50 mx-auto d-block"
                        src={Ev}
                        alt="Quality Team"
                      />
                      <h4 className="text-center blue-text">Quality Team</h4>
                    </Col>
                    <Col span={8}>
                      <img
                        className="w-50 mx-auto d-block"
                        src={Cul}
                        alt="Quality Team"
                      />
                      <h4 className="text-center blue-text">
                        Cultural Immersion
                      </h4>
                    </Col>
                    <Col span={8}>
                      <img
                        className="w-50 mx-auto d-block"
                        src={Ex}
                        alt="Quality Team"
                      />
                      <h4 className="text-center blue-text">
                        International Work Experience
                      </h4>
                    </Col>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="partenaire_block mb-3">
        <div className="container">
          <div className="row mt-5">
            <Carousel />
          </div>
        </div>
      </div>
    </Content>
    <Footer/>
    </>
  );
};

export default Home;
