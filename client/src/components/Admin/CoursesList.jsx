/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCourses } from "../../redux/courses/courseActions";
import { Button, Modal } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import AddCourse from "./AddCourse";
import CourseModal from "../CourseModal";

export const CoursesList = ({ ...props }) => {
  useEffect(() => {
    props.AllCourses();
  }, []);
  const course = { description: [], sessions: [] };
  const [currentObj, setCurrentObj] = useState(course);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="row">
      <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
        <AddCourse />
      </div>

      <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
        {!props.isLoading ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col blue-text">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.courses.map((course, index) => {
                return (
                  <Fragment key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{course.title}</td>
                      <td>
                        {course.description[0].description.substring(0, 55)}...
                      </td>
                      <td>
                        <Button
                          type="default"
                          size="small"
                          shape="circle"
                          icon={<EyeOutlined />}
                          onClick={() => {
                            showModal();
                            setCurrentObj(course);
                          }}
                        />
                        <Button
                          danger
                          className="mx-2"
                          type="default"
                          size="small"
                          shape="circle"
                          icon={<DeleteOutlined />}
                        />
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-5">
            <LoadingOutlined
              style={{
                fontSize: 24,
              }}
              spin
            />
          </div>
        )}
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        width={1200}
        footer={null}
      >
        <CourseModal {...{ currentObj }}></CourseModal>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading,
});

const mapActionToProps = {
  AllCourses: getCourses,
};

export default connect(mapStateToProps, mapActionToProps)(CoursesList);
