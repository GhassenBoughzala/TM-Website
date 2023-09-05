import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cloudinaryBaseUrl, imageParams } from "../helpers/Constants";

export const HomeCourses = () => {
  const navTo = useNavigate();
  const { t } = useTranslation();


  return (
    <div className="row justify-content-center">
      <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 mb-3">
        <div
          onClick={() => navTo("/learn-arabic")}
          className="card embed-responsive  ant-card-hoverable box-shadow"
        >
          <img
            className="course-card-img-ar embed-responsive-item"
            alt="example1"
            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/pxfuel.jpg`}
            width={"100%"}
            height={"auto"}
          />
          <div className=" card-img-overlay d-block ">
            <h3 className="subtitle text-center blue-text mb-3">
              {t("LearnAR")}
            </h3>

            <p className=" parag_style text-black text-center text-wrap">
              {t("LearnAR-P")}
            </p>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 mb-3">
        <div
          onClick={() => navTo("/learn-libyan-arabic")}
          className="card embed-responsive  ant-card-hoverable box-shadow"
        >
          <img
            className="course-card-img-ar embed-responsive-item"
            alt="example2"
            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/pxfuel.jpg`}
            width={"100%"}
            height={"auto"}
          />
          <div className=" card-img-overlay d-block ">
            <h3 className="subtitle text-center yellow-text mb-5">
              {t("LearnLB")}
            </h3>

            <p className=" parag_style text-black text-center">
              {t("LearnLB-P")}
            </p>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 mb-3">
        <div
          onClick={() => navTo("/learn-tunisian-arabic")}
          className="card embed-responsive  ant-card-hoverable box-shadow"
        >
          <img
            className="course-card-img-ar embed-responsive-item"
            alt="example2"
            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/pxfuel.jpg`}
            width={"100%"}
            height={"auto"}
          />
          <div className=" card-img-overlay d-block ">
            <h3 className="subtitle text-center blue-text mb-5">
              {t("LearnTN")}
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
