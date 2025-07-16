import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface MetricData {
  timestamp: string;
  value: number;
}

interface HealthMetricsChartProps {
  title: string;
  data: MetricData[];
  color: string;
  unit: string;
  type?: "line" | "bar";
  normalRange?: { min: number; max: number };
}

export const HealthMetricsChart = ({ 
  title, 
  data, 
  color, 
  unit, 
  type = "line",
  normalRange 
}: HealthMetricsChartProps) => {
  const formatTooltipValue = (value: number) => {
    return [`${value} ${unit}`, title];
  };

  const isValueNormal = (value: number) => {
    if (!normalRange) return true;
    return value >= normalRange.min && value <= normalRange.max;
  };

  const getValueColor = (value: number) => {
    if (!normalRange) return color;
    return isValueNormal(value) ? color : "#ef4444";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {normalRange && (
          <p className="text-xs text-muted-foreground">
            Normal range: {normalRange.min} - {normalRange.max} {unit}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="timestamp" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => new Date(value).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip 
                  formatter={formatTooltipValue}
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color}
                  strokeWidth={2}
                  dot={{ fill: color, strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: color, strokeWidth: 2 }}
                />
                {normalRange && (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey={() => normalRange.min} 
                      stroke="#10b981" 
                      strokeDasharray="5 5" 
                      strokeWidth={1}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey={() => normalRange.max} 
                      stroke="#10b981" 
                      strokeDasharray="5 5" 
                      strokeWidth={1}
                      dot={false}
                    />
                  </>
                )}
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="timestamp" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => new Date(value).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip 
                  formatter={formatTooltipValue}
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                />
                <Bar 
                  dataKey="value" 
                  fill={color}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};