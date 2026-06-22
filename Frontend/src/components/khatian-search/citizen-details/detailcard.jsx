import React from "react";

const DetailCard = (props) => {
  return (
    <div className="grid grid-cols-2 gap-1">
      <span className="font-semibold justify-self-end text-gray-900">{props.label}</span>
      <span className="">: {props.value}</span>
    </div>
  );
};

export default DetailCard;
