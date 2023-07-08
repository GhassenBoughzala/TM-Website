import React from "react";
import { WorkDesc } from "../../helpers/StudentLifeDesc";

export const Work = () => {
  return (
    <div className="row">
      <h3 className="blue-text">Work & Research Experience </h3>
      <div className="mb-3 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        {WorkDesc.map((d, index) => {
          return <p key={index}>{d.desc}</p>;
        })}
      </div>
    </div>
  );
};

export default Work;
