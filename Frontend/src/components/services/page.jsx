import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard/card";

const AvailableServices = () => {
  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    try {
      const postData = { citizen_id: "2823", role_id: "6" };
      const response = await fetch(
        "http://localhost:8081/jamipariseva/api/getservices",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        },
      );
      const apiresponse = await response.json();
      if (apiresponse?.success) {
        setServices(apiresponse.data);
        console.log(services);
      }
    } catch (error) {
      console.error("Error : ", error);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <>
      <div className="p-2">
        <h6 className="text-xl font-medium text-gray-800">
          Available Services:
        </h6>
        <div className="my-4 mx-4 flex gap-4 flex-wrap">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              index={idx}
              title={service.service_name}
              description={service.description}
              path={service.service_path}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AvailableServices;
