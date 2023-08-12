import React from "react";
import C1 from "../assets/images/pxfuel.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HomeCourses = () => {
  const navTo = useNavigate();
  const { t } = useTranslation();

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
            <h3 className="montserrat_bold text-center blue-text mb-3">
              {t("LearnAR")}
            </h3>

            <p className=" parag_style text-black text-center">
              {t("LearnAR-P")}
            </p>
          </div>
        </div>
      </div>
      {/* 2 */}
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
            <h3 className="montserrat_bold text-center yellow-text mb-5">
              {t("LearnTN")}
            </h3>

            <p className=" parag_style text-black text-center">
              {t("LearnLB-P")}
            </p>
          </div>
        </div>
      </div>
      {/* 3 */}
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
            <h3 className="montserrat_bold text-center blue-text mb-5">
              {t("LearnLB")}
            </h3>

            <p className=" parag_style text-black text-center">
              {t("LearnTN-P")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCourses;
