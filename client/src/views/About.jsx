import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Carousel, Card, Avatar, Rate } from "antd";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Meta from "antd/es/card/Meta";
import shortid from  "shortid";

const { Content } = Layout;

export const About = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://service-reviews-ultimate.elfsight.com/data/reviews?uris%5B%5D=ChIJkZsz9x-14hIRdHKhX7KF8sY&with_text_only=1&min_rating=5&page_length=100&order=date"
      )
      .then((res) => {
        setReviews(res.data.result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

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

                <div className="col col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center mb-5">
                  <Carousel autoplay speed={1000} slidesToShow={1} dots={false}>
                    <img
                      src="/images/logo_footer.png"
                      width={"100%"}
                      height={"auto"}
                      alt="About0"
                      className="w-25"
                    />
                    <img
                      src="/images/about-1.jpeg"
                      width={"100%"}
                      height={"auto"}
                      alt="About00"
                      className="w-75"
                    />
                  </Carousel>
                </div>
              </div>

              <div className="row parag_style style_link text-start">
                <p>{t("AboutP3")}</p>
                <p>{t("AboutP4")}</p>
                <p>{t("AboutP5")}</p>
                <p>{t("AboutP6")}</p>
              </div>
            </div>
          </div>
          <div className="m-2">
            <div className="container">
              <div className="row">
                <h2 className="title title_center">{t("Testimonials")}</h2>
                {loading ? (
                  <div className="text-center">
                    <LoadingOutlined
                      style={{
                        fontSize: 40,
                        margin: 130,
                      }}
                      spin
                    />
                  </div>
                ) : (
                  <>
                    <Swiper
                      centeredSlides={false}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={false}
                      modules={[Autoplay, Pagination, Navigation]}
                      className="mySwiper"
                      breakpoints={{
                        320: { slidesPerView: 1 },
                        480: { slidesPerView: 2, spaceBetween: 50 },
                        768: { slidesPerView: 2, spaceBetween: 50 },
                        1024: { slidesPerView: 4, spaceBetween: 15 },
                      }}
                    >
                      {reviews.map((re, index) => {
                        return (
                          <SwiperSlide key={shortid.generate() + index}>
                            <Card
                              style={{ height: 250, width: 300 }}
                              className=" overflow-x-hidden overflow-y-scroll"
                            >
                              <Meta
                                className="text-start mb-2"
                                avatar={
                                  <Avatar
                                    style={{ cursor: "pointer" }}
                                    src={re.reviewer_picture_url}
                                    onClick={() => openInNewTab(re.url)}
                                    size={"large"}
                                    alt={re.url}
                                  />
                                }
                                title={re.reviewer_name}
                                description={moment
                                  .unix(re.published_at)
                                  .fromNow()}
                              />
                              <Rate
                                disabled
                                defaultValue={re.rating}
                                style={{ fontSize: 15 }}
                                className="text-start"
                              />

                              <p className="text-start">
                                {showMore
                                  ? `" ${re.text} "`
                                  : `" ${re.text.substring(0, 100)} ... "`}
                              </p>
                              <button
                                style={{ marginTop: "-20px" }}
                                className="btn"
                                onClick={() => setShowMore(!showMore)}
                              >
                                {!showMore ? (
                                  <PlusCircleOutlined
                                    style={{
                                      fontSize: 20,
                                    }}
                                  />
                                ) : (
                                  <MinusCircleOutlined
                                    style={{
                                      fontSize: 20,
                                      //marginBottom: 15,
                                    }}
                                  />
                                )}
                              </button>
                            </Card>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="our_philosphy full_espace_padding">
            <div>
              <div className="row">
                <h2 className="title title_center">{t("AboutT2")}</h2>
                <div className="parag_style">
                  <p>{t("AboutP7")}</p>
                </div>
                <div className="card bg-light h-auto border-0 overflow-y-scroll overflow-x-hidden">
                  <img
                    className="card-img"
                    alt="example"
                    src="/images/landscape.png"
                    width={"100%"}
                    height={"auto"}
                  />
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
