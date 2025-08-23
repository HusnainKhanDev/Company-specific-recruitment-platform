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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
