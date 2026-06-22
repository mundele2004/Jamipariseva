import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CitizenDetails from "./citizen-details/citizen";
import RevenueDetails from "./revenue-details/card";
import LocationCard from "./location-details/LocationCard";
import KhatianVerification from "./Khatian-verification/KhatianVerificationCard";

function Khatian_search() {
  const { handleSubmit } = useForm();
  const [showSearch, setShowSearch] = useState(false);
  const [showReveneuDetails, setShowReveneuDetails] = useState(false);
  const [lgd_village_code, setLgd_village_code] = useState();
  const [verifiedKhatianList, setVerifiedKhatianList] = useState([])

  // useEffect(()=>{
  //   console.log(verifiedKhatianList)
  // }, [verifiedKhatianList])

  const submitHandler = (data) => {};

  return (
    <div className="flex flex-col gap-10">
      <div>
        <CitizenDetails />
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <LocationCard
          setShowSearch={setShowSearch}
          setShowReveneuDetails={setShowReveneuDetails}
          setLgd_village_code={setLgd_village_code}
        />
        {showSearch && (
          <KhatianVerification
            setShowReveneuDetails={setShowReveneuDetails}
            lgd_village_code={lgd_village_code}
            verifiedKhatianList={verifiedKhatianList}
            setVerifiedKhatianList={setVerifiedKhatianList}
          />
        )}
      </form>
      {showReveneuDetails && <RevenueDetails verifiedKhatianList={verifiedKhatianList} setVerifiedKhatianList={setVerifiedKhatianList}/>}
    </div>
  );
}

export default Khatian_search;
