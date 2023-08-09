import React from "react";
import { Carousel, Image } from "antd";
import { useTranslation } from "react-i18next";

export const Travel = () => {
  const { t } = useTranslation();
  const images = require.context("../../assets/images/student/Course/H", true);
  const imagesList = images.keys().map((image) => images(image));
  return (
    <div className="row">
      <h3 className="blue-text">Travel</h3>
      <div className="mb-3 col-lg-7 col-md-12 col-sm-12 col-xs-12">
        <p>{t("ST-T1")}</p>
        <p>{t("ST-T2")}</p>
        <p>{t("ST-T3")}</p>
        <p>{t("ST-T4")}</p>
        <p>{t("ST-T5")}</p>
      </div>
      <div className="mb-3 col-lg-5 col-md-12 col-sm-12 col-xs-12">
        <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
          {imagesList.map((i, index) => {
            return (
              <div className="px-3" key={index}>
                <Image src={i} alt="Taa Marbouta" className="rounded" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Travel;
