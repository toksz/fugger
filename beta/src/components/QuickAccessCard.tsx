import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface QuickAccessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const QuickAccessCard = ({ icon: Icon, title, description, href }: QuickAccessCardProps) => {
  return (
    <Link to={href}>
      <Card className="industrial-card p-6 hover:border-primary transition-all group cursor-pointer">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-3 rounded">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </Card>
    </Link>
  );
};

export default QuickAccessCard;
