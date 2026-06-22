import React, { useEffect, useState } from "react";

const LocationCard = ({ setShowSearch, setShowReveneuDetails, setLgd_village_code }) => {
  const [districtList, setDistrictList] = useState([]);
  const [subDivisionList, setSubDivisionList] = useState([]);
  const [circleList, setCircleList] = useState([]);
  const [tehsilList, setTehsilList] = useState([]);
  const [villageList, setVillageList] = useState([]);
  const [reset, setReset] = useState(false);

  const hierarchyConfig = {
    district: {
      lgd_name: "lgd_dist_code",
      request_for_value: "subdivision",
      setNextList: setSubDivisionList,
      clearLists: [
        setSubDivisionList,
        setCircleList,
        setTehsilList,
        setVillageList,
      ],
    },
    subdivision: {
      lgd_name: "lgd_subdiv_code",
      request_for_value: "circle",
      setNextList: setCircleList,
      clearLists: [setCircleList, setTehsilList, setVillageList],
    },
    circle: {
      lgd_name: "lgd_circle_code",
      request_for_value: "tehsil",
      setNextList: setTehsilList,
      clearLists: [setTehsilList, setVillageList],
    },
    tehsil: {
      lgd_name: "lgd_tehsil_code",
      request_for_value: "village",
      setNextList: setVillageList,
      clearLists: [setVillageList],
    },
  };

  const getLocation = async ({ lgd_name, lgd_code, request_for_value }) => {
    try {
      const postData = { [lgd_name]: lgd_code, request_for: request_for_value };
      const response = await fetch(
        "http://localhost:8081/jamipariseva/api/location",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        },
      );
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      return [];
    }
  };

  const fetchInitialDistricts = async () => {
    const Newlist = await getLocation({
      lgd_name: "lgd_district_code",
      lgd_code: "",
      request_for_value: "district",
    });
    setDistrictList(Newlist);
  };

  useEffect(() => {
    fetchInitialDistricts();
  }, []);

  const handleLocationChange = async (e, currentLevel) => {
    const selectedCode = e.target.value;
    const config = hierarchyConfig[currentLevel];

    if (!config) return;

    config.clearLists.forEach((clearAction) => clearAction([]));

    if (!selectedCode) return;

    const newList = await getLocation({
      lgd_name: config.lgd_name,
      lgd_code: selectedCode,
      request_for_value: config.request_for_value,
    });

    config.setNextList(newList);
  };

  const handleReset = () => {
    setDistrictList([]);
    setSubDivisionList([]);
    setCircleList([]);
    setTehsilList([]);
    setVillageList([]);
    fetchInitialDistricts();
    setReset(false);
    setShowSearch(false);
    setShowReveneuDetails(false);
  };

  const handleVillageCode = (e) =>{
    // console.log(e.target.value)
    setLgd_village_code(e.target.value)
  }

  return (
    <div>
      <div className="bg-steal-blue px-6 rounded-t-[4px] py-3 text-white font-bold text-xl">
        Location Details
      </div>
      <div className="grid grid-cols-3 bg-white border border-steal-blue py-10 px-10 gap-y-10">
        {/* District */}
        <div className="grid grid-cols-2">
          <label
            htmlFor="district"
            className="text-richblack-900 text-sm justify-self-end font-semibold p-2"
          >
            District:
          </label>
          <select
            name="district"
            id="district"
            onChange={(e) => handleLocationChange(e, "district")}
            className="bg-richblack-25 px-4 py-2 rounded-md text-richblack-300"
          >
            {districtList.length > 0 && <option value="">--select--</option>}
            {districtList.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name_eng}
              </option>
            ))}
          </select>
        </div>

        {/* Sub Division */}
        <div className="grid grid-cols-2">
          <label
            htmlFor="subdivision"
            className="text-richblack-900 text-sm font-semibold p-2 justify-self-end"
          >
            Sub Division:
          </label>
          <select
            name="subdivision"
            id="subdivision"
            className="bg-richblack-25 px-4 py-2 rounded-md text-richblack-300"
            onChange={(e) => handleLocationChange(e, "subdivision")}
          >
            {subDivisionList.length > 0 && <option value="">--select--</option>}
            {subDivisionList.map((sub) => (
              <option key={sub.code} value={sub.code}>
                {sub.name_eng}
              </option>
            ))}
          </select>
        </div>

        {/* Revenue Circle */}
        <div className="grid grid-cols-2">
          <label
            htmlFor="revenueCircle"
            className="text-richblack-900 text-sm font-semibold p-2 justify-self-end"
          >
            Revenue Circle:
          </label>
          <select
            name="revenueCircle"
            id="revenueCircle"
            className="bg-richblack-25 px-4 py-2 rounded-md text-richblack-300"
            onChange={(e) => handleLocationChange(e, "circle")}
          >
            {circleList.length > 0 && <option value="">--select--</option>}
            {circleList.map((circle) => (
              <option key={circle.code} value={circle.code}>
                {circle.name_eng}
              </option>
            ))}
          </select>
        </div>

        {/* Tehsil */}
        <div className="grid grid-cols-2">
          <label
            htmlFor="tehsil"
            className="text-richblack-900 text-sm font-semibold p-2 justify-self-end"
          >
            Tehsil:
          </label>
          <select
            name="tehsil"
            id="tehsil"
            className="bg-richblack-25 px-4 py-2 rounded-md text-richblack-300"
            onChange={(e) => handleLocationChange(e, "tehsil")}
          >
            {tehsilList.length > 0 && <option value="">--select--</option>}
            {tehsilList.map((tehsil) => (
              <option key={tehsil.code} value={tehsil.code}>
                {tehsil.name_eng}
              </option>
            ))}
          </select>
        </div>

        {/* Mouja (Village) */}
        <div className="grid grid-cols-2">
          <label
            htmlFor="mouja"
            className="text-richblack-900 text-sm font-semibold p-2 justify-self-end"
          >
            Mouja:
          </label>
          <select
            name="mouja"
            id="mouja"
            className="bg-richblack-25 px-4 py-2 rounded-md text-richblack-300"
            onChange={handleVillageCode}
          >
            {villageList.length > 0 && <option value="">--select--</option>}
            {villageList.map((village) => (
              <option key={village.code} value={village.code}
                onSelect={handleVillageCode}
              >
                {village.name_eng}
              </option>
            ))}
          </select>
        </div>

        {!reset && (
          <div className="flex justify-center">
            <button
              onClick={() => {
                setReset(true);
                setShowSearch(true);
              }}
              className="bg-steal-blue w-fit px-4 flex flex-row justify-center items-center rounded-md font-bold text-white active:scale-95"
            >
              GO
            </button>
          </div>
        )}
        {reset && (
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="bg-steal-blue w-fit px-4 flex flex-row justify-center items-center rounded-md font-bold text-white active:scale-95"
            >
              RESET
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
