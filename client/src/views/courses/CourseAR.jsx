/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import CourseModal from "../../components/CourseModal";
import { connect } from "react-redux";
import { getCourses, selectCourse } from "../../redux/courses/courseActions";
import { getSubsAD } from "../../redux/subs/subsActions";
import { Helmet } from "react-helmet-async";
import axios from "axios";

import { Layout } from "antd";
import Footer from "../../components/Footer";
const { Content } = Layout;

export const CourseAR = ({ ...props }) => {
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
        const courseResponse = await axios.get(`/api/courses/64c6849913ebbe2aec0e1b1d`);
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
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount
  
  console.log('currentObj', currentObj);
  console.log('allUser', allUser);
  console.log('user', User);
  console.log('loading', loading);
  console.log('props', props);

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
  const courseExists = findCourse(allUser, User._id, "64c6849913ebbe2aec0e1b1d");

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
  Select: selectCourse,
  ubsAD: getSubsAD,
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading,
  selectedCourse: state.courses.courseObj,
});

export default connect(mapStateToProps, mapActionToProps)(CourseAR);
