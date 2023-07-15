/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  addCourses,
  deleteCourse,
  getCourses,
  updateCourses,
} from "../../redux/courses/courseActions";
import { Button, Modal, Empty } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  LoadingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AddCourse from "./AddCourse";
import CourseModal from "../CourseModal";
import usePrevious from "../../helpers/usePrevious";
import UpdateCourse from "./UpdateCourse";

export const CoursesList = ({ ...props }) => {
  useEffect(() => {
    props.AllCourses();
  }, []);
  const course = { description: [], sessions: [] };
  const [currentObj, setCurrentObj] = useState(course);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [selctedId, setSelctedId] = useState();
  const [toUpdate, setToUpdate] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteModal(false);
  };

  const prev_loading = usePrevious(props.isLoadingCourse);
  useEffect(() => {
    if (prev_loading && !props.isLoadingCourse) {
      if (props.msg === 1) {
        props.AllCourses();
      }
      if (props.msg === 0) {
        toast.warn("Something went wrong !");
      }
    }
  }, [props.isLoadingCourse, props.courses]);

  const prev_loadingUp = usePrevious(props.isLoadingUpdate);
  useEffect(() => {
    if (prev_loadingUp && !props.isLoadingUpdate) {
      if (props.msg === 1) {
        props.AllCourses();
      }
      if (props.msg === 0) {
        toast.warn("Something went wrong !");
      }
    }
  }, [props.isLoadingUpdate, props.courses]);

  return (
    <div className="row">
      <h3 className="yellow-text">Course Management</h3>
      <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
        {!showUpdate ? (
          <AddCourse Create={props.Add} />
        ) : (
          <UpdateCourse
            {...{ toUpdate, setShowUpdate }}
            Update={props.Update}
          />
        )}
      </div>

      <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
        {props.isLoading ? (
          <table className="table">
            {props.courses.length !== 0 ? (
              <>
                <thead>
                  <tr>
                    <th scope="col blue-text">#</th>
                    <th scope="col">Title</th>
                    <th scope="col text-center">Actions</th>
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
                            <Button
                              type="default"
                              size="small"
                              shape="circle"
                              className="mx-2"
                              icon={<EyeOutlined />}
                              onClick={() => {
                                setIsModalOpen(true);
                                setCurrentObj(course);
                              }}
                            />
                            <Button
                              color="primary"
                              className="blue-text"
                              type="default"
                              size="small"
                              shape="circle"
                              onClick={() => {
                                setToUpdate(course);
                                setShowUpdate(true);
                              }}
                              icon={<EditOutlined />}
                            />
                            <Button
                              danger
                              className="mx-2"
                              type="default"
                              size="small"
                              shape="circle"
                              onClick={() => {
                                setDeleteModal(true);
                                setSelctedId(course._id);
                              }}
                              icon={<DeleteOutlined />}
                            />
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </>
            ) : (
              <Empty />
            )}
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

      <Modal
        title={"Are you sure to delete this Course ?"}
        open={DeleteModal}
        onCancel={handleCancel}
        onOk={() => {
          props.Delete(selctedId);
          setDeleteModal(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading,
  isLoadingCourse: state.courses.loading_create,
  isLoadingUpdate: state.courses.loading_update,
  msg: state.courses.codeMsg,
});

const mapActionToProps = {
  AllCourses: getCourses,
  Delete: deleteCourse,
  Create: addCourses,
  Update: updateCourses,
};

export default connect(mapStateToProps, mapActionToProps)(CoursesList);
