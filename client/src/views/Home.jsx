import React from "react";
import HeaderHome from "../assets/images/header_home.png";
import { Card, Col, Layout, Row } from "antd";
import Arabic from "../assets/images/arabic.png";
import StudyArabic from "../assets/images/studyarabic.png";
const { Content } = Layout;

export const Home = () => {
  return (
    <Content>
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
      <div class="category_details">
        <div class="container">
          <div class="row">
            <h2 class="title title_center">Learn Arabic in Tunisia</h2>
            <div class="parag_style">
              <p>
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
      <div class="list_learn">
        <div class="container">
          <div class="row">
            <Col span={12}>
              <Card hoverable cover={<img alt="example" src={Arabic} />}>
                <h2 class="montserrat_bold">Evening classes</h2>
                <div class="parag_style">
                  <p>
                    If you are a working professional or simply have other
                    commitments during the day, these evening courses are for
                    you.
                  </p>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card hoverable cover={<img alt="example" src={StudyArabic} />}>
                <h2 class="montserrat_bold">Study Arabic and Work Abroad</h2>
                <div class="parag_style">
                  <p>
                    This option includes twenty hours of language study per week
                    and is perfect if you are also looking to gain real-world
                    work or research experience.
                  </p>
                </div>
              </Card>
            </Col>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Home;
