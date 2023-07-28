import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Button, Form, Input, Select } from "antd";
import CurrencyInput from 'react-currency-input-field';


export const PaymentForm = ({ ...props }) => {
  const [form] = Form.useForm();
  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        props.Register(values);
      })
      .catch((errorInfo) => {
        console.log("errorInfo ...", errorInfo);
      });
  };

  //const selected = "";

  return (
    <>
      <Form
        className="form border-2"
        name="basic"
        layout="vertical"
        size={" medium"}
        labelCol={{ span: 20 }}
        style={{ maxWidth: 600, height: 420 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <div className="row">
          <h5 className="text-start text-dark ">Enter Payment Information</h5>
          <div className="col-md-9">
            <div className="form-outline text-start">
              <Form.Item label="Amount" name="amount">
                <CurrencyInput
                  id="validationCustom04"
                  name="input-1"
                  //intlConfig={intlConfig}
                  className={`form-control`}
                  //onValueChange={handleOnValueChange}
                  decimalsLimit={6}
                  //value={value}
                  step={1}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-outline text-start">
              <Form.Item label="Currency" name="currency">
                <Select />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-outline text-start">
            <Form.Item label="Card">
              <CardElement />
            </Form.Item>
          </div>
        </div>

        <div className="row form-outline my-3">
          <Form.Item>
            <Button type="default" htmlType="submit" onClick={handleFormSubmit}>
              Confirm payment
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default PaymentForm;
