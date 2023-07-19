/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import CourseModal from "../../components/CourseModal";
import { connect } from "react-redux";
import { getCourses } from "../../redux/courses/courseActions";
import { Helmet } from "react-helmet-async";

export const CourseLB = ({ ...props }) => {
  const course = { description: [], sessions: [] };
  const [currentObj, setstate] = useState(course);
  useEffect(() => {
    props.AllCourses();
    setstate(props.courses[2]);
  }, []);

  return (
    <div className=" container-fluid m-3">
      <Helmet>
        <title>Libyan Arabic Course</title>
        <meta
          name="description"
          content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
        />
        <link rel="canonical" href="/learn-libyan-arabic" />
      </Helmet>
      {!props.isLoading ? (
        <>
          <div className="text-center">
            <LoadingOutlined
              style={{
                fontSize: 40,
                margin: 130,
              }}
              spin
            />
          </div>
        </>
      ) : (
        <CourseModal {...{ currentObj }} />
      )}
    </div>
  );
};

const mapActionToProps = {
  AllCourses: getCourses,
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading,
  selectedCourse: state.courses.courseObj,
});

export default connect(mapStateToProps, mapActionToProps)(CourseLB);
