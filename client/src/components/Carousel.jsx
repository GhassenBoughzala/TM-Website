import Ames from "../assets/images/AMES-LOGO-V4.png";
import Mi from "../assets/images/mdinti.png";
import Mn from "../assets/images/Mnara.png";
import Na from "../assets/images/Nafsa.jpeg";
import Uni from "../assets/images/University-of-Exeter_Crest_Logo_RGB_Uni_Landscape_Pos_Lrg-1568x1032.png";
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
          <img src={Ames} alt="Taa Marbouta" style={{ width: "50%" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Mi} alt="Taa Marbouta" style={{ width: "80%" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Mn} alt="Taa Marbouta" style={{ width: "80%" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Na} alt="Taa Marbouta" style={{ width: "80%" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Uni} alt="Taa Marbouta" style={{ width: "80%" }} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default CarouselAntd;
