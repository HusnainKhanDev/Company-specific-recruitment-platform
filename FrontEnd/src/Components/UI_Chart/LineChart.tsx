import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function LineChartUIC({ appsPerDay }: any) {
  let chartData;
  if(appsPerDay){
    chartData = appsPerDay.map((item: any) => ({
      name: item._id,   // formatted date
      value: item.count // number of apps that day
    }));
}
  return (
    <div className="w-[100%] h-[250px]">
      <ResponsiveContainer>
        <LineChart data={chartData}
        margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
