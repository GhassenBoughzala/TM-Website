import React from "react";
import { Carousel, Image } from "antd";
import { useTranslation } from "react-i18next";

export const Travel = () => {
  const { t } = useTranslation();
  return (
    <div className="row">      
      <h3 className="blue-text">{t("Travel")}</h3>
      <div className="mb-3 col-lg-7 col-md-12 col-sm-12 col-xs-12">
        <p>{t("ST-T1")}</p>
        <p>{t("ST-T2")}</p>
        <p>{t("ST-T3")}</p>
        <p>{t("ST-T4")}</p>
        <p>{t("ST-T5")}</p>
        <p>{t("ST-T6")}</p>
      </div>
      <div className="mb-3 col-lg-5 col-md-12 col-sm-12 col-xs-12">
        <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
          <div className="px-3">
            <Image
              src="/images/student/Travel/Carthage1.jpeg"
              width={"100%"}
              height={"auto"}
              alt="Taa Marbouta"
              className="rounded"
            />
          </div>{" "}
          <div className="px-3">
            <Image
              src="/images/student/Travel/Carthage2.jpeg"
              width={"100%"}
              height={"auto"}
              alt="Taa Marbouta"
              className="rounded"
            />
          </div>{" "}
          <div className="px-3">
            <Image
              src="/images/student/Travel/View.jpeg"
              width={"100%"}
              height={"auto"}
              alt="Taa Marbouta"
              className="rounded"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Travel;
