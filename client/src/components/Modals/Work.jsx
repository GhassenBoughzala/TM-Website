import React from "react";
import { useTranslation } from "react-i18next";
import { Carousel, Image } from "antd";

export const Work = () => {
  const { t } = useTranslation();
  return (
    <div className="row">
      <h3 className="blue-text">Work & Research Experience </h3>
      <div className="mb-3 col-lg-7 col-md-12 col-sm-12 col-xs-12">
        <p>{t("ST-W1")}</p>
        <p>{t("ST-W2")}</p>
        <p>{t("ST-W3")}</p>
        <p>{t("ST-W4")}</p>
        <p>{t("ST-W5")}</p>
      </div>
      <div className="mb-3 col-lg-5 col-md-12 col-sm-12 col-xs-12">
        <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
          <div className="px-3">
            <Image
              src="/images/student/Work/work2.jpeg"
              width={"100%"}
              height={"auto"}
              alt="Taa Marbouta"
              className="rounded"
            />
          </div>
          <div className="px-3">
            <Image
              src="/images/student/Work/work1.jpeg"
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

export default Work;
