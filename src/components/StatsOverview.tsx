import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertTriangle, Heart, TrendingUp } from "lucide-react";

interface StatsData {
  totalPatients: number;
  criticalPatients: number;
  activeAlerts: number;
  averageHeartRate: number;
}

interface StatsOverviewProps {
  stats: StatsData;
}

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  const statItems = [
    {
      title: "Total Patients",
      value: stats.totalPatients,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Critical Patients",
      value: stats.criticalPatients,
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      title: "Active Alerts",
      value: stats.activeAlerts,
      icon: TrendingUp,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Avg Heart Rate",
      value: `${stats.averageHeartRate} bpm`,
      icon: Heart,
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${item.bgColor}`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};