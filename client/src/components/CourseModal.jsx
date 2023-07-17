import React, { useState, Fragment, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Image, Empty, Carousel } from "antd";
import moment from "moment";

export const CourseModal = ({ ...props }) => {
  const course = { description: [], sessions: [{ sessions: [] }] };
  const [currentObj, setCurrentObj] = useState(course);
  useEffect(() => {
    if (props.currentObj) {
      setCurrentObj(props.currentObj);
    }
  }, [props.currentObj]);

  const imagesW = require.context("../assets/images/student/Course/W", true);
  const imagesListW = imagesW.keys().map((image) => imagesW(image));
  const imagesH = require.context("../assets/images/student/Course/H", true);
  const imagesListH = imagesH.keys().map((image) => imagesH(image));

  return (
    <div>
      {currentObj !== null ? (
        <div className="row m-3">
          <h3 className="blue-text">{currentObj.title}</h3>
          <div className="mb-3 col-lg-7 col-md-6 col-sm-12 col-xs-12 border-2 border-end">
            {currentObj.description ? (
              currentObj.description.map((d, index) => {
                return (
                  <Fragment key={index}>
                    <p className="text-secondary">{d.description}</p>
                  </Fragment>
                );
              })
            ) : (
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            )}
          </div>
          <div className="mb-3 col-lg-5 col-md-6 col-sm-12 col-xs-12">
            <h5 className="yellow-text">Price description: </h5>
            <p>{currentObj.priceDescription}</p>
            <div>
              {currentObj.sessions.length !== 0 && (
                <>
                  <h5 className="yellow-text">
                    The course dates are as follows:{" "}
                  </h5>
                  {currentObj.sessions.map((s, index) => {
                    return (
                      <Fragment key={index}>
                        <p className="blue-text">
                          Session {index + 1}:
                          <b className="mx-1 text-dark">
                            {moment(s[0]).format("L")}
                          </b>
                          <b className="text-dark">
                            - {moment(s[1]).format("L")}
                          </b>
                        </p>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </div>
            <div className="text-center mt-3">
              <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
                {imagesListH.map((img, index) => {
                  return (
                    <Fragment key={index}>
                      <Image width={300} height={500} src={img} preview={true} className=" rounded" />
                    </Fragment>
                  );
                })}
              </Carousel>

              <Carousel
                className="py-4"
                autoplay
                speed={1250}
                slidesToShow={1}
                dots={false}
              >
                {imagesListW.map((img, index) => {
                  return (
                    <Fragment key={index}>
                      <Image width={300} height={200} src={img} preview={true} className=" rounded"/>
                    </Fragment>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      ) : (
        <div className=" my-5">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default CourseModal;
