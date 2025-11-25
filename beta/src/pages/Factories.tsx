import { Factory } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const factories = [
  {
    name: "Electronics Factory",
    produces: "Electronics",
    hqLevel: 2,
    requirements: [
      { item: "Credits", amount: "300,000" },
      { item: "Plastics", amount: "240" },
      { item: "Copper", amount: "180" },
      { item: "Silicon", amount: "60" }
    ],
    profit: "6,849,180 Credits",
    margin: "28%",
    usedFor: [
      "Medical Technology production",
      "Scan Drones production",
      "Truck Plant upgrades",
      "HQ upgrades (Level 9+)",
      "Special building construction"
    ]
  },
  {
    name: "Aluminium Factory",
    produces: "Aluminium",
    hqLevel: 3,
    requirements: [
      { item: "Credits", amount: "150,000" },
      { item: "Bauxite", amount: "300" },
      { item: "Coal", amount: "40" }
    ],
    profit: "2,850,000 Credits",
    margin: "32%",
    usedFor: [
      "Vehicle production",
      "Building upgrades",
      "Special equipment"
    ]
  },
  {
    name: "Steel Mill",
    produces: "Steel",
    hqLevel: 2,
    requirements: [
      { item: "Credits", amount: "100,000" },
      { item: "Iron Ore", amount: "250" },
      { item: "Coal", amount: "50" }
    ],
    profit: "1,750,000 Credits",
    margin: "30%",
    usedFor: [
      "Construction projects",
      "Weapons production",
      "Vehicle manufacturing"
    ]
  },
  {
    name: "Copper Refinery",
    produces: "Copper",
    hqLevel: 2,
    requirements: [
      { item: "Credits", amount: "80,000" },
      { item: "Chalcopyrite", amount: "200" },
      { item: "Coal", amount: "30" }
    ],
    profit: "1,520,000 Credits",
    margin: "25%",
    usedFor: [
      "Electronics production",
      "Wiring systems",
      "Building materials"
    ]
  },
  {
    name: "Arms Factory",
    produces: "Weapons",
    hqLevel: 5,
    requirements: [
      { item: "Credits", amount: "800,000" },
      { item: "Steel", amount: "300" },
      { item: "Copper", amount: "200" },
      { item: "Electronics", amount: "50" }
    ],
    profit: "12,450,000 Credits",
    margin: "35%",
    usedFor: [
      "Unit equipment",
      "Defense systems",
      "Special operations"
    ]
  },
  {
    name: "Plastics Factory",
    produces: "Plastics",
    hqLevel: 2,
    requirements: [
      { item: "Credits", amount: "50,000" },
      { item: "Crude Oil", amount: "150" }
    ],
    profit: "900,000 Credits",
    margin: "27%",
    usedFor: [
      "Electronics production",
      "Consumer goods",
      "Packaging materials"
    ]
  }
];

const Factories = () => {
  return (
    <PageLayout
      title="Factories"
      description="Production facilities for manufacturing products and materials"
      icon={Factory}
      breadcrumbs={[{ label: "Factories" }]}
    >
      <div className="space-y-6">
        {/* Overview */}
        <Card className="industrial-card">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              List of all available factories in the game with their production capabilities and requirements. 
              Each factory transforms raw resources into valuable products.
            </p>
          </CardContent>
        </Card>

        {/* Factories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {factories.map((factory, index) => (
            <Card key={index} className="industrial-card h-full hover:border-primary/50 transition-all">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-primary">{factory.name}</CardTitle>
                  <Badge variant="outline" className="border-primary text-primary">
                    HQ Level {factory.hqLevel}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground">Produces:</span>
                  <Badge variant="default">{factory.produces}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h6 className="text-primary font-bold mb-3 uppercase text-sm">
                    Production Requirements (per 100 units):
                  </h6>
                  <div className="space-y-2">
                    {factory.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{req.item}</span>
                        <span className="font-mono text-primary font-bold">{req.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary uppercase">Profit:</span>
                    <div className="text-right">
                      <div className="font-mono text-primary font-bold">{factory.profit}</div>
                      <div className="text-xs text-muted-foreground">({factory.margin} margin)</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h6 className="text-primary font-bold mb-2 uppercase text-sm">Used For:</h6>
                  <ul className="space-y-1.5">
                    {factory.usedFor.map((use, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <span className="text-primary mr-2 mt-0.5">▸</span>
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-primary">Production Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h3 className="text-3xl font-bold text-primary">15</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Total Factories</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h3 className="text-3xl font-bold text-primary">28%</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Avg Profit Margin</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h3 className="text-3xl font-bold text-primary">Level 2</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Minimum HQ Level</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h3 className="text-3xl font-bold text-primary">9</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Resource Types</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Factories;
