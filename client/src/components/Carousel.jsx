import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const CarouselAntd = () => {
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
        className="mySwiper"
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
            src="/images/AMES-LOGO-V4.webp"
            width={"50%"}
            height={"auto"}
            style={{ width: "50%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/mdinti.webp"
            alt="Taa Marbouta"
            width={"50%"}
            height={"auto"}
            style={{ width: "80%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/Mnara.webp"
            alt="Taa Marbouta"
            width={"50%"}
            height={"auto"}
            style={{ width: "80%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/Nafsa.webp"
            alt="Taa Marbouta"
            width={"50%"}
            height={"auto"}
            style={{ width: "80%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/uni.webp"
            alt="Taa Marbouta"
            width={"50%"}
            height={"auto"}
            style={{ width: "80%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/bew.webp"
            alt="Taa Marbouta"
            width={"50%"}
            height={"auto"}
            style={{ width: "80%" }}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default CarouselAntd;
