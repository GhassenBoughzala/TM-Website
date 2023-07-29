import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Divider, Form, InputNumber, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatusMessages, { useMessages } from "../components/StatusMessages";
import { currencies } from "../helpers/Constants";

export const PaymentForm = ({ subId }) => {
  const [form] = Form.useForm();
  const elements = useElements();
  const stripe = useStripe();
  const [messages, addMessage] = useMessages();

  const [currency, setCurrency] = useState(" $ ");
  const [format, setFormat] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  const [User] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const handleAmountChange = (e) => {
    setFormat(e / 100);
    form.setFieldValue({ amount: format.toFixed(2) });
  };

  const handleFormSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    form
      .validateFields()
      .then(async (values) => {
        setisLoading(true);
        const { error: backendError, clientSecret } = await fetch(
          "http://localhost:5500/api/subscription/test",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentMethodType: "card",
              currency: values.currency,
              amount: values.amount,
            }),
          }
        ).then((r) => r.json());

        if (backendError) {
          addMessage(backendError.message);
          return;
        }

        //addMessage("Client secret returned");

        const { error: stripeError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: `${User.firstName} ${User.lastName}`,
              },
            },
          });

        if (stripeError) {
          // Show error to your customer (e.g., insufficient funds)
          addMessage(stripeError.message);
          return;
        }

        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
      })
      .catch((errorInfo) => {
        console.log("errorInfo ...", errorInfo);
      });
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
                {format.toFixed(2)} {currency}
              </h4>
            </Divider>
          </div>
        </div>
        <div className="row">
          <div className="form-outline text-start my-3">
            <Form.Item>
              <CardElement className="mx-5" disableLink={false} />
            </Form.Item>
          </div>
        </div>

        <div className="row form-outline text-center">
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              onClick={handleFormSubmit}
              loading={isLoading}
            >
              Confirm payment
            </Button>
          </Form.Item>
          <StatusMessages messages={messages} />
        </div>
      </Form>
    </>
  );
};

export default PaymentForm;
