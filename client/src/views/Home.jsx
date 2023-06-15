import React from "react";
import { Layout, Space } from "antd";
import HeaderHome from "../assets/images/header_home.png";
const { Header, Footer, Content } = Layout;

export const Home = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header>Header</Header>
        <Content>
                <div className="header_home">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 align">
                        <div className="contenu_header_home">
                          <h1 className="averiaseriflibre_bold">Taa Marbouta</h1>
                          <h2 className="averiaseriflibre_bold">
                            Language Courses
                          </h2>
                          <div className="parag_style">
                            <p>
                              Your gateway to North Africa &#038; the
                              Arabic-speaking world. We teach Modern Standard
                              Arabic, French, Tunisian Arabic, Libyan Arabic,
                              Amazigh &#038; English. Study abroad and
                              internship packages are available.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 align">
                        <img src={HeaderHome} alt="Taa Marbouta" />
                      </div>
                    </div>
                  </div>
                </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Space>
  );
};

export default Home;
