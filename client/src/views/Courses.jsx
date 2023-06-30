/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCourses } from "../redux/courses/courseActions";
import { Card, Layout, Modal } from "antd";
import { motion } from "framer-motion";


import Footer from "../components/Footer";
import Arabic from "../assets/images/arabic.png";
const { Content } = Layout;

export const Courses = ({ ...props }) => {
  useEffect(() => {
    props.AllCourses();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentObj, setCurrentObj] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Content className="container-fluid">
        <div className="container mb-lg-5">
          <h1 className="titre mt-5">Language Courses</h1>
          <div className="row">
            {props.courses.map((course, index) => {
              return (
                <Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
                  >
                    <Card
                      loading={props.isLoading}
                      hoverable
                      onClick={() => {
                        showModal();
                        setCurrentObj(course);
                      }}
                      cover={<img alt="example" src={Arabic} />}
                    >
                      <h2 className="blue-text text-center">
                        <b> {course.title}</b>
                      </h2>
                    </Card>
                  </motion.div>
                </Fragment>
              );
            })}
          </div>
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            width={1200}
            footer={null}
          >
            <div className="row">
              <h3 className="blue-text">{currentObj.title}</h3>
              <div className="mb-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <p>{currentObj.description}</p>
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <p>{currentObj.priceDescription}</p>
              </div>
            </div>
          </Modal>
        </div>
      </Content>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading,
});

const mapActionToProps = {
  AllCourses: getCourses,
};

export default connect(mapStateToProps, mapActionToProps)(Courses);
