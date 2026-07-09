import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        {trend && (
          <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-400' : 'text-destructive'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
