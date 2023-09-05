import React, { useState, Fragment } from "react";
import Footer from "../components/Footer";
import { Layout, Modal, Carousel, Image, Button } from "antd";
import { motion } from "framer-motion";
import Accommodation from "../components/Modals/Accomodation";
import Travel from "../components/Modals/Travel";
import LivingInTunis from "../components/Modals/Tunis";
import Work from "../components/Modals/Work";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { imagesListH, imagesListW } from "../helpers/Constants";
import shortid from "shortid";

const { Content } = Layout;
export const StudentLife = () => {
  const { t } = useTranslation();
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const icons = [
    {
      value: t("Classes"),
      desc: <FontAwesomeIcon icon="fa-solid fa-puzzle-piece" />,
    },
    {
      value: t("Accommodation"),
      desc: <FontAwesomeIcon icon="fa-solid fa-house-chimney" />,
    },
    {
      value: t("Travel"),
      desc: <FontAwesomeIcon icon="fa-solid fa-plane" />,
    },
    {
      value: t("Living in Tunis"),
      desc: <FontAwesomeIcon icon="fa-solid fa-star-and-crescent" />,
    },
    {
      value: t("WorkResearch"),
      desc: <FontAwesomeIcon icon="fa-solid fa-atom" />,
    },
  ];

  const [ClassesModal, setClassesModal] = useState(false);
  const [AccModal, setAccModal] = useState(false);
  const [TravelModal, setTravelModal] = useState(false);
  const [LivingModal, setLivingModal] = useState(false);
  const [WorkModal, setWorkModal] = useState(false);

  const showModal = (index) => {
    if (index === 0) {
      setClassesModal(true);
    }
    if (index === 1) {
      setAccModal(true);
    }
    if (index === 2) {
      setTravelModal(true);
    }
    if (index === 3) {
      setLivingModal(true);
    }
    if (index === 4) {
      setWorkModal(true);
    }
  };
  const handleCancel = () => {
    setClassesModal(false);
    setAccModal(false);
    setTravelModal(false);
    setLivingModal(false);
    setWorkModal(false);
  };

  return (
    <Content>
      <Helmet>
        <title>Student Life</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/student-life" />
      </Helmet>
      <div className="page_style m-5 overflow-x-hidden overflow-y-scroll">
        <div className="container-fluid">
          <div className="row">
            <h1 className="titre">{t("StudentLife")}</h1>
            <div className="mb-3 col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className="parag_style style_link">
                <p>{t("SLP1")} </p>
                <p>{t("SLP2")} </p>
                <p>{t("SLP3")} </p>
              </div>
            </div>
            <div className="mb-3 col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="list_student row"
              >
                {icons.map((i, index) => {
                  return (
                    <motion.div
                      key={shortid.generate() + index}
                      className="item montserrat_bold center_element col-lg-2"
                      variants={item}
                      onClick={() => {
                        showModal(index);
                      }}
                    >
                      <div className="mb-2 align_all">
                        <Button
                          style={{ width: 120, height: 120, fontSize: 55 }}
                          type="primary"
                          shape="circle"
                          className="yellow-text"
                          icon={<div className="my-2">{i.desc}</div>}
                        />
                      </div>
                      {i.value}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          <Modal
            open={ClassesModal}
            onCancel={handleCancel}
            width={1200}
            bodyStyle={{ height: 700 }}
            style={{ top: 0 }}
            footer={null}
          >
            <div className="row">
              <h3 className="blue-text">Classes</h3>
              <div className="mb-3 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <p>{t("STC-1")}</p>
                <p>{t("STC-2")}</p>
                <p>{t("STC-3")}</p>
                <p>{t("STC-4")}</p>
                <p>{t("STC-5")}</p>
                <p>{t("STC-6")}</p>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 text-center">
                <Carousel autoplay speed={1500} slidesToShow={1} dots={false} className="my-2">
                  {imagesListW.map((img, index) => {
                    return (
                      <Fragment key={shortid.generate() + index}>
                        <Image
                          width={"80%"}
                          src={img}
                          preview={true}
                          className="rounded"
                        />
                      </Fragment>
                    );
                  })}
                </Carousel>
                <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
                  {imagesListH.map((img, index) => {
                    return (
                      <Fragment key={shortid.generate() + index}>
                        <Image
                          width={"80%"}
                          src={img}
                          preview={true}
                          className="rounded"
                        />
                      </Fragment>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </Modal>

          <Modal
            open={AccModal}
            onCancel={handleCancel}
            width={1200}
            bodyStyle={{ height: 700 }}
            style={{ top: 0 }}
            footer={null}
          >
            <Accommodation />
          </Modal>

          <Modal
            open={TravelModal}
            onCancel={handleCancel}
            width={1200}
            bodyStyle={{ height: 600 }}
            style={{ top: 0 }}
            footer={null}
          >
            <Travel />
          </Modal>

          <Modal
            open={LivingModal}
            onCancel={handleCancel}
            width={1200}
            bodyStyle={{ height: 700 }}
            style={{ top: 0 }}
            footer={null}
          >
            <LivingInTunis />
          </Modal>

          <Modal
            open={WorkModal}
            onCancel={handleCancel}
            width={1200}
            bodyStyle={{ height: 700 }}
            style={{ top: 0 }}
            footer={null}
          >
            <Work />
          </Modal>
        </div>
      </div>
      <Footer />
    </Content>
  );
};

export default StudentLife;
