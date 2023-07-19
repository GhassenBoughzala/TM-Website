import { Carousel } from "antd";
import Ames from "../assets/images/AMES-LOGO-V4.png";
import Mi from "../assets/images/mdinti.png";
import Mn from "../assets/images/Mnara.png";
import Na from "../assets/images/Nafsa.jpeg";
import Uni from "../assets/images/University-of-Exeter_Crest_Logo_RGB_Uni_Landscape_Pos_Lrg-1568x1032.png";
import { useTranslation } from "react-i18next";

const CarouselAntd = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="title title_center">{t("HomePartners")}</h2>
      <Carousel autoplay speed={1000} slidesToShow={4} dots={false}>
        <div className="px-5">
          <img src={Ames} alt="Taa Marbouta" className="w-75" />
        </div>
        <div className="px-5">
          <img src={Mi} alt="Taa Marbouta" />
        </div>
        <div className="px-5">
          <img src={Mn} alt="Taa Marbouta" />
        </div>
        <div className="px-5">
          <img src={Na} alt="Taa Marbouta" />
        </div>
        <div className="px-5">
          <img src={Uni} alt="Taa Marbouta" />
        </div>
      </Carousel>
    </>
  );
};
export default CarouselAntd;
