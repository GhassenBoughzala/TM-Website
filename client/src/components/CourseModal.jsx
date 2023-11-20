/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Image, Empty, Carousel, Button, Modal, Form } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePrevious from "../helpers/usePrevious";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import BookModal from "./BookModal";
import shortid from "shortid";

export const CourseModal = ({ ...props }) => {
  const navTo = useNavigate();
  const { t } = useTranslation();
  const course = {
    description: [],
    priceDescription: [],
    sessions: [{ sessions: [] }],
    image: [],
  };
  const [form] = Form.useForm();
  const [currentObj, setCurrentObj] = useState(course);
  useEffect(() => {
    if (props.currentObj) {
      setCurrentObj(props.currentObj);
    }
  }, [props.currentObj]);

  const [openModal, setOpenModal] = useState(false);
  console.log('props', props);

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const prev_loadingUp = usePrevious(props.loadingSub);
  useEffect(() => {
    if (prev_loadingUp && !props.loadingSub) {
      if (props.msg === 1) {
        navTo("/");
      }
      if (props.msg === 0) {
        toast.warn("Something went wrong !");
      }
    }
  }, [props.loadingSub, props.msg]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="overflow-y-scroll overflow-x-hidden"
    >
      {currentObj !== null ? (
        <>
          <div className="row m-3">
            <h3 className="blue-text">
              {currentObj.title}
              {props.isAuth && (
                <div className="text-start my-2">
                  <Button
                    className="subs-btn"
                    size="large"
                    type="text"
                    onClick={() => setOpenModal(true)}
                  >
                    Book now
                  </Button>
                </div>
              )}
            </h3>

            {/* Course Side 1 */}
            <div className="mb-3 col-lg-7 col-md-6 col-sm-12 col-xs-12 border-2 border-end">
              {currentObj.description ? (
                currentObj.description.map((d, index) => {
                  return (
                    <Fragment key={shortid.generate() + index}>
                      <p className="text-secondary fs-6">{d.description}</p>
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
              {props.isAuth ? (
                <div className="text-center my-5">
                  <Button
                    className="subs-btn"
                    size="large"
                    type="text"
                    onClick={() => setOpenModal(true)}
                  >
                    Book now
                  </Button>
                </div>
              ) : (
                <div className="text-center my-5">
                  <Button
                    type="default"
                    size="large"
                    htmlType="submit"
                    onClick={() => {
                      navTo("/login");
                    }}
                  >
                    Login to book a course
                  </Button>
                </div>
              )}
            </div>
            {/* Course Side 2 */}
            <div className="mb-3 col-lg-5 col-md-6 col-sm-12 col-xs-12">
              <h5 className="yellow-text">{t("priceDesc")}</h5>

              {currentObj.priceDescription.map((p, index) => {
                return (
                  <Fragment key={shortid.generate() + index}>
                    <div className="row">
                      <span className="fs-6">
                        <i className="bi bi-dot"></i>
                        <span className="mx-1">{p.priceDescription}</span>
                      </span>
                      {p.notes && p.notes !== null && (
                        <p className="mx-4 my-2 fs-6 text-muted">
                          <i className="bi bi-info-circle-fill mx-1"></i>
                          {p.notes}
                        </p>
                      )}
                    </div>
                  </Fragment>
                );
              })}

              <div>
                {currentObj.sessions.length !== 0 && (
                  <>
                    <h5 className="yellow-text">{t("sessions")}</h5>
                    {currentObj.sessions.map((s, index) => {
                      return (
                        <Fragment key={shortid.generate() + index}>
                          <p className="blue-text fs-6">
                            <b className="mx-1">
                              {dayjs(s.startDate).format("MMM D")}
                            </b>
                            <b>- {dayjs(s.endDate).format("MMM D YYYY")}</b>
                          </p>
                        </Fragment>
                      );
                    })}
                  </>
                )}
              </div>
              <div className="text-center mt-3">
                <Carousel autoplay speed={1500} slidesToShow={1} dots={false}>
                  {currentObj.image.map((img, index) => {
                    return (
                      <Fragment key={shortid.generate() + index}>
                        <Image
                          width={"75%"}
                          height={"auto"}
                          src={img.base64}
                          alt={index}
                          preview={false}
                          className=" rounded my-5"
                        />
                      </Fragment>
                    );
                  })}
                </Carousel>
              </div>
            </div>

            {/* Book Modal */}
            <Modal
              open={openModal}
              onCancel={handleCancel}
              width={550}
              bodyStyle={{ height: "100%" }}
              footer={null}
              style={{ top: 0 }}
            >
              {!props.loadingSub ? (
                <div className="text-center">
                  <LoadingOutlined
                    style={{
                      fontSize: 40,
                      margin: 130,
                    }}
                    spin
                  />
                </div>
              ) : (
                <div className="row">
                  <h2 className=" blue-text mb-5 text-center mt-4">
                    Book {currentObj.title} Course
                  </h2>
                  <BookModal
                    {...{ currentObj, openModal, setOpenModal }}
                  ></BookModal>
                </div>
              )}
            </Modal>
            {/* End Book Modal */}
          </div>
          <div className="row d-block m-auto my-4">
            <h5 className="text-center">For further information contact us</h5>
            <Button
              type="default"
              className="text-center w-25 d-block m-auto"
              onClick={() => {
                navTo("/contact");
              }}
            >
              Contact us
            </Button>
          </div>
        </>
      ) : (
        <div className=" my-5">
          <Empty />
        </div>
      )}
    </motion.div>
  );
};
const mapActionToProps = {};
const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user_subs: state.subs.user_subs,
  loadingSub: state.subs.loading_create,
  loadingUserSubs: state.subs.loading,
  msg: state.subs.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(CourseModal);
