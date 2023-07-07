import React, { useState } from "react";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Upload, Space, Card } from "antd";
import { connect } from "react-redux";
import { addCourses } from "../../redux/courses/courseActions";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const AddCourse = ({ ...props }) => {
  const [state, setState] = useState({});
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

    setState([...e.fileList]);
    console.log(state[0]);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    //console.log("Received values of form:", values);
    props.Add(values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    setState(e?.fileList);
    return e?.fileList;
  };

  const handleDescChange = () => {
    form.setFieldsValue({
      description: [],
    });
  };

  const handleSessionsChange = () => {
    form.setFieldsValue({
      sessions: [],
    });
  };

  const onFinishFailed = () => {
    console.log("Failed");
  };

  return (
    <Card>
      <h2 className=" blue-text">Add Course</h2>
      <Form
        className="form"
        name="basic"
        layout="vertical"
        size={"medium"}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        role="form"
        autoComplete="off"
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>

        <Form.List name="sessions" onChange={handleSessionsChange}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area ||
                      prevValues.sights !== curValues.sights
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Sessions"
                        name={[field.name, "sessions"]}
                      >
                        <RangePicker format={dateFormat} />
                      </Form.Item>
                    )}
                  </Form.Item>

                  <MinusCircleOutlined
                    className="mx-1"
                    onClick={() => remove(field.name)}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  className="text-start"
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add sessions
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="description" onChange={handleDescChange}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area ||
                      prevValues.sights !== curValues.sights
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Description"
                        name={[field.name, "description"]}
                      >
                        <TextArea rows={2} />
                      </Form.Item>
                    )}
                  </Form.Item>

                  <MinusCircleOutlined
                    className="mx-1"
                    onClick={() => remove(field.name)}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  className="text-start"
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add descriptions
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item name="priceDescription" label="Price description">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item
          label="Images"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            type="file"
            multiple={true}
            name="image"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
            customRequest={({ onSuccess }) => onSuccess("ok")}
            listType="picture"
            action=""
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <div className="form-outline text-center">
          <Form.Item>
            <Button
              //loading={props.isLoading}
              type="primary"
              htmlType="submit"
            >
              Confirm
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

const mapActionToProps = {
  Add: addCourses,
};
const mapToStateProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading,
});

export default connect(mapToStateProps, mapActionToProps)(AddCourse);
