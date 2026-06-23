import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const DownloadCertificate = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const payload = {
        service_id: state.service_id,
        citizen_id: "2823",
        role_id: "6",
        request_id: state.request_id,
      };

      const response = await fetch(
        "http://localhost:8081/jamipariseva/api/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result?.data?.download_url) {
        window.open(result.data.download_url, "_blank");
      } else {
        alert("Download URL not received");
      }
    } catch (error) {
      console.error(error);
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  if (!state) {
    return (
      <div className="p-5 text-red-500">
        No application selected.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow rounded-lg">

      <div className="bg-steal-blue text-white p-4 text-xl font-bold">
        Download Certified Copy
      </div>

      <div className="p-6">

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-gray-500">Request ID</p>
            <p className="font-semibold">{state.request_id}</p>
          </div>

          <div>
            <p className="text-gray-500">Service</p>
            <p className="font-semibold">{state.service_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-semibold text-green-600">
              {state.status}
            </p>
          </div>

        </div>

        <button
          onClick={handleDownload}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {loading ? "Downloading..." : "Download Certified Copy"}
        </button>

      </div>
    </div>
  );
};

export default DownloadCertificate;