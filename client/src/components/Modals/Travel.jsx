import React from 'react'
import { TravelDesc } from '../../helpers/StudentLifeDesc';

export const Travel = () => {
    return(
        <div className="row">
        <h3 className="blue-text">Travel</h3>
        <div className="mb-3 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          {TravelDesc.map((d, index) => {
            return <p key={index}>{d.desc}</p>;
          })}
        </div>
      </div>
    )
}

export default Travel