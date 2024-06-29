import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { cloudinaryBaseUrl, imageParams, partenaireList } from "../helpers/Constants";


const Partners = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="title title_center">{t("HomePartners")}</h2>
      <Swiper
        centeredSlides={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper text-center"
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2, spaceBetween: 50 },
          768: { slidesPerView: 2, spaceBetween: 50 },
          1024: { slidesPerView: 4, spaceBetween: 15 },
        }}
      >
        <SwiperSlide>
          <img
            alt="Taa Marbouta"
            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/AMES-LOGO-V4.png`}
            width={1120}
            height={1120}
            style={{ width: "50%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/mdinti.png`}
            alt="Taa Marbouta"
            width={500}
            height={287}
            style={{ width: "80%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/Mnara.png`}
            alt="Taa Marbouta"
            width={1568}
            height={1568}
            style={{ width: "80%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/uni.png`}
            alt="Taa Marbouta"
            width={1568}
            height={1032}
            style={{ width: "80%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`${cloudinaryBaseUrl}/${imageParams}/v1693852960/TM/bew.png`}
            alt="Taa Marbouta"
            width={727}
            height={354}
            style={{ width: "80%" }}
          />
        </SwiperSlide>
          {partenaireList.map((i, index) => {
            return (                
              <SwiperSlide>
                <img
                  src={i}
                  alt="Taa Marbouta"
                  width={727}
                  height={354}
                  style={{ width: "80%" }}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};
export default Partners;
