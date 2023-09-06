/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Upload, Space, Card } from "antd";
import { connect } from "react-redux";
import { addCourses } from "../../redux/courses/courseActions";
import usePrevious from "../../helpers/usePrevious";
import { toast } from "react-toastify";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const AddCourse = ({ ...props }) => {
  const dateFormat = "YYYY/MM/DD";

  const convertToBase64 = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      file.base64 = e.target.result;
    };
    reader.readAsDataURL(file.originFileObj);
  };

  const handleFileUpload = async (e) => {
    let fileList = [...e.fileList];
    fileList.forEach((file) => {
      convertToBase64(file);
    });
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    props.Add(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleDescChange = () => {
    form.setFieldsValue({ description: [] });
  };

  const handleSessionsChange = () => {
    form.setFieldsValue({ sessions: [] });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const prev_loadingUp = usePrevious(props.isLoading);
  useEffect(() => {
    if (prev_loadingUp && !props.isLoading) {
      if (props.msg === 1) {
        onReset();
      }
      if (props.msg === 0) {
        toast.warn("Something went wrong !");
      }
    }
  }, [props.isLoading, props.msg]);

  return (
    <>
      {!props.isLoadingUp ? (
        <div className="text-center mt-5 row">
          <LoadingOutlined
            className="blue-text"
            style={{
              fontSize: 40,
            }}
            spin
          />
          <h5 className="blue-text">Loading course to update...</h5>
        </div>
      ) : (
        <>
        </>
      )}
    </>
  );
};

const mapActionToProps = {
  Add: addCourses,
};
const mapToStateProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading_create,
  isLoadingUp: state.courses.loading_update,
  msg: state.courses.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(AddCourse);
