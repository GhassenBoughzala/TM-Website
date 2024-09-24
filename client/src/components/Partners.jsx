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
