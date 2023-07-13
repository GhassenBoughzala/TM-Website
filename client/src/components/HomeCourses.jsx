import React from "react";
import C1 from "../assets/images/pxfuel.jpg";
import { useNavigate } from "react-router-dom";

export const HomeCourses = () => {
  const navTo = useNavigate();

  return (
    <div className="row justify-content-center">
      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-3">
        <div
          onClick={() => navTo("/language-courses")}
          className="card embed-responsive  ant-card-hoverable box-shadow"
        >
          <img
            className="course-card-img-ar embed-responsive-item"
            alt="example"
            src={C1}
          />
          <div className=" card-img-overlay d-block ">
            <h3 className="montserrat_bold text-center blue-text">
              Learn Arabic
            </h3>

            <p className=" parag_style text-black text-center">
              This option includes twenty hours of language study per week and
              is perfect if you are also looking to gain real-world work.
            </p>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div
          onClick={() => navTo("/language-courses")}
          className="card embed-responsive  ant-card-hoverable box-shadow"
        >
          <img
            className="course-card-img-ar embed-responsive-item"
            alt="example"
            src={C1}
          />
          <div className=" card-img-overlay d-block ">
            <h3 className="montserrat_bold text-center yellow-text">
              Arabic Tunisian
            </h3>

            <p className=" parag_style text-black text-center">
              This option includes twenty hours of language study per week and
              is perfect if you are also looking to gain real-world work.
            </p>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div
          onClick={() => navTo("/language-courses")}
          className="card embed-responsive  ant-card-hoverable box-shadow"
        >
          <img
            className="course-card-img-ar embed-responsive-item"
            alt="example"
            src={C1}
          />
          <div className=" card-img-overlay d-block ">
            <h3 className="montserrat_bold text-center blue-text">
              Libyan Courses
            </h3>

            <p className=" parag_style text-black text-center">
              If you are a working professional or simply have other commitments
              during the day, these evening courses are for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCourses;
