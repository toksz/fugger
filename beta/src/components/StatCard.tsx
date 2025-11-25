import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
}

const StatCard = ({ icon: Icon, label, value, subtitle, trend }: StatCardProps) => {
  const trendColors = {
    up: "text-primary",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="industrial-card p-6 hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="stat-label">{label}</p>
          <p className="stat-value mt-2">{value}</p>
          {subtitle && (
            <p className={`text-sm mt-1 ${trend ? trendColors[trend] : "text-muted-foreground"}`}>
              {subtitle}
            </p>
          )}
        </div>
        <Icon className="h-8 w-8 text-primary opacity-75" />
      </div>
    </Card>
  );
};

export default StatCard;
