import React from 'react'
import { TravelDesc } from '../../helpers/StudentLifeDesc';
import { Carousel, Image } from "antd";

export const Travel = () => {
  const images = require.context("../../assets/images/student/Course/H", true);
  const imagesList = images.keys().map((image) => images(image));
    return(
        <div className="row">
        <h3 className="blue-text">Travel</h3>
        <div className="mb-3 col-lg-7 col-md-12 col-sm-12 col-xs-12">
          {TravelDesc.map((d, index) => {
            return <p key={index}>{d.desc}</p>;
          })}
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
    )
}

export default Travel