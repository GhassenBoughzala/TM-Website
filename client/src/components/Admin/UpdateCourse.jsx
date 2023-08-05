/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Upload, Space, Card } from "antd";
import { connect } from "react-redux";
import { updateCourses } from "../../redux/courses/courseActions";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const UpdateCourse = ({ ...props }) => {
  const dateFormat = "YYYY/MM/DD";

  useEffect(() => {
    if (!props.isLoading) props.setShowUpdate(false);
  }, [props.isLoading]);

  const convertToBase64 = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      file.base64 = e.target.result;
    };
    reader.readAsDataURL(file.originFileObj);
  };

  const handleFileUpload = async (e) => {
    let fileList = [...e.fileList];
    if (props.toUpdate.image.length === 0) {
      fileList.forEach((file) => {
        convertToBase64(file);
      });
    }
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    props.Update(values, props.toUpdate._id);
    onReset();
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
    form.setFieldsValue({
      description: [],
    });
  };

  const handleSessionsChange = () => {
    form.setFieldsValue({
      sessions: [],
    });
  };

  //console.log(props.toUpdate.sessions.map((x) => [dayjs(x[1]), dayjs(x[0])]));

  const fieldsToUpdate = [
    { name: ["title"], value: props.toUpdate.title },
    { name: ["backgroundImage"], value: props.toUpdate.backgroundImage },
    { name: ["description"], value: props.toUpdate.description },
    {
      name: ["sessions"],
      value: props.toUpdate.sessions.map((x) => [dayjs(x[1]), dayjs(x[0])]),
    },
    { name: ["priceDescription"], value: props.toUpdate.priceDescription },
  ];

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

  return (
    <Card loading={!props.isLoading}>
      <h3 className="blue-text">Update {props.toUpdate.title} Course</h3>
      <Form
        fields={fieldsToUpdate}
        form={form}
        className="form"
        name="basic"
        layout="vertical"
        size={"medium"}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        role="form"
        autoComplete="off"
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>

        <Form.Item
          label="Background Image"
          name="backgroundImage"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            type="file"
            multiple={false}
            name="backgroundImage"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
            customRequest={({ onSuccess }) => onSuccess("ok")}
            listType="picture-card"
            action=""
            maxCount={1}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Background Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            type="file"
            multiple={false}
            name="image"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
            customRequest={({ onSuccess }) => onSuccess("ok")}
            listType="picture"
            action=""
            maxCount={4}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.List name="description" onChange={handleDescChange}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key}>
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
                        <TextArea rows={4} />
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

        <Form.List name="sessions" onChange={handleSessionsChange}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key}>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area ||
                      prevValues.sights !== curValues.sights
                    }
                  >
                    {() => (
                      <Form.Item {...field} label="Sessions" name={field.name}>
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

        <Form.Item name="priceDescription" label="Price description">
          <TextArea rows={2} />
        </Form.Item>
        <div className="row">
          <div className="col">
            <div className="form-outline text-end">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </div>
          </div>

          <div className="col">
            <div className="form-outline text-start">
              <Form.Item>
                <Button
                  danger
                  type="default"
                  onClick={() => {
                    props.setShowUpdate(false);
                  }}
                >
                  Cancel
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </Card>
  );
};

const mapActionToProps = {
  Update: updateCourses,
};
const mapToStateProps = (state) => ({
  courses: state.courses.courses,
  isLoading: state.courses.loading_update,
  msg: state.courses.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(UpdateCourse);
