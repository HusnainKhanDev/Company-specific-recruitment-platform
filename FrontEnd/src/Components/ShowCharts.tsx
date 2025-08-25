import React, { useEffect, useState } from "react";
import BarChartUIC from "./UI_Chart/BarChart";
import PieChartUIC from "./UI_Chart/PieChart";
import LineChartUIC from "./UI_Chart/LineChart";
import BarChart2UIC from "./UI_Chart/BarChart2";
import axios from "axios";

const ShowCharts = () => {
  const [AnalyticsData, setAnalyticsData] = useState<any>();

  useEffect(() => {
    async function CallApi() {
      try {
        let response = await axios.get("http://localhost:4000/get/analytics", {
          withCredentials: true,
        });
        if (response) {
          setAnalyticsData(response.data.AnalyticsData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    CallApi();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-200 via-blue-50 to-cyan-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
          📊 Analytics Overview
        </h2>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Application Count */}
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl border border-white/30 p-5 transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Application Count Per Job
            </h3>
            <BarChartUIC ChartData={AnalyticsData?.ApplicationcountPerJob} />
          </div>

          {/* Status Distribution */}
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl border border-white/30 p-5 transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Categories of Applications (Status)
            </h3>
            <PieChartUIC ChartData={AnalyticsData?.CountStatus} />
          </div>

          {/* Applications Per Day */}
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl border border-white/30 p-5 transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Applications Per Day
            </h3>
            <LineChartUIC appsPerDay={AnalyticsData?.appsPerDay} />
          </div>

          {/* Avg Score Per Job */}
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl border border-white/30 p-5 transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Average Score Per Job
            </h3>
            <BarChart2UIC ChartData={AnalyticsData?.AvgScorePerJob} />
          </div>
        </div>
      </div>
    </div>


  );
};

export default ShowCharts;
