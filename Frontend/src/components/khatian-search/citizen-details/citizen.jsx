import React, { useState } from "react";
import DetailCard from "./detailcard";

const CitizenDetails = () => {
  const [UserData, setUserData] = useState([
    { label: "Name", value: "Arup Debnath" },
    { label: "Email ID", value: "arup@gmail.com" },
    { label: "Mobile", value: "XXXXXX3801" },
    { label: "District", value: "Khowai" },
    { label: "Sub-Division", value: "Teliamura" },
    { label: "BAC/Block/MC/NP/AMC", value: "Teliamura" },
    { label: "VC/GP/Ward", value: "Ward No.4" },
    { label: "Police Station", value: "Teliamura" },
    { label: "Pincode", value: "799205" },
  ]);
  return (
    <div className="border border-blue-100 rounded-t">
      <h2 className="text-xl font-bold bg-steal-blue px-5 py-2 text-white">
        Citizen Details
      </h2>

      <div className="grid grid-cols-3 gap-x-4 gap-y-2 p-4 text-sm text-gray-600">
        {UserData.map((data, idx)=>{
          return <DetailCard key={idx} label={data.label} value={data.value} />
        })}
      </div>
    </div>
  );
};

export default CitizenDetails;
