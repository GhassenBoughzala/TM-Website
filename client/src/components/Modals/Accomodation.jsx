import React from "react";
import { useTranslation } from "react-i18next";
import { Carousel, Image } from "antd";
import { image1List, image2List } from "../../helpers/Constants";
import shortid from  "shortid";

export const Accommodation = () => {
  const { t } = useTranslation();
  return (
    <div className="row">
      <h3 className="blue-text">{t("Accommodation")}</h3>
      <div className="mb-3 col-lg-7 col-md-12 col-sm-12 col-xs-12">
        <p>{t("STAC-1")}</p>
        <p>{t("STAC-2")}</p>
        <p>{t("STAC-3")}</p>
        <p>{t("STAC-4")}</p>
        <p>{t("STAC-5")}</p>
        <p>{t("STAC-6")}</p>
      </div>
      <div className="mb-3 col-lg-5 col-md-12 col-sm-12 col-xs-12">
        <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
          {image2List.map((i, index) => {
            return (
              <div className="px-3" key={shortid.generate() + index}>
                <Image
                  alt="Taa Marbouta"
                  className="rounded"
                  src={i}
                  width={"100%"}
                  height={"auto"}
                />
              </div>
            );
          })}
        </Carousel>

        <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
          {image1List.map((i, index) => {
            return (
              <div className="px-3" key={shortid.generate() + index}>
                <Image
                  src={i}
                  alt="Taa Marbouta"
                  className="rounded"
                  width={"100%"}
                  height={"auto"}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Accommodation;
