/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCourses, selectCourse } from "../redux/courses/courseActions";
import { Card, Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
const { Content } = Layout;

export const Courses = ({ ...props }) => {
  const navTo = useNavigate()
  useEffect(() => {
    props.AllCourses();
  }, []);

  const selectCourse = (course) => {
    if(course.title === 'French'){
      navTo('/language-courses/learn-french')
    }
  }

  return (
    <>
      <Content className="container-fluid">
        <div className="container mb-lg-5">
          <h1 className="titre mt-5">Language Courses</h1>
          {!props.isLoading ? (
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
                          loading={props.isLoading}
                          hoverable
                          onClick={() => {
                            selectCourse(course);
                          }}
                          cover={
                            <img
                              alt="example"
                              src={course.backgroundImage.map((i) => i.base64)}
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
  AllCourses: getCourses,
  Select: selectCourse,
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading,
  selectedCourse: state.courses.courseObj,
});

export default connect(mapStateToProps, mapActionToProps)(Courses);
