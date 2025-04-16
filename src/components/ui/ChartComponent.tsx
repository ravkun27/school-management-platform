// components/ChartComponent.tsx
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "../../utils/helper";

const chartComponents = {
  line: LineChart,
  bar: BarChart,
  pie: PieChart,
};

interface ChartProps {
  data: any[];
  type: "line" | "bar" | "pie";
  xAxisKey: string;
  dataKey: string;
  className?: string;
}

export const ChartComponent = ({
  data,
  type,
  xAxisKey,
  dataKey,
  className,
}: ChartProps) => {
  const Chart = chartComponents[type];
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className={cn("h-64 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          {type !== "pie" && <XAxis dataKey={xAxisKey} />}
          {type !== "pie" && <YAxis />}
          <Tooltip />
          <Legend />

          {type === "line" ? (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#3b82f6"
              strokeWidth={2}
            />
          ) : type === "bar" ? (
            <Bar dataKey={dataKey} fill="#3b82f6" />
          ) : (
            <Pie
              dataKey={dataKey}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};
