import { useEffect, useState } from "react";
import { FileText, Users, Eye, Folder } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
}

function StatItem({ icon: Icon, value, label, suffix = "" }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="text-center space-y-2">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <div className="text-3xl md:text-4xl font-bold">
        {formatNumber(displayValue)}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function StatsSection() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return null;
  }

  const statsData = [
    {
      icon: FileText,
      value: stats?.publishedPosts || 0,
      label: "Artigos Publicados",
    },
    {
      icon: Folder,
      value: stats?.totalCategories || 0,
      label: "Categorias",
    },
    {
      icon: Eye,
      value: stats?.totalViews || 0,
      label: "Visualizações",
    },
    {
      icon: Users,
      value: stats?.totalSubscribers || 0,
      label: "Inscritos Newsletter",
    },
  ];

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
