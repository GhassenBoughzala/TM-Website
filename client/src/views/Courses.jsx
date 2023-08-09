/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFilteredCourses, selectCourse } from "../redux/courses/courseActions";
import { Card, Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
const { Content } = Layout;

export const Courses = ({ ...props }) => {
  const { t } = useTranslation();
  const navTo = useNavigate();
  useEffect(() => {
    props.AllCourses();
  }, []);

  const selectCourse = (course) => {
    if (course.title === "French") {
      navTo("/language-courses/learn-french");
    }
    if (course.title === "Tunisian Arabic") {
      navTo("/language-courses/learn-tunisian-arabic");
    }
    if (course.title === "Libyan Arabic") {
      navTo("/language-courses/learn-libyan-arabic");
    }
    if (course.title === "English") {
      navTo("/language-courses/learn-english");
    }
    if (course.title === "Modern Standard Arabic") {
      navTo("/language-courses/learn-arabic");
    }
  };

  return (
    <>
      <Content className="container-fluid">
        <Helmet>
          <title>Language Courses</title>
          <meta
            name="description"
            content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
          />
          <link rel="canonical" href="/language-courses" />
        </Helmet>
        <div className="container mb-lg-5">
          <h1 className="titre mt-5">{t("LanguageCourses")}</h1>
          {props.isLoading ? (
            <>
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
                          bodyStyle={{ height: 150 }}
                          loading={!props.isLoading}
                          hoverable
                          onClick={() => {
                            selectCourse(course);
                          }}
                          cover={
                            <img
                              alt="example"
                              src={course.backgroundImage.map((i) =>
                                !i.base64 ? i.thumbUrl : i.base64
                              )}
                              className="w-50 my-2"
                            />
                          }
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
            </>
          ) : (
            <div className="text-center">
              <LoadingOutlined
                style={{
                  fontSize: 40,
                  margin: 130,
                }}
                spin
              />
            </div>
          )}
        </div>
      </Content>
      <Footer />
    </>
  );
};

const mapActionToProps = {
  AllCourses: getFilteredCourses,
  Select: selectCourse,
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading,
  selectedCourse: state.courses.courseObj,
});

export default connect(mapStateToProps, mapActionToProps)(Courses);
