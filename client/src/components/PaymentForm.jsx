/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Divider, Form } from "antd";
import StatusMessages, { useMessages } from "../components/StatusMessages";
import { currencies } from "../helpers/Constants";
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

  const [currency, setCurrency] = useState(" ");
  const [isLoading, setisLoading] = useState(false);

  const [User] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const handleFormSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    try {
      setisLoading(true);
      addMessage("");
      const { error: backendError, clientSecret } = await fetch(
        `/api/subscription/create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethodType: "card",
            currency: props.subObj?.currency,
            amount: props.subObj?.topay,
            subId: props.subObj?._id,
            receipt_email: User.email,
            description: `Payment for ${props.subObj.title}`,
          }),
        }
      ).then((r) => r.json());

      if (backendError) {
        addMessage(backendError.message);
        setTypes("error");
        console.log(backendError);
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

      //addMessage(`Payment ${paymentIntent.status} ${paymentIntent.id}`);
      addMessage(`Payment ${paymentIntent.status}`);
      setTypes("success");
      props.Confirm(props.subObj._id);
      navTo("/payment-result");
      form.resetFields();
    } catch (errorInfo) {
      console.log("errorInfo ...", errorInfo);
    }
  };

  useEffect(() => {
    currencies.map((c) => {
      if (props.subObj.currency === c.label) {
        setCurrency(c.code);
      }
    });
  }, [props.subObj.currency]);

  return (
    <>
      <Form
        form={form}
        className="form justify-content-center"
        name="basic"
        layout="vertical"
        size={" medium "}
        labelCol={{ span: 20 }}
        style={{ height: 450 }}
      >
        <div className="row text-center">
          <h4 className=" blue-text my-4 mb-4">
            {props.subObj.course[0].title} Invoice
          </h4>
          <div className="text-center mb-4">
            
          </div>
        </div>

        <div className="row">
          <div className="form-outline text-center">
            <Divider orientation="center">
              <h4 className=" blue-text">
                {(props.subObj.topay / 100).toFixed(2)} {currency}
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
