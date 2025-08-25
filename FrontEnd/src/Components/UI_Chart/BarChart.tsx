import React from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BarChartUIC = ({ChartData}: any) => {
  let Data;
  if(ChartData){
    Data = ChartData.map((i: any) => {
      return {Job_Title: i.title , Appication_Count: i.countApplicants}
    })
  }


  return (
    <div className="w-[100%] h-[250px]">
      <ResponsiveContainer>
        <BarChart
          data={Data}
          margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Job_Title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Appication_Count" fill="#0dbf43" activeBar={<Rectangle fill="blue" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartUIC;
