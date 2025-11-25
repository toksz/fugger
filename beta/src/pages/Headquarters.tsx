import { Home, Info, BarChart3, TrendingUp } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const headquartersData = [
  { level: 1, credits: "-", electronics: "-", unlocks: "Basic Buildings", production: 0 },
  { level: 2, credits: "2,500", electronics: "10", unlocks: "Small Factories", production: 50 },
  { level: 3, credits: "10,000", electronics: "50", unlocks: "Mines, Medium Factories", production: 150 },
  { level: 4, credits: "50,000", electronics: "200", unlocks: "Special Buildings", production: 400 },
  { level: 5, credits: "200,000", electronics: "800", unlocks: "Advanced Factories", production: 1000 },
  { level: 6, credits: "1,000,000", electronics: "3,200", unlocks: "Luxury Goods", production: 2500 },
  { level: 7, credits: "5,000,000", electronics: "12,800", unlocks: "Elite Units", production: 6000 },
  { level: 8, credits: "25,000,000", electronics: "51,200", unlocks: "Advanced Special Buildings", production: 15000 },
  { level: 9, credits: "125,000,000", electronics: "204,800", unlocks: "Mega Structures", production: 37500 },
  { level: 10, credits: "625,000,000", electronics: "819,200", unlocks: "Maximum Level", production: 90000 },
];

const Headquarters = () => {
  return (
    <PageLayout
      title="Headquarters"
      description="Central command center for all base operations"
      icon={Home}
      breadcrumbs={[{ label: "Headquarters" }]}
    >
      <div className="space-y-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="industrial-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Info className="h-5 w-5 mr-2" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                The Headquarters is the core building of your base and serves as the central command center. 
                It provides essential upgrades and unlocks new buildings and facilities as it grows in level.
              </p>
              
              <div>
                <h6 className="text-primary font-bold mb-2 uppercase tracking-wide text-sm">Key Functions:</h6>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span><strong className="text-foreground">Base Unlocks:</strong> Unlocks new buildings and facilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span><strong className="text-foreground">Upgrade Requirements:</strong> Enables higher-level upgrades for other buildings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span><strong className="text-foreground">Resource Production:</strong> Generates basic resources over time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span><strong className="text-foreground">Command Center:</strong> Central hub for base management</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="industrial-card">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <BarChart3 className="h-5 w-5 mr-2" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="stat-label">Current Level</span>
                  <span className="stat-value">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="stat-label">Credits Generated</span>
                  <span className="text-primary font-bold">0/hr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="stat-label">Next Upgrade Cost</span>
                  <span className="text-primary font-bold">2,500</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Requirements Table */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <TrendingUp className="h-5 w-5 mr-2" />
              Upgrade Requirements by Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Credits Required</th>
                    <th>Electronics Required</th>
                    <th>Unlocks</th>
                    <th>Credits/hour</th>
                  </tr>
                </thead>
                <tbody>
                  {headquartersData.map((row) => (
                    <tr key={row.level}>
                      <td>
                        <Badge variant="outline" className="border-primary text-primary">
                          {row.level}
                        </Badge>
                      </td>
                      <td className="font-mono text-primary">{row.credits}</td>
                      <td className="font-mono text-primary">{row.electronics}</td>
                      <td className="text-foreground">{row.unlocks}</td>
                      <td className="font-mono text-primary">{row.production.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Production Chains */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              Required for Production
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The Headquarters level determines what can be produced in your base:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h6 className="text-primary font-bold mb-3 uppercase text-sm">Level 2+</h6>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▸</span>
                    Electronics (Electronics Factory)
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▸</span>
                    Plastics (Plastic Factory)
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▸</span>
                    Basic Units Production
                  </li>
                </ul>
              </div>
              <div>
                <h6 className="text-primary font-bold mb-3 uppercase text-sm">Level 5+</h6>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▸</span>
                    Medical Technology
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▸</span>
                    Advanced Factories
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">▸</span>
                    Elite Units
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Headquarters;
