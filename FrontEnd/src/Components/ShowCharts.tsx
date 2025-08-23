import React, { useEffect, useState } from "react";
import BarChartUIC from "./UI_Chart/BarChart";
import PieChartUIC from "./UI_Chart/PieChart";
import LineChartUIC from "./UI_Chart/LineChart";
import BarChart2UIC from "./UI_Chart/BarChart2";
import axios from "axios";

const ShowCharts = () => {


    const [AnalyticsData, setAnalyticsData] = useState<any>()

    useEffect(() => {
        async function CallApi() {
            try{
                let response = await axios.get("http://localhost:4000/get/analytics" ,{withCredentials: true})
                if(response){
                    setAnalyticsData(response.data.AnalyticsData)
                    console.log(response.data.AnalyticsData)
                }
            }
            catch(err){
              console.log(err)
            }
        }
        CallApi()
    }, [])

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col gap-6 w-full max-w-6xl">
        
        {/* Row 1 */}
        <div className="flex gap-6">
          <div className="bg-white rounded-2xl shadow-md p-4 w-1/2">
            <BarChartUIC ChartData={AnalyticsData?.ApplicationcountPerJob}/>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 w-1/2">
            <PieChartUIC ChartData={AnalyticsData?.CountStatus}/>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-6">
          <div className="bg-white rounded-2xl shadow-md p-4 w-1/2">
            <LineChartUIC appsPerDay={AnalyticsData?.appsPerDay} />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 w-1/2">
            <BarChart2UIC ChartData={AnalyticsData?.AvgScorePerJob} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShowCharts;
