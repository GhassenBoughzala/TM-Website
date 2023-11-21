/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import CourseModal from "../../components/CourseModal";
import { connect } from "react-redux";
import { getCourses, selectCourse } from "../../redux/courses/courseActions";
import { getSubsUser } from "../../redux/subs/subsActions";
import { Helmet } from "react-helmet-async";
import axios from "axios";

import { Layout } from "antd";
import Footer from "../../components/Footer";
const { Content } = Layout;

export const CourseAR = ({ ...props }) => {
  const course = { description: [], sessions: [] };
  const [currentObj, setstate] = useState(course);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const id = "64c6849913ebbe2aec0e1b1d";
    setloading(false);
    axios
      .get(`/api/courses/${id}`)
      .then((res) => {
        setloading(true);
        setstate(res.data);
        props.getSubsUser();
      })
      .catch((err) => {
        console.log(err);
      });
    setstate(props.selectedCourse);
  }, []);

  return (
    <>
      <Content className=" container-fluid m-3">
        <Helmet>
          <title>Modern Standard Arabic Course</title>
          <meta
            name="description"
            content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
          />
          <link rel="canonical" href="/learn-arabic" />
        </Helmet>
        {!loading ? (
          <>
            <div className="text-center">
              <LoadingOutlined
                className="yellow-text classes-loader"
                style={{
                  fontSize: 40,
                  marginTop: 330,
                  marginBottom: 330,
                }}
                spin
              />
            </div>
          </>
        ) : (
          <CourseModal {...{ currentObj }} />
        )}
      </Content>
      <Footer />
    </>
  );
};

const mapActionToProps = {
  AllCourses: getCourses,
  Select: selectCourse,
  getSubsUser,
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading,
  selectedCourse: state.courses.courseObj,
});

export default connect(mapStateToProps, mapActionToProps)(CourseAR);
