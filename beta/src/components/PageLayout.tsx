import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navigation from "./Navigation";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: LucideIcon;
  breadcrumbs?: { label: string; href?: string }[];
}

const PageLayout = ({ children, title, description, icon: Icon, breadcrumbs = [] }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mt-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              {crumb.href ? (
                <Link to={crumb.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 mt-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-4 rounded border border-primary/20">
            <Icon className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t-2 border-primary mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h5 className="text-primary font-bold tracking-wide">FUGGER COMMAND CENTER</h5>
              <p className="text-muted-foreground text-sm mt-1">
                <span className="text-destructive">CLASSIFIED</span> · Secure Connection Established
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              <span className="text-primary font-mono">v0.1.0</span> · Terminal Access Granted
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
