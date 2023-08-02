import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Divider, Form, InputNumber, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatusMessages, { useMessages } from "../components/StatusMessages";
import { currencies } from "../helpers/Constants";
import { ServerURL } from "../helpers/urls";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { confirmPayment } from "../redux/subs/subsActions";

export const PaymentForm = ({ ...props }) => {
  const [form] = Form.useForm();
  const elements = useElements();
  const navTo = useNavigate();
  const stripe = useStripe();
  const [messages, addMessage] = useMessages();
  const [types, setTypes] = useState("");

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
        addMessage("");
        const { error: backendError, clientSecret } = await fetch(
          `${ServerURL}/api/subscription/test`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentMethodType: "card",
              currency: values.currency,
              amount: values.amount,
              subId: props.subId,
              receipt_email: User.email,
              description: '3% of your purchase goes toward our ocean cleanup effort!'
            }),
          }
        ).then((r) => r.json());

        if (backendError) {
          addMessage(backendError.message);
          setTypes("error");
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
          setTypes("warning");
          setisLoading(false);
          return;
        }

        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.

        addMessage(`Payment ${paymentIntent.status} ${paymentIntent.id}`);
        setTypes("success");
        props.Confirm(props.subId);
        navTo("/payment-result");
        form.resetFields();
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
          <h4 className=" blue-text my-4 mb-4"> Invoice </h4>
          <div className="text-center mb-4">
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
          <div className="text-center">Payment Information</div>
          <div className="form-outline text-start my-3">
            <Form.Item>
              <CardElement
                className="mx-5"
                options={{
                  disableLink: true,
                  hidePostalCode: true,
                }}
              />
            </Form.Item>
          </div>
        </div>

        <div className="row form-outline text-center">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleFormSubmit}
              loading={isLoading}
            >
              Confirm payment
            </Button>
          </Form.Item>
          <div className="text-center">
            <StatusMessages messages={messages} type={types} />
          </div>
        </div>
      </Form>
    </>
  );
};

const mapActionToProps = {
  Confirm: confirmPayment,
};
const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  loadingUpdate: state.subs.update,
  msg: state.subs.codeMsg,
});

export default connect(mapToStateProps, mapActionToProps)(PaymentForm);
