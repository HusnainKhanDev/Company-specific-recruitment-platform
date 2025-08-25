import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

type TooltipPayload = ReadonlyArray<any>;

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
  tooltipPayload?: ReadonlyArray<TooltipPayload>;
};

type GeometrySector = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

type PieLabelProps = PieSectorData &
  GeometrySector & {
    tooltipPayload?: any;
  };

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
}; 

export default function PieChartUIC({ ChartData }: any) {
  let formattedData;
  if(ChartData){
    formattedData = ChartData.map((item: any) => ({
      name: item._id,        // "Accepted" / "Rejected" / "Pending"
      value: item.totalCount
    }));
}
else{
  formattedData = []
}

  const STATUS_COLORS: Record<string, string> = {
    Accepted: "#00C49F",  // green
    Pending: "#0088FE",   // blue
    Rejected: "#ff0033",  // red
  };

  return (
    <div className="w-full h-[250px] relative">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {formattedData.map((entry: any) => (
              <Cell 
                key={`cell-${entry.name}`} 
                fill={STATUS_COLORS[entry.name] || "#8884d8"} 
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-5">
        <h1 className="text-green-500 font-medium">Accepted</h1>
        <h1 className="text-blue-600 font-medium">Pending</h1>
        <h1 className="text-red-600 font-medium">Rejected</h1>
      </div>
    </div>
  );
}


