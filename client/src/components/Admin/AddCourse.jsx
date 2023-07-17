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
    <Card>
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
          <h2 className=" blue-text">Add Course</h2>
          <Form
            form={form}
            className="form"
            name="basic"
            layout="vertical"
            size={"medium"}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
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
                          <Form.Item
                            {...field}
                            label="Sessions"
                            name={field.name}
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
            <Form.Item name="priceDescription" label="Price description">
              <TextArea rows={2} />
            </Form.Item>
            <div className="row">
              <div className="col">
                <div className="form-outline text-end">
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
              </div>
              <div className="col">
                <div className="form-outline text-start">
                  <Form.Item>
                    <Button
                      //loading={props.isLoading}
                      type="default"
                      onClick={onReset}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </Card>
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
