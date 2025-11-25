import { Building2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const buildings = [
  {
    name: "Hospital",
    function: "Medical Support",
    hqLevel: 3,
    benefits: [
      "Increases unit recovery speed",
      "Reduces casualty rates during attacks",
      "Enables medical technology production",
      "Improves factory efficiency by 15%"
    ],
    costs: [
      { item: "Credits", amount: "500,000" },
      { item: "Medical Technology", amount: "100" },
      { item: "Electronics", amount: "200" }
    ]
  },
  {
    name: "Casino",
    function: "Income Generation",
    hqLevel: 4,
    benefits: [
      "Generates passive income",
      "Increases credit production by 20%",
      "Unlocks luxury goods trading",
      "Special unit recruitment bonus"
    ],
    costs: [
      { item: "Credits", amount: "1,500,000" },
      { item: "Luxury Goods", amount: "50" },
      { item: "Electronics", amount: "300" }
    ]
  },
  {
    name: "Research Lab",
    function: "Technology Development",
    hqLevel: 5,
    benefits: [
      "Unlocks tech upgrades",
      "Reduces production costs by 10%",
      "Faster building upgrades",
      "Advanced unit abilities"
    ],
    costs: [
      { item: "Credits", amount: "3,000,000" },
      { item: "Silicon", amount: "500" },
      { item: "Electronics", amount: "800" }
    ]
  },
  {
    name: "HR Department",
    function: "Workforce Management",
    hqLevel: 3,
    benefits: [
      "Increases production efficiency",
      "Reduces training time by 25%",
      "Unlocks elite workers",
      "Lower maintenance costs"
    ],
    costs: [
      { item: "Credits", amount: "750,000" },
      { item: "Plastics", amount: "200" },
      { item: "Steel", amount: "150" }
    ]
  },
  {
    name: "Tech Center",
    function: "Research & Development",
    hqLevel: 5,
    benefits: [
      "Unlocks advanced production recipes",
      "Increases research speed by 50%",
      "Reduces upgrade costs by 15%",
      "Enables tech upgrade production"
    ],
    costs: [
      { item: "Credits", amount: "5,000,000" },
      { item: "Electronics", amount: "1,000" },
      { item: "Silicon", amount: "500" }
    ]
  },
  {
    name: "Training Camp",
    function: "Unit Training",
    hqLevel: 4,
    benefits: [
      "Enables elite unit production",
      "Reduces training costs by 20%",
      "Increases unit experience gain",
      "Unlocks special unit abilities"
    ],
    costs: [
      { item: "Credits", amount: "2,500,000" },
      { item: "Steel", amount: "800" },
      { item: "Weapons", amount: "100" }
    ]
  }
];

const SpecialBuildings = () => {
  return (
    <PageLayout
      title="Special Buildings"
      description="Unique structures providing special bonuses and capabilities"
      icon={Building2}
      breadcrumbs={[{ label: "Special Buildings" }]}
    >
      <div className="space-y-6">
        {/* Overview */}
        <Card className="industrial-card">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Special buildings provide unique bonuses, unlock special abilities, and enhance your base operations. 
              Each building requires specific HQ levels and resources to construct.
            </p>
          </CardContent>
        </Card>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {buildings.map((building, index) => (
            <Card key={index} className="industrial-card h-full hover:border-primary/50 transition-all">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-primary">{building.name}</CardTitle>
                  <Badge variant="outline" className="border-primary text-primary">
                    HQ Level {building.hqLevel}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Function: <span className="text-primary">{building.function}</span>
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h6 className="text-primary font-bold mb-2 uppercase text-sm">Benefits:</h6>
                  <ul className="space-y-1.5">
                    {building.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <span className="text-primary mr-2 mt-0.5">▸</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <h6 className="text-primary font-bold mb-3 uppercase text-sm">Construction Cost:</h6>
                  <div className="space-y-2">
                    {building.costs.map((cost, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{cost.item}</span>
                        <span className="font-mono text-primary font-bold">{cost.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-primary">Special Building Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h3 className="text-3xl font-bold text-primary">12</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Total Special Buildings</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h3 className="text-3xl font-bold text-primary">25%</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Avg Efficiency Boost</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h3 className="text-3xl font-bold text-primary">Level 3</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Minimum HQ Level</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h3 className="text-3xl font-bold text-primary">5+</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Building Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SpecialBuildings;
