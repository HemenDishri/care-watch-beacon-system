import { useState, useEffect } from "react";
import { PatientCard } from "@/components/PatientCard";
import { HealthMetricsChart } from "@/components/HealthMetricsChart";
import { AlertsPanel } from "@/components/AlertsPanel";
import { StatsOverview } from "@/components/StatsOverview";
import { Button } from "@/components/ui/button";
import { Activity, RefreshCw } from "lucide-react";

// Mock data for demonstration
const generateMockData = () => {
  const patients = [
    {
      id: "1",
      name: "Sarah Johnson",
      age: 67,
      room: "ICU-101",
      status: "critical" as const,
      lastUpdate: "2 min ago",
      vitals: {
        heartRate: 125,
        temperature: 101.2,
        bloodPressure: "160/95",
        oxygenSaturation: 88
      }
    },
    {
      id: "2", 
      name: "Michael Chen",
      age: 45,
      room: "202",
      status: "warning" as const,
      lastUpdate: "5 min ago",
      vitals: {
        heartRate: 95,
        temperature: 99.8,
        bloodPressure: "140/85",
        oxygenSaturation: 94
      }
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      age: 32,
      room: "305",
      status: "stable" as const,
      lastUpdate: "8 min ago",
      vitals: {
        heartRate: 72,
        temperature: 98.6,
        bloodPressure: "120/78",
        oxygenSaturation: 98
      }
    },
    {
      id: "4",
      name: "James Wilson",
      age: 58,
      room: "156",
      status: "good" as const,
      lastUpdate: "12 min ago",
      vitals: {
        heartRate: 68,
        temperature: 98.4,
        bloodPressure: "115/72",
        oxygenSaturation: 99
      }
    }
  ];

  const alerts = [
    {
      id: "1",
      patientName: "Sarah Johnson",
      patientId: "1",
      severity: "critical" as const,
      message: "Heart rate exceeding 120 bpm for 10+ minutes",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      acknowledged: false
    },
    {
      id: "2",
      patientName: "Sarah Johnson", 
      patientId: "1",
      severity: "critical" as const,
      message: "Oxygen saturation dropped below 90%",
      timestamp: new Date(Date.now() - 180000).toISOString(),
      acknowledged: false
    },
    {
      id: "3",
      patientName: "Michael Chen",
      patientId: "2",
      severity: "warning" as const,
      message: "Elevated temperature detected",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      acknowledged: true
    }
  ];

  const heartRateData = Array.from({ length: 12 }, (_, i) => ({
    timestamp: new Date(Date.now() - (11 - i) * 300000).toISOString(),
    value: 70 + Math.random() * 30 + (i > 8 ? 20 : 0)
  }));

  const temperatureData = Array.from({ length: 12 }, (_, i) => ({
    timestamp: new Date(Date.now() - (11 - i) * 300000).toISOString(),
    value: 98.0 + Math.random() * 3 + (i > 9 ? 1 : 0)
  }));

  const stats = {
    totalPatients: patients.length,
    criticalPatients: patients.filter(p => p.status === "critical").length,
    activeAlerts: alerts.filter(a => !a.acknowledged).length,
    averageHeartRate: Math.round(patients.reduce((sum, p) => sum + p.vitals.heartRate, 0) / patients.length)
  };

  return { patients, alerts, heartRateData, temperatureData, stats };
};

export default function Dashboard() {
  const [data, setData] = useState(generateMockData());
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refreshData = () => {
    setData(generateMockData());
    setLastRefresh(new Date());
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleViewPatientDetails = (patientId: string) => {
    console.log("View details for patient:", patientId);
    // In a real app, this would navigate to a detailed patient view
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setData(prev => ({
      ...prev,
      alerts: prev.alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true }
          : alert
      )
    }));
  };

  const handleDismissAlert = (alertId: string) => {
    setData(prev => ({
      ...prev,
      alerts: prev.alerts.filter(alert => alert.id !== alertId)
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              HealthMonitor Pro
            </h1>
            <p className="text-muted-foreground">Remote Patient Health Monitoring System</p>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
            <Button onClick={refreshData} variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview stats={data.stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Cards - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">Active Patients</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {data.patients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onViewDetails={handleViewPatientDetails}
                />
              ))}
            </div>
          </div>

          {/* Alerts Panel - Right 1/3 */}
          <div className="space-y-6">
            <AlertsPanel
              alerts={data.alerts}
              onAcknowledge={handleAcknowledgeAlert}
              onDismiss={handleDismissAlert}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthMetricsChart
            title="Heart Rate Trends"
            data={data.heartRateData}
            color="#ef4444"
            unit="bpm"
            normalRange={{ min: 60, max: 100 }}
          />
          <HealthMetricsChart
            title="Temperature Trends"
            data={data.temperatureData}
            color="#f97316"
            unit="°F"
            normalRange={{ min: 97.0, max: 99.0 }}
          />
        </div>
      </div>
    </div>
  );
}