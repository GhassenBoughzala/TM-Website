import React from "react";
import { LivingDesc } from "../../helpers/StudentLifeDesc";
import { Carousel, Image } from "antd";

export const LivingInTunis = (props) => {
  const images = require.context("../../assets/images/student/Tunis", true);
  const imagesList = images.keys().map((image) => images(image));

  return (
    <div className="row">
      <h3 className="blue-text">Living in Tunis</h3>
      <div className="mb-3 col-lg-7 col-md-12 col-sm-12 col-xs-12">
        {LivingDesc.map((d, index) => {
          return <p key={index}>{d.desc}</p>;
        })}
      </div>
      <div className="mb-3 col-lg-5 col-md-12 col-sm-12 col-xs-12">
        <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
          {imagesList.slice(2).map((i, index) => {
            return (
              <div className="px-3" key={index}>
                <Image src={i} alt="Taa Marbouta" className="rounded" />
              </div>
            );
          })}
        </Carousel>

        <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
          {imagesList.slice(0, 2).map((i, index) => {
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

export default LivingInTunis;
