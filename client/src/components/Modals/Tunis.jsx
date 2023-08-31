import React from "react";
import { Carousel, Image } from "antd";
import { useTranslation } from "react-i18next";
import { imagesListTNH, imagesListTNW } from "../../helpers/Constants";
import shortid from  "shortid";

export const LivingInTunis = (props) => {
  const { t } = useTranslation();
  return (
    <div className="row">
      <h3 className="blue-text">Living in Tunis</h3>
      <div className="mb-3 col-lg-7 col-md-12 col-sm-12 col-xs-12">
        <p>{t("ST-LV1")}</p>
        <p>{t("ST-LV2")}</p>
        <p>{t("ST-LV3")}</p>
        <p>{t("ST-LV4")}</p>
        <p>{t("ST-LV5")}</p>
        <p>{t("ST-LV6")}</p>
      </div>
      <div className="mb-3 col-lg-5 col-md-12 col-sm-12 col-xs-12">
        <Carousel
          autoplay
          speed={1500}
          slidesToShow={1}
          dots={false}
          className="mb-3"
        >
          {imagesListTNH.map((i, index) => {
            return (
              <div className="px-3" key={shortid.generate() + index}>
                <Image src={i} alt="Taa Marbouta" className="rounded" />
              </div>
            );
          })}
        </Carousel>
        <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
          {imagesListTNW.map((i, index) => {
            return (
              <div className="px-3" key={shortid.generate() + index}>
                <Image src={i} alt="Taa Marbouta" className="rounded" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default LivingInTunis;
