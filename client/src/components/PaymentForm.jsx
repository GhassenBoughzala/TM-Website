import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Divider, Form, InputNumber, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PaymentForm = ({subId}) => {
  console.log(subId);
  const [form] = Form.useForm();
  const elements = useElements();
  const stripe = useStripe();
  const handleFormSubmit = async () => {
    const cardElement = elements.getElement(CardElement);
    console.log(cardElement);
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((errorInfo) => {
        console.log("errorInfo ...", errorInfo);
      });
  };

  const [currency, setCurrency] = useState(" $ ");
  const [format, setFormat] = useState(0);

  const currencies = [
    {
      value: "USD",
      label: "USD",
      code: " $ ",
    },
    {
      value: "GBP",
      label: "GBP",
      code: " £ ",
    },
    {
      value: "EUR",
      label: "EUR",
      code: " € ",
    },
    {
      value: "CAD",
      label: "CAD",
      code: " C $ ",
    },
  ];

  const handleAmountChange = (e) => {
    setFormat(e / 100);
    form.setFieldValue({ amount: format.toFixed(2) });
  };

  return (
    <>
      <Form
        form={form}
        className="form justify-content-center"
        name="basic"
        layout="vertical"
        size={" medium "}
        labelCol={{ span: 20 }}
        style={{ height: 550 }}
      >
        <div className="row text-center">
          <div className="text-center mb-3">
            <FontAwesomeIcon
              icon="fa-brands fa-cc-visa"
              fontSize={50}
              className="blue-text"
            />
            <FontAwesomeIcon
              icon="fa-brands fa-cc-mastercard"
              fontSize={50}
              className="mx-2 blue-text"
            />
            <FontAwesomeIcon
              icon="fa-brands fa-cc-amex"
              fontSize={50}
              className="blue-text"
            />
            <FontAwesomeIcon
              icon="fa-brands fa-cc-jcb"
              fontSize={50}
              className="mx-2 blue-text"
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col col-4">
            <div className="form-outline text-start">
              <Form.Item
                label="Currency"
                name="currency"
                rules={[
                  {
                    required: true,
                    message: "Currency is required",
                  },
                ]}
              >
                <Select
                  options={currencies}
                  onSelect={(val, options) => {
                    setCurrency(options.code);
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col col-4">
            <div className="form-outline text-start">
              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Amount is required",
                  },
                ]}
              >
                {/* <CurrencyInput className=" form-" name="amount" step={1} /> */}
                <InputNumber
                  style={{ width: "100%" }}
                  min={100}
                  onChange={handleAmountChange}
                  addonBefore={currency}
                  addonAfter="cents"
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-outline text-center">
            <Divider orientation="center">
              <h4 className=" blue-text">
                {format.toFixed(2)} {currency}{" "}
              </h4>
            </Divider>
          </div>
        </div>
        <div className="row">
          <div className="form-outline text-start my-3">
            <Form.Item>
              <CardElement className="mx-5" />
            </Form.Item>
          </div>
        </div>

        <div className="row form-outline text-center">
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
