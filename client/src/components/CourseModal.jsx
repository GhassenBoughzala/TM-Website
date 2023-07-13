import React, { useState, Fragment, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Image, Empty } from "antd";
import moment from "moment";

export const CourseModal = ({ ...props }) => {
  const course = { description: [], sessions: [{ sessions: [] }], image: [] };
  const [currentObj, setCurrentObj] = useState(course);
  useEffect(() => {
    if (props.currentObj) {
      setCurrentObj(props.currentObj);
    }
  }, [props.currentObj]);

  return (
    <div>
      {currentObj !== null ? (
        <div className="row">
          <h3 className="blue-text">{currentObj.title}</h3>
          <div className="mb-3 col-lg-6 col-md-6 col-sm-12 col-xs-12 border-2 border-end">
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
          <div className="mb-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h5 className="yellow-text">Price description: </h5>
            <p>{currentObj.priceDescription}</p>
            <div>
              {currentObj.sessions.length !== 0 && (
                <h5 className="yellow-text">
                  The course dates are as follows:{" "}
                </h5>
              )}

              {currentObj.sessions.map((s, index) => {
                return (
                  <Fragment key={index}>
                    <p className="blue-text">
                      Session {index + 1}:
                      <b className="mx-1 text-dark">
                        {moment(s.sessions[0]).utc().format("L")}
                      </b>
                      <b className="text-dark">
                        - {moment(s.sessions[1]).utc().format("L")}
                      </b>
                    </p>
                  </Fragment>
                );
              })}
            </div>
            <div>
              {currentObj.image.map((img, index) => {
                return (
                  <Fragment key={index}>
                    <Image width={200} src={img.base64} preview={false} />
                  </Fragment>
                );
              })}
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
