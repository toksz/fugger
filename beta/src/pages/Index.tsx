import Navigation from "@/components/Navigation";
import StatCard from "@/components/StatCard";
import QuickAccessCard from "@/components/QuickAccessCard";
import { Factory, TrendingUp, Users, Package, Gem, Calculator, Map, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="border-b border-primary/30 bg-gradient-to-b from-card to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: 0.05
        }} />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded mb-6">
              <span className="text-primary text-sm font-bold uppercase tracking-wide">Version 0.1</span>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="text-destructive text-xs font-mono uppercase">Classified</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 leading-tight">
              <span className="text-primary tracking-wider">FUGGER</span>
              <br />
              <span className="text-foreground">Command Center</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Elite tactical intelligence platform for resource management, strategic operations, and market dominance.
              <span className="block text-sm mt-2 text-primary font-mono">ACCESS LEVEL: AUTHORIZED PERSONNEL ONLY</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="terminal-glow font-bold uppercase tracking-wide">
                Initialize System
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wide">
                Access Database
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Factory}
            label="Active Factories"
            value="12"
            subtitle="+3 from last week"
            trend="up"
          />
          <StatCard
            icon={Gem}
            label="Resources Tracked"
            value="48"
            subtitle="All categories"
            trend="neutral"
          />
          <StatCard
            icon={Package}
            label="Products"
            value="156"
            subtitle="Manufacturing units"
            trend="neutral"
          />
          <StatCard
            icon={Users}
            label="Active Players"
            value="2,847"
            subtitle="+12% this month"
            trend="up"
          />
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 uppercase tracking-wide">
            <span className="text-primary">Tactical</span> Access Points
          </h2>
          <p className="text-muted-foreground font-mono text-sm">Direct routes to critical command systems</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickAccessCard
            icon={Factory}
            title="Factories"
            description="Manage production facilities and manufacturing operations"
            href="/factories"
          />
          <QuickAccessCard
            icon={TrendingUp}
            title="Market Prices"
            description="Track real-time market data and resource valuations"
            href="/prices"
          />
          <QuickAccessCard
            icon={Gem}
            title="Resources"
            description="View complete resource database and locations"
            href="/resources"
          />
          <QuickAccessCard
            icon={Calculator}
            title="Calculators"
            description="Production and profit calculation tools"
            href="/calculators"
          />
          <QuickAccessCard
            icon={Map}
            title="Map Tools"
            description="GPS-based location and route planning"
            href="/map"
          />
          <QuickAccessCard
            icon={Crown}
            title="Luxury Goods"
            description="High-value items and special products"
            href="/luxury-goods"
          />
        </div>
      </section>

      {/* Market Overview Table */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 uppercase tracking-wide">
            <span className="text-primary">Market</span> Intelligence
          </h2>
          <p className="text-muted-foreground font-mono text-sm">Live market data streams · Real-time analysis</p>
        </div>
        
        <div className="industrial-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>Category</th>
                  <th>Current Price</th>
                  <th>24h Change</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold text-foreground">Iron Ore</td>
                  <td className="text-muted-foreground">Raw Material</td>
                  <td className="text-primary font-bold">$125.50</td>
                  <td className="text-primary">+5.2%</td>
                  <td className="text-muted-foreground">1,245 units</td>
                </tr>
                <tr>
                  <td className="font-semibold text-foreground">Steel Ingot</td>
                  <td className="text-muted-foreground">Processed</td>
                  <td className="text-primary font-bold">$342.00</td>
                  <td className="text-primary">+2.8%</td>
                  <td className="text-muted-foreground">856 units</td>
                </tr>
                <tr>
                  <td className="font-semibold text-foreground">Copper Wire</td>
                  <td className="text-muted-foreground">Component</td>
                  <td className="text-primary font-bold">$89.25</td>
                  <td className="text-destructive">-1.3%</td>
                  <td className="text-muted-foreground">2,134 units</td>
                </tr>
                <tr>
                  <td className="font-semibold text-foreground">Electronics</td>
                  <td className="text-muted-foreground">Finished</td>
                  <td className="text-primary font-bold">$1,245.00</td>
                  <td className="text-primary">+8.7%</td>
                  <td className="text-muted-foreground">432 units</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-primary bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h5 className="text-primary font-bold tracking-wider">FUGGER COMMAND CENTER</h5>
              <p className="text-muted-foreground text-sm mt-1 font-mono">
                <span className="text-destructive">CLASSIFIED</span> · Secure Connection Established · v0.1
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary font-mono">
                Documentation
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary font-mono">
                Support
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary font-mono">
                Changelog
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
