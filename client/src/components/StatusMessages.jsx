
import { Alert } from "antd";
import React, { useReducer } from "react";
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

const useMessages = () => {
  return useReducer((messages, message) => {
    if (message === "") {
      return [];
    } else {
      return [...messages, message];
    }
  }, []);
};

export default StatusMessages;
export { useMessages };
