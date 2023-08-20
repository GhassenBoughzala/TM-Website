// A small set of helpers for displaying messages while in development.
import { Alert } from "antd";
import React, { useReducer } from "react";

// `StatusMessages` is a helper component for displaying messages while in
// development. This has no impact on your integration and can be deleted.
const StatusMessages = ({ messages, type }) =>
  messages.length ? (
    <div id="messages" role="alert">
      {messages.map((m, i) => (
        <div key={i}>
          <Alert
            message={maybeLink(m)}
            type={type}
            style={{ width: "50%", margin: "auto" }}
            showIcon
          />
        </div>
      ))}
    </div>
  ) : (
    ""
  );

const maybeLink = (m) => {
  //https://dashboard.stripe.com/test/payments
  const piDashboardBase = "";
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: m.replace(
          /(pi_(\S*)\b)/g,
          `<a href="${piDashboardBase}/$1" target="_blank">$1</a>`
        ),
      }}
    ></span>
  );
};

// Small hook for adding a message to a list of messages.
const useMessages = () => {
  // helper for displaying status messages.
  return useReducer((messages, message) => {
    // Embed link
    if (message === "") {
      return [];
    } else {
      return [...messages, message];
    }
  }, []);
};

export default StatusMessages;
export { useMessages };
