import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Thermometer, Activity, Droplets, Eye } from "lucide-react";

interface PatientData {
  id: string;
  name: string;
  age: number;
  room: string;
  status: "critical" | "warning" | "stable" | "good";
  lastUpdate: string;
  vitals: {
    heartRate: number;
    temperature: number;
    bloodPressure: string;
    oxygenSaturation: number;
  };
}

interface PatientCardProps {
  patient: PatientData;
  onViewDetails: (patientId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "destructive";
    case "warning":
      return "warning";
    case "stable":
      return "info";
    case "good":
      return "success";
    default:
      return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "critical":
      return "🚨";
    case "warning":
      return "⚠️";
    case "stable":
      return "📊";
    case "good":
      return "✅";
    default:
      return "📋";
  }
};

export const PatientCard = ({ patient, onViewDetails }: PatientCardProps) => {
  return (
    <Card className="w-full transition-all hover:shadow-lg border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{patient.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Age: {patient.age} • Room: {patient.room}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusColor(patient.status) as any} className="text-xs">
              {getStatusIcon(patient.status)} {patient.status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-xs text-muted-foreground">Heart Rate</p>
              <p className="font-semibold">{patient.vitals.heartRate} bpm</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="font-semibold">{patient.vitals.temperature}°F</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">Blood Pressure</p>
              <p className="font-semibold">{patient.vitals.bloodPressure}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-cyan-500" />
            <div>
              <p className="text-xs text-muted-foreground">O2 Saturation</p>
              <p className="font-semibold">{patient.vitals.oxygenSaturation}%</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Last updated: {patient.lastUpdate}
          </p>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewDetails(patient.id)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};