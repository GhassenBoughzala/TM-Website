import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

export const Loader = () => {
  return (
    <div className="text-center">
      <LoadingOutlined
        className="yellow-text classes-loader"
        style={{
          fontSize: 40,
          marginTop: 330,
          marginBottom: 330,
        }}
        spin
      />
    </div>
  );
};

export default Loader;
