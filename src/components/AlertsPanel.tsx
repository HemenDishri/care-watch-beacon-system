import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, X } from "lucide-react";

interface Alert {
  id: string;
  patientName: string;
  patientId: string;
  severity: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "critical":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "warning":
      return <Clock className="h-4 w-4 text-warning" />;
    case "info":
      return <CheckCircle className="h-4 w-4 text-info" />;
    default:
      return null;
  }
};

const getSeverityVariant = (severity: string) => {
  switch (severity) {
    case "critical":
      return "destructive";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "secondary";
  }
};

export const AlertsPanel = ({ alerts, onAcknowledge, onDismiss }: AlertsPanelProps) => {
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Recent Alerts
          {unacknowledgedAlerts.length > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {unacknowledgedAlerts.length} New
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
            <p>No recent alerts</p>
            <p className="text-sm">All patients are stable</p>
          </div>
        ) : (
          <>
            {unacknowledgedAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="border rounded-lg p-3 bg-card border-l-4 border-l-destructive"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getSeverityIcon(alert.severity)}
                      <Badge variant={getSeverityVariant(alert.severity) as any} className="text-xs">
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="font-medium text-sm">{alert.patientName}</span>
                    </div>
                    <p className="text-sm text-foreground mb-2">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onAcknowledge(alert.id)}
                      className="h-7 px-2 text-xs"
                    >
                      Ack
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => onDismiss(alert.id)}
                      className="h-7 px-2"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {acknowledgedAlerts.length > 0 && (
              <>
                <div className="border-t pt-3 mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Acknowledged ({acknowledgedAlerts.length})
                  </h4>
                </div>
                {acknowledgedAlerts.slice(0, 3).map((alert) => (
                  <div 
                    key={alert.id} 
                    className="border rounded-lg p-3 bg-muted/30 opacity-60"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getSeverityIcon(alert.severity)}
                          <span className="font-medium text-sm">{alert.patientName}</span>
                          <CheckCircle className="h-3 w-3 text-success" />
                        </div>
                        <p className="text-sm text-foreground/80 mb-1">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => onDismiss(alert.id)}
                        className="h-7 px-2"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};