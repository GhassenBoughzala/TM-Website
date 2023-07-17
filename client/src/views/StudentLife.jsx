import React, { useState, Fragment } from "react";
import Footer from "../components/Footer";
import { Layout, Modal, Carousel, Image } from "antd";
import { motion } from "framer-motion";
import { classesDesc, icons } from "../helpers/StudentLifeDesc";
import Accommodation from "../components/Modals/Accomodation";
import Travel from "../components/Modals/Travel";
import LivingInTunis from "../components/Modals/Tunis";
import Work from "../components/Modals/Work";

const { Content } = Layout;
export const StudentLife = (props) => {
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

  const imagesW = require.context("../assets/images/student/Course/W", true);
  const imagesListW = imagesW.keys().map((image) => imagesW(image));
  const imagesH = require.context("../assets/images/student/Course/H", true);
  const imagesListH = imagesH.keys().map((image) => imagesH(image));

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
      <div className="page_style full_espace_padding">
        <div className="container-fluid">
          <div className="row">
            <h1 className="titre">Student Life</h1>
            <div className="mb-3 col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className="parag_style style_link">
                <p>
                  While the Taa Marbouta Language Centre revolves around
                  language classes, the rest of your time in Tunisia is just as
                  important to us. We are willing and able to facilitate every
                  step of your adventure, from finding accommodation to travel,
                  from engaging fully in Tunisian culture and society to
                  navigating life in Tunisia.
                </p>
                <p>
                  We can also try to find you suitable work experience or
                  research opportunities. For anyone coming from abroad, we will
                  reach out to you when you make your booking to see if we can
                  facilitate any of your arrangements.
                </p>
                <p>Come and enjoy student life in Tunisia!</p>
              </div>
            </div>
            <div className="mb-3 col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <motion.ul
                variants={container}
                initial="hidden"
                animate="visible"
                className="list_student"
              >
                {icons.map((i, index) => {
                  return (
                    <motion.li
                      key={index}
                      className="item montserrat_bold center_element"
                      variants={item}
                      onClick={() => {
                        showModal(index);
                      }}
                    >
                      <div className="img_icon align_all">{i.desc}</div>
                      {i.name}
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </div>
          <Modal
            open={ClassesModal}
            onCancel={handleCancel}
            width={1200}
            bodyStyle={{ height: 700 }}
            footer={null}
          >
            <div className="row">
              <h3 className="blue-text">Classes</h3>
              <div className="mb-3 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                {classesDesc.map((d, index) => {
                  return <p key={index}>{d.desc}</p>;
                })}
                <p></p>
              </div>
              <div className="mb-3 col-lg-5 col-md-5 col-sm-12 col-xs-12 text-center">
                <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
                  {imagesListH.map((img, index) => {
                    return (
                      <Fragment key={index}>
                        <Image width={300} src={img} preview={true} className="rounded" />
                      </Fragment>
                    );
                  })}
                </Carousel>

                <Carousel
                  className="py-4"
                  autoplay
                  speed={1500}
                  slidesToShow={1}
                  dots={false}
                >
                  {imagesListW.map((img, index) => {
                    return (
                      <Fragment key={index}>
                        <Image width={300} src={img} preview={true} className="rounded" />
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
            footer={null}
          >
            <Accommodation />
          </Modal>
          <Modal
            open={TravelModal}
            onCancel={handleCancel}
            width={1200}
            bodyStyle={{ height: 600 }}
            footer={null}
          >
            <Travel />
          </Modal>

          <Modal
            open={LivingModal}
            onCancel={handleCancel}
            width={1200}
            bodyStyle={{ height: 700 }}
            footer={null}
          >
            <LivingInTunis />
          </Modal>

          <Modal
            open={WorkModal}
            onCancel={handleCancel}
            width={1200}
            bodyStyle={{ height: 500 }}
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
