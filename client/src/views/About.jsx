import React from "react";
import { Layout } from "antd";
import TM from "../assets/images/logo_footer.png";
const { Content } = Layout;

export const About = () => {
  return (
    <>
      <Content className="container-fluid">
        <div className="container">
          <div className="aboutus_page full_espace_padding">
            <div className="container-fluid">
            <h1 className="titre mt-5">About</h1>
              <div className="row">
                <div className="col col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="parag_style style_link text-start">
                    <p>
                      Launched in July 2021, the Taa Marbouta Language Centre is
                      a resource for language learning and professional
                      development. We are based in the beautiful seaside suburb
                      of Carthage in Tunisia, just two streets from the
                      Mediterranean Sea &#8211; so close that our students often
                      go swimming after class during the warmer months of the
                      year!
                    </p>
                    <p>
                      So why Tunisia? We believe that Tunisia provides great
                      opportunities to students around the world. Our teachers
                      are wonderful, the cost of living is relatively low, and
                      students can take their first steps in the international
                      arena with internships through us.
                    </p>
                  </div>
                </div>

                <div className="col col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center my-3">
                  <img src={TM} alt="About" style={{ width: 150 }} />
                </div>
              </div>

              <div className="row parag_style style_link text-start">
                <p>
                  While providing quality language education and supporting
                  research and internships, we also want to bring the best of
                  what Tunisia has to offer to the world. All teachers at the
                  Taa Marbouta Language Centre are well-qualified and
                  experienced. They are also passionate and dedicated to making
                  sure your experience is both positive and effective. For those
                  interested in the study abroad and internship packages, our
                  team can help you with logistical arrangements if needed.
                </p>
                <p>
                  We are partnered with or on the study abroad list of several
                  of the top universities around the world. We are also
                  connected with various Tunisian non-governmental organisations
                  to provide internship opportunities for students, and Tunisian
                  businesses who provide discounted services to our students.
                  These businesses share our vision of a more engaged,
                  outward-looking Tunisia for the future, while we hope to do
                  our bit in the coming years to help Tunisians at home as well.
                </p>
                <p>
                  To ease the registration process we are able to accept
                  payments through our multi-currency bank account. This means
                  that you will not be hit by foreign exchange and transfer
                  fees, whether you are paying in US Dollars, Euros, Pounds, or
                  one of many other currencies. Our team is swift and
                  professional, and will help you focus on what matters most to
                  you &#8211; learning a language!
                </p>
                <p>
                  Students from over 20 countries have joined us for classes
                  since July 2021, from a variety of work backgrounds and life
                  experiences. We work most closely with universities in order
                  to support the language development of students from around
                  the world. We regularly seek out feedback from our students so
                  that we continue to grow and improve. Our average rating on
                  Google is 4.9/5.0 and over 95% of our students recommend the
                  Taa Marbouta Language Centre.
                </p>
              </div>
            </div>
          </div>

          <div className="our_philosphy full_espace_padding">
            <div className="container">
              <div className="row">
                <h2 className="title title_center">Our Philosphy</h2>
                <div className="parag_style">
                  <p>
                    The Taa Marbouta Language Centre is more than just a
                    language centre. We want to share Tunisia with the world
                    while supporting Tunisian organisations, brands and causes.
                  </p>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <h3 className="title title_center">Promoting Tunisia</h3>
                  <div className="parag_style">
                    <p>
                      Tunisia is an incredible country with so much to offer.
                      From an extraordinary history to today’s entrepreneurial
                      people, with beautiful coastlines and gorgeous deserts.
                      Let us show you.
                    </p>{" "}
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <h3 className="title title_center">Supporting Students</h3>
                  <div className="parag_style">
                    <p>
                      We know that one of the most difficult steps for many
                      students is the first one. Getting experience in
                      real-world work and research. We can help with that.
                    </p>{" "}
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <h3 className="title title_center">
                    Standing with Civil Society
                  </h3>
                  <div className="parag_style">
                    <p>
                      By helping to connect smart international students with
                      local NGOs, the NGOs can also benefit from the additional
                      help, learn from new perspectives, and build their
                      capacities.
                    </p>{" "}
                  </div>
                </div>

                <div className="flip_box">
                  <div className="flip_one align_all">
                    <div className="contenu_flip_one">
                      <h4 className="montserrat_bold">Got a question?</h4>
                      <p className="montserrat_regular">
                        Don't hesitate to get in touch with us, our friendly
                        team is here to help.
                      </p>
                    </div>
                  </div>
                  <div className="flip_two align_all">
                    <a
                      href="https://taamarbouta.com/contact-language-centre/"
                      className="btn_url_blue center_element"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default About;
