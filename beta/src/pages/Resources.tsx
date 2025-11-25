import { Gem } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const resources = [
  { name: "Coal", category: "Energy", price: "45", availability: "Common", usedIn: "Steel, Copper, Power" },
  { name: "Iron Ore", category: "Metal", price: "120", availability: "Common", usedIn: "Steel, Construction" },
  { name: "Crude Oil", category: "Energy", price: "85", availability: "Common", usedIn: "Plastics, Fuel" },
  { name: "Copper Ore", category: "Metal", price: "95", availability: "Common", usedIn: "Copper, Electronics" },
  { name: "Bauxite", category: "Metal", price: "110", availability: "Common", usedIn: "Aluminium" },
  { name: "Silicon", category: "Tech", price: "240", availability: "Uncommon", usedIn: "Electronics, Tech" },
  { name: "Chalcopyrite", category: "Metal", price: "75", availability: "Common", usedIn: "Copper Refining" },
  { name: "Gold Ore", category: "Precious", price: "1,200", availability: "Rare", usedIn: "Luxury Goods, Electronics" },
  { name: "Diamonds", category: "Precious", price: "5,000", availability: "Rare", usedIn: "Luxury Goods, Industrial Tools" },
  { name: "Lithium", category: "Tech", price: "450", availability: "Uncommon", usedIn: "Batteries, Electronics" },
  { name: "Uranium", category: "Energy", price: "2,500", availability: "Rare", usedIn: "Power Generation" },
  { name: "Titanium Ore", category: "Metal", price: "380", availability: "Uncommon", usedIn: "Advanced Manufacturing" },
];

const Resources = () => {
  const getAvailabilityBadge = (availability: string) => {
    const variants = {
      Common: "secondary",
      Uncommon: "outline",
      Rare: "destructive"
    };
    return <Badge variant={variants[availability as keyof typeof variants] as any}>{availability}</Badge>;
  };

  return (
    <PageLayout
      title="Resources"
      description="Essential raw materials for production and manufacturing"
      icon={Gem}
      breadcrumbs={[{ label: "Resources" }]}
    >
      <div className="space-y-6">
        {/* Overview */}
        <Card className="industrial-card">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-6">
              Resources are the foundation of your industrial empire. Extract and refine these materials to fuel production, 
              build structures, and manufacture advanced products.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h6 className="text-2xl font-bold text-primary">50+</h6>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Total Resources</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h6 className="text-2xl font-bold text-primary">5</h6>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Categories</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h6 className="text-2xl font-bold text-primary">100+</h6>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Production Chains</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h6 className="text-2xl font-bold text-primary">Global</h6>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Market Access</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Table */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-primary">Resource Database</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Resource</th>
                    <th>Category</th>
                    <th>Market Price</th>
                    <th>Availability</th>
                    <th>Primary Uses</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource, index) => (
                    <tr key={index}>
                      <td className="font-semibold text-foreground">{resource.name}</td>
                      <td>
                        <Badge variant="outline" className="border-primary/50">
                          {resource.category}
                        </Badge>
                      </td>
                      <td className="font-mono text-primary font-bold">{resource.price} Credits</td>
                      <td>{getAvailabilityBadge(resource.availability)}</td>
                      <td className="text-sm text-muted-foreground">{resource.usedIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Energy Resources", count: 4, color: "text-primary" },
            { name: "Metal Ores", count: 6, color: "text-primary" },
            { name: "Precious Materials", count: 3, color: "text-destructive" },
            { name: "Technology Materials", count: 2, color: "text-primary" },
            { name: "Industrial Compounds", count: 8, color: "text-primary" },
            { name: "Rare Elements", count: 5, color: "text-destructive" }
          ].map((category, index) => (
            <Card key={index} className="industrial-card hover:border-primary/50 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.count} items</p>
                  </div>
                  <Gem className={`h-8 w-8 ${category.color} opacity-75`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Resources;
