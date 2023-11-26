/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import CourseModal from "../../components/CourseModal";
import { connect } from "react-redux";
import { getCourses } from "../../redux/courses/courseActions";
import { getSubsAD } from "../../redux/subs/subsActions";
import { Helmet } from "react-helmet-async";
import axios from "axios";

import { Layout } from "antd";
import Footer from "../../components/Footer";
const { Content } = Layout;

export const CourseFR = ({ ...props }) => {
  const course = { description: [], sessions: [] };
  const [currentObj, setstate] = useState(course);
  const [allUser, setallUser] = useState([]);
  const [loading, setloading] = useState(true);

  const [User] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(false);
  
        // Fetch course data
        const courseResponse = await axios.get(`/api/courses/64c684ce13ebbe2aec0e1b20`);
        setstate(courseResponse.data);
  
        // Fetch subscription data
        const subscriptionResponse = await axios.get(`/api/subscription/all`);
        setallUser(subscriptionResponse.data);
  
        setloading(true);
      } catch (err) {
        console.error(err);
        setloading(true);
      }
    };
  
    fetchData();
  }, []);

  const findCourse = (alluser, user_id, course_id) => {
    const courseExists = alluser.some(user => {
      return user._id === user_id && user.subscription.some(sub => sub.course === course_id);
    });
  
    if (courseExists) {
      return course_id;
    } else {
      return null; // or any other value to indicate that the course doesn't exist
    }
  };
  const courseExists = findCourse(allUser, User._id, "64c684ce13ebbe2aec0e1b20");

  /*useEffect(() => {
    const id = "64c684ce13ebbe2aec0e1b20";
    setloading(false);
    axios
      .get(`/api/courses/${id}`)
      .then((res) => {
        setloading(true);
        setstate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setstate(props.selectedCourse);
  }, []);*/

  return (
    <>
      <Content className=" container-fluid m-3 overflow-y-scroll overflow-x-hidden">
        <Helmet>
          <title>French Course</title>
          <meta
            name="description"
            content="Taa Marbouta is a language school based in Carthage,
          Tunis. We aim to better connect Tunisia with the world."
          />
          <link rel="canonical" href="/learn-french" />
        </Helmet>
        {!loading ? (
          <>
            <div className="text-center">
              <LoadingOutlined
                className="yellow-text"
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
          //<CourseModal {...{ currentObj }} />
          <CourseModal {...{ currentObj, courseExists }} />
        )}
      </Content>
      <Footer />
    </>
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

export default connect(mapStateToProps, mapActionToProps)(CourseFR);
