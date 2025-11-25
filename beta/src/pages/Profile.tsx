import { User, Key, Activity, BarChart3, Shield, Settings, Save, AlertTriangle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  
  // Mock user data - replace with real auth data later
  const userData = {
    username: "Commander_001",
    email: "commander@fugger.command",
    rank: "Elite Operator",
    clearanceLevel: 5,
    joinDate: "2025-01-15",
    lastActive: "2025-11-25 14:30:00"
  };

  const stats = {
    totalOperations: 147,
    resourcesManaged: 2840,
    factoriesControlled: 12,
    marketTransactions: 356,
    totalCredits: 45600000,
    daysActive: 32
  };

  const handleSaveApiKey = () => {
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "⚠ Cloud Required",
      description: "To securely store API keys, enable Lovable Cloud first. API keys should NEVER be stored in code.",
      variant: "destructive"
    });
  };

  return (
    <PageLayout
      title="Operator Profile"
      description="Command Center Personnel Record · Classified Access"
      icon={User}
      breadcrumbs={[{ label: "Profile" }]}
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="industrial-card border-primary/50">
          <CardHeader className="border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded border-2 border-primary bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-primary font-mono">
                    {userData.username}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-1">
                    {userData.email}
                  </CardDescription>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="default" className="font-mono">
                      {userData.rank}
                    </Badge>
                    <Badge variant="outline" className="border-destructive text-destructive font-mono">
                      Clearance Level {userData.clearanceLevel}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="border-primary">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-mono">Join Date</p>
                <p className="text-foreground font-mono mt-1">{userData.joinDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-mono">Last Active</p>
                <p className="text-foreground font-mono mt-1">{userData.lastActive}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-mono">Status</p>
                <p className="text-primary font-mono mt-1">● ONLINE</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="industrial-card hover:border-primary/50 transition-all">
            <CardContent className="pt-6 text-center">
              <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="stat-value">{stats.totalOperations}</div>
              <p className="stat-label mt-1">Operations</p>
            </CardContent>
          </Card>
          
          <Card className="industrial-card hover:border-primary/50 transition-all">
            <CardContent className="pt-6 text-center">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="stat-value">{stats.resourcesManaged.toLocaleString()}</div>
              <p className="stat-label mt-1">Resources</p>
            </CardContent>
          </Card>

          <Card className="industrial-card hover:border-primary/50 transition-all">
            <CardContent className="pt-6 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="stat-value">{stats.factoriesControlled}</div>
              <p className="stat-label mt-1">Factories</p>
            </CardContent>
          </Card>

          <Card className="industrial-card hover:border-primary/50 transition-all">
            <CardContent className="pt-6 text-center">
              <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="stat-value">{stats.marketTransactions}</div>
              <p className="stat-label mt-1">Transactions</p>
            </CardContent>
          </Card>

          <Card className="industrial-card hover:border-primary/50 transition-all">
            <CardContent className="pt-6 text-center">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="stat-value">{(stats.totalCredits / 1000000).toFixed(1)}M</div>
              <p className="stat-label mt-1">Credits</p>
            </CardContent>
          </Card>

          <Card className="industrial-card hover:border-primary/50 transition-all">
            <CardContent className="pt-6 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="stat-value">{stats.daysActive}</div>
              <p className="stat-label mt-1">Days Active</p>
            </CardContent>
          </Card>
        </div>

        {/* API Key Management */}
        <Card className="industrial-card border-destructive/50">
          <CardHeader className="border-b border-border">
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-destructive" />
              <CardTitle className="text-primary">API Key Management</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">
              Secure integration credentials · Requires Cloud activation
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Warning Banner */}
            <div className="bg-destructive/10 border border-destructive/30 rounded p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-destructive font-bold text-sm uppercase tracking-wide mb-1">
                  Security Notice
                </h4>
                <p className="text-muted-foreground text-sm">
                  API keys should <strong className="text-foreground">NEVER</strong> be stored in your codebase. 
                  To securely manage API keys, you must enable <strong className="text-primary">Lovable Cloud</strong>.
                </p>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="mt-3 terminal-glow"
                  onClick={() => {
                    toast({
                      title: "Enable Lovable Cloud",
                      description: "Contact support or check project settings to enable secure secret storage.",
                    });
                  }}
                >
                  Enable Lovable Cloud
                </Button>
              </div>
            </div>

            {/* API Key Input (Placeholder) */}
            <div className="space-y-4 opacity-50 pointer-events-none">
              <div className="space-y-2">
                <Label htmlFor="api-key" className="text-xs uppercase tracking-wide text-muted-foreground font-mono">
                  Game API Key
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk_live_••••••••••••••••••••"
                    className="pl-10 bg-muted/50 border-primary/20 font-mono"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  This key will be encrypted and stored securely in Cloud secrets
                </p>
              </div>

              <Button 
                onClick={handleSaveApiKey}
                className="w-full terminal-glow font-mono uppercase tracking-wide"
                disabled
              >
                <Save className="h-4 w-4 mr-2" />
                Save API Key
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-muted/30 border border-primary/20 rounded p-4 mt-4">
              <h5 className="text-primary font-bold text-sm uppercase tracking-wide mb-2 font-mono">
                Setup Instructions
              </h5>
              <ol className="text-sm text-muted-foreground space-y-2 font-mono list-decimal list-inside">
                <li>Enable Lovable Cloud in project settings</li>
                <li>Navigate to Cloud → Secrets</li>
                <li>Add new secret: <code className="text-primary bg-muted px-1 rounded">GAME_API_KEY</code></li>
                <li>Use in edge functions: <code className="text-primary bg-muted px-1 rounded">process.env.GAME_API_KEY</code></li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Market Analysis", time: "2 hours ago", status: "Completed" },
                { action: "Factory Upgrade", time: "5 hours ago", status: "In Progress" },
                { action: "Resource Transfer", time: "1 day ago", status: "Completed" },
                { action: "Strategic Planning", time: "2 days ago", status: "Completed" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-foreground font-mono text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground font-mono">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.status === "Completed" ? "default" : "outline"}
                    className={activity.status === "Completed" ? "" : "border-primary text-primary"}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Profile;
