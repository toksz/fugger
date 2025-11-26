import { TrendingUp, Info, Loader2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { market } from "@/lib/supabase";

const allPrices = [
  { item: "Coal", category: "Resource", price: "45", change: "+2.3%", status: "Stable", statusType: "success" },
  { item: "Iron Ore", category: "Resource", price: "120", change: "-1.8%", status: "Volatile", statusType: "warning" },
  { item: "Crude Oil", category: "Resource", price: "85", change: "+4.2%", status: "Rising", statusType: "info" },
  { item: "Electronics", category: "Product", price: "2,500", change: "+8.5%", status: "Profitable", statusType: "success" },
  { item: "Plastics", category: "Product", price: "180", change: "-3.2%", status: "Stable", statusType: "info" },
  { item: "Steel", category: "Product", price: "350", change: "+1.9%", status: "Good Demand", statusType: "success" },
  { item: "Copper", category: "Resource", price: "95", change: "+3.1%", status: "Rising", statusType: "info" },
  { item: "Silicon", category: "Resource", price: "240", change: "+5.4%", status: "High Demand", statusType: "success" },
  { item: "Medical Tech", category: "Product", price: "8,500", change: "+12.3%", status: "Profitable", statusType: "success" },
];

const resources = [
  { item: "Coal", price: "45", change: "+2.3%", status: "Stable" },
  { item: "Iron Ore", price: "120", change: "-1.8%", status: "Volatile" },
  { item: "Crude Oil", price: "85", change: "+4.2%", status: "Rising" },
  { item: "Copper", price: "95", change: "+3.1%", status: "Rising" },
  { item: "Silicon", price: "240", change: "+5.4%", status: "High Demand" },
];

const products = [
  { item: "Electronics", price: "2,500", change: "+8.5%", status: "Profitable" },
  { item: "Plastics", price: "180", change: "-3.2%", status: "Stable" },
  { item: "Steel", price: "350", change: "+1.9%", status: "Good Demand" },
  { item: "Medical Tech", price: "8,500", change: "+12.3%", status: "Profitable" },
];

const specialItems = [
  { item: "Tech Upgrade 1", price: "250,000", change: "0.0%", rarity: "Rare" },
  { item: "Luxury Car", price: "2,500,000", change: "+5.2%", rarity: "Ultra Rare" },
  { item: "Elite Badge", price: "5,000,000", change: "0.0%", rarity: "Legendary" },
];

const Prices = () => {
  const getStatusBadge = (status: string, type?: string) => {
    const variant = type === "success" ? "default" : type === "warning" ? "destructive" : "secondary";
    return <Badge variant={variant as any}>{status}</Badge>;
  };

  return (
    <PageLayout
      title="Market Prices"
      description="Current market values for all resources and products"
      icon={TrendingUp}
      breadcrumbs={[{ label: "Market Prices" }]}
    >
      <div className="space-y-6">
        {/* Market Information */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Info className="h-5 w-5 mr-2" />
              Market Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Real-time market intelligence from the Fugger Banking House command center. Live pricing data for all commodities, 
              industrial outputs, and luxury assets. Leverage this market data to optimize your investments and strategic positioning.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h6 className="text-2xl font-bold text-primary">50+</h6>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Tradeable Items</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h6 className="text-2xl font-bold text-primary">Dynamic</h6>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Price Changes</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h6 className="text-2xl font-bold text-primary">24/7</h6>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Market Activity</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded border border-primary/20">
                <h6 className="text-2xl font-bold text-primary">Real-time</h6>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Data Updates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Tables with Tabs */}
        <Card className="industrial-card">
          <CardContent className="pt-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all">All Prices</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="special">Special Items</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>Market Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPrices.map((item, index) => (
                        <tr key={index}>
                          <td className="font-semibold text-foreground">{item.item}</td>
                          <td>
                            <Badge variant="outline" className="border-primary/50">
                              {item.category}
                            </Badge>
                          </td>
                          <td className="font-mono text-primary font-bold">{item.price} Credits</td>
                          <td className={item.change.startsWith("+") ? "text-primary" : "text-destructive"}>
                            {item.change}
                          </td>
                          <td>{getStatusBadge(item.status, item.statusType)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="resources">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Resource</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resources.map((item, index) => (
                        <tr key={index}>
                          <td className="font-semibold text-foreground">{item.item}</td>
                          <td className="font-mono text-primary font-bold">{item.price} Credits</td>
                          <td className={item.change.startsWith("+") ? "text-primary" : "text-destructive"}>
                            {item.change}
                          </td>
                          <td>
                            <Badge variant="secondary">{item.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="products">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item, index) => (
                        <tr key={index}>
                          <td className="font-semibold text-foreground">{item.item}</td>
                          <td className="font-mono text-primary font-bold">{item.price} Credits</td>
                          <td className={item.change.startsWith("+") ? "text-primary" : "text-destructive"}>
                            {item.change}
                          </td>
                          <td>
                            <Badge variant="default">{item.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="special">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>Rarity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specialItems.map((item, index) => (
                        <tr key={index}>
                          <td className="font-semibold text-foreground">{item.item}</td>
                          <td className="font-mono text-primary font-bold">{item.price} Credits</td>
                          <td className={item.change.startsWith("+") ? "text-primary" : "text-muted-foreground"}>
                            {item.change}
                          </td>
                          <td>
                            <Badge variant="destructive">{item.rarity}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Prices;
