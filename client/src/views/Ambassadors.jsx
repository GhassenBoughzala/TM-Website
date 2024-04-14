import React, { useRef } from "react";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout, Carousel } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { cloudinaryBaseUrl, imageParams } from "../helpers/Constants";
import {
  InstagramOutlined,
  FacebookOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
export const Ambassadors = () => {
  const carouselRef = useRef(); 

  const carousel_prev = () => {
    carouselRef.current.prev();
  }

  const carousel_next = () => {
    carouselRef.current.next();
  }

  return (
    <>
      <Helmet>
        <title>Ambassadors</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/ambassadors" />
      </Helmet>
      <Content>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="page_style overflow-x-hidden overflow-y-scroll ambassadors_page"
        >

          <div className="container-fluid">
            <div className="full_espace_padding">

              <div className="titre_page_one">
                <h1>Unleash Your Inner Polyglot: Become a Taa Marbouta Student Ambassador!</h1>
                <div className="parag_style style_link">
                  <p>Do you dream of speaking multiple languages with confidence? Do you crave fostering connections across cultures? The Taa Marbouta Language Centre's Student Ambassador Program empowers passionate individuals like you to achieve both, while earning recognition and rewards.</p>
                </div>
              </div>
              
              <div className="titre_page_one espace_top">  
                <h2 className="blue-text">Programme Overview</h2> 
                <div className="parag_style style_link">
                  <p>Imagine a journey that allows you to share your love of languages, advocate for exceptional education, and inspire others to unlock a world of opportunity. The Taa Marbouta Language Centre's prestigious Student Ambassador Programme offers exactly that. As an Ambassador, you'll become a vital voice, promoting the transformative power of multilingualism and the significance of language proficiency in today's interconnected world.</p>
                </div>
              </div>
              
              <div className="titre_page_one espace_top">  
                <h2 className="blue-text">Programme Benefits</h2> 
                <div className="parag_style style_link">
                  <p><strong>Be a Language Champion:</strong> Do you have a passion for Arabic, or the Middle East and North Africa? As a Student Ambassador, you'll have the incredible opportunity to ignite that passion in others. Empower fellow students to embark on their own language learning journeys, and witness the personal and professional transformations that follow fluency.</p>
                  <p><strong>Make a Global Impact:</strong> The world is a tapestry of cultures, and language is the key to unlocking its beauty. As a Student Ambassador, you'll become a champion for cultural exchange. Spread the importance of language learning within your network, and help bridge the gaps that separate us.</p>
                  <p><strong>Get Rewarded for Your Passion:</strong> We believe your dedication deserves recognition. Student Ambassadors enjoy a range of exclusive benefits, including free language courses, and exciting incentives to fuel your efforts.</p>
                  <p><strong>Professional Development:</strong> The Student Ambassador Programme isn't just about languages; it's about personal growth. We offer workshops and training designed to refine your leadership potential, equipping you with valuable skills that will benefit you throughout your academic and professional careers.</p>
                  <p><strong>Become a Community Leader:</strong> Earn recognition as a respected ambassador for language learning in your community. Your dedication will inspire others, and your voice will be a powerful force for positive change.</p>
                </div>
              </div>
              
              <div className="titre_page_one espace_top">  
                <h2 className="blue-text">Programme Requirements</h2> 
                <div className="parag_style style_link">
                  <p>Please get in touch if you think that you could be an effective ambassador in your community. We are mostly looking for students who are present and active on their university campuses. We are eager to meet folks who are happy talking to others, and have a social media presence. Ambassadors can be from any country and any academic discipline. Even if you are not at a university, let us know if you think that you could be an ambassador for a community that might be interested in studying Arabic with us in Tunisia.</p>
                </div>
              </div>

              <div className="slide_block espace_top">
                <div className="row">
                  
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <h2 className="blue-text">Our Current Ambassadors</h2>
                    <div className="parag_style style_link">
                      <p>Meet the extraordinary team of Student Ambassadors who are making a real difference in the world! These inspiring individuals are living testaments to the power of the programme, and we invite you to learn from their experiences.</p>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="carousel_block">
                      <Carousel
                        autoplay 
                        dots={false} 
                        speed={1500} 
                        slidesToShow={1} 
                        ref={carouselRef}
                        autoplaySpeed={3000} 
                        className="carousel_box"
                      >
                          <div><img alt="example" src="/images/ambassadors/1.png" width={"100%"} /></div>
                          <div><img alt="example" src="/images/ambassadors/2.png" width={"100%"} /></div>
                          <div><img alt="example" src="/images/ambassadors/3.png" width={"100%"} /></div>
                          <div><img alt="example" src="/images/ambassadors/4.png" width={"100%"} /></div>
                          <div><img alt="example" src="/images/ambassadors/5.png" width={"100%"} /></div>
                      </Carousel>
                      <button className="carousel_prev" onClick={carousel_prev}><CaretLeftOutlined /></button>
                      <button className="carousel_next" onClick={carousel_next}><CaretRightOutlined /></button>
                    </div>
                  </div>
                </div>
              </div>              
              
              <div className="titre_page_one espace_top">  
                <h2 className="blue-text">Contact Us</h2> 
                <div className="parag_style style_link">
                  <p>Do you have burning questions about the programme or a yearning to embark on your own language-learning adventure? Reach out to us today! Our dedicated team is eager to connect with you and help you unlock a world of possibilities</p>
                </div>
                <div className="text-center justify-content-center">

                  <img
                    src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/logo_footer.png`}
                    alt="TaaMarbouta"
                    className="logo_tm espace_top"
                  />

                <ul className="info_contact_rc">
                  <li>
                    <h2>
                      <MailOutlined
                        onClick={() =>
                          window.open(
                            "mailto:info@taamarbouta.com",
                            "_blank",
                            "noreferrer"
                          )
                        }
                      />
                    </h2>
                  </li>
                  <li>
                    <h2>
                      <InstagramOutlined
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
                  <li>
                    <h2>
                      <FacebookOutlined
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
                </ul>
                

                </div>
              </div>

            </div>

          </div>

        </motion.div>
        <Footer />
      </Content>
    </>
  );
};

export default Ambassadors;
