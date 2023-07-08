import React from "react";
import { AccomodationDesc } from "../../helpers/StudentLifeDesc";
import { Carousel, Image } from "antd";

export const Accommodation = () => {

  const images_1 = require.context(
    "../../assets/images/student/Accommodation/1",
    true
  );

  const images_2 = require.context(
    "../../assets/images/student/Accommodation/2",
    true
  );
  const image1List = images_1.keys().map((image) => images_1(image));
  const image2List = images_2.keys().map((image) => images_2(image));

  return (
    <div className="row">
      <h3 className="blue-text">Accommodation</h3>
      <div className="mb-3 col-lg-7 col-md-12 col-sm-12 col-xs-12">
        {AccomodationDesc.map((d, index) => {
          return <p key={index}>{d.desc}</p>;
        })}
      </div>
      <div className="mb-3 col-lg-5 col-md-12 col-sm-12 col-xs-12">
        <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
          {image2List.map((i, index) => {
            return (
              <div className="px-3" key={index}>
                <Image src={i} alt="Taa Marbouta" className="rounded" />
              </div>
            );
          })}
        </Carousel>

        <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
          {image1List.map((i, index) => {
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

export default Accommodation;
