import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export interface BarData {
  label: string; 
  value: number;  
  [key: string]: any; 
}

interface SimpleBarChartProps {
  data: BarData[];
  height?: number; 
  barColor?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  xKey?: string; 
  yKey?: string; 
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  height = 240,
  barColor = "#1976d2",
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  xKey = "label",
  yKey = "value",
}) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={safeData} margin={{ top: 16, right: 24, left: 8, bottom: 24 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          {showTooltip && <Tooltip />}
          {showLegend && <Legend verticalAlign="top" height={36} />}
          <Bar dataKey={yKey} fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
