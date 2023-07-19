import React, { useState, Fragment, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Image, Empty, Carousel, Button, Modal, Form, Select } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const CourseModal = ({ ...props }) => {
  const course = { description: [], sessions: [{ sessions: [] }] };
  const [form] = Form.useForm();
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
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setData({
          course: currentObj._id,
          level: values,
        });
        console.log(data);
      })
      .catch((errorInfo) => {
        toast.error("Register failed !");
        console.log("errorInfo ...", errorInfo);
      });
  };

  const options = [
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" },
  ];

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
                <h5 className=" blue-text">
                  Connect or Register to book a course <Link to="/login"></Link>
                </h5>
              </div>
            )}
          </div>
          <div className="mb-3 col-lg-5 col-md-6 col-sm-12 col-xs-12">
            <h5 className="yellow-text">Price description: </h5>
            <p>{currentObj.priceDescription}</p>
            <div>
              {currentObj.sessions.length !== 0 && (
                <>
                  <h5 className="yellow-text">
                    The course dates are as follows:
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
                      <Image
                        width={300}
                        height={500}
                        src={img}
                        alt={index}
                        preview={true}
                        className=" rounded"
                      />
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
                      <Image
                        width={300}
                        height={200}
                        src={img}
                        alt={index}
                        preview={true}
                        className=" rounded"
                      />
                    </Fragment>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <Modal
            open={openModal}
            onCancel={handleCancel}
            width={600}
            bodyStyle={{ height: 300 }}
            footer={null}
          >
            <div className="row">
              <h2 className=" blue-text mb-5">
                Book {currentObj.title} Course
              </h2>
              <Form
                form={form}
                className="form"
                name="basic"
                layout="vertical"
                size={"large"}
                labelCol={{ span: 20 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
              >
                <div className="row mb-5">
                  <div className="col-md-4">
                    <div className="form-outline text-start">
                      <h5>Select your level:</h5>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-outline text-start">
                      <Form.Item
                        //label="Level"
                        name="level"
                        rules={[
                          {
                            required: true,
                            message: "Please input your level !",
                          },
                        ]}
                      >
                        <Select options={options}></Select>
                      </Form.Item>
                    </div>
                  </div>
                </div>

                <div className="form-outline text-center">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmltype="submit"
                      onClick={handleFormSubmit}
                    >
                      Confirm
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </Modal>
        </div>
      ) : (
        <div className=" my-5">
          <Empty />
        </div>
      )}
    </div>
  );
};
const mapActionToProps = {};
const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapToStateProps, mapActionToProps)(CourseModal);
