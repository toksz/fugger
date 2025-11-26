import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Factory, Lock, Mail, Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/supabase";

const Auth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { user } = await auth.getUser();
      if (user) {
        navigate("/");
      }
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await auth.signIn(email, password);
      if (error) throw error;
      // Navigation will be handled by the auth state change listener
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await auth.signUp(email, password, username);
      if (error) throw error;
      setError("Registration successful! Please check your email to confirm your account.");
    } catch (error: any) {
      setError(error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Terminal grid background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5" />
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        opacity: 0.1
      }} />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 group mb-4">
            <Factory className="h-8 w-8 text-primary terminal-glow" />
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold text-primary tracking-wider">
                FUGGER
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Command Center
              </span>
            </div>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Shield className="h-5 w-5 text-destructive animate-pulse" />
            <p className="text-destructive font-mono text-sm uppercase tracking-wider">
              Authorized Personnel Only
            </p>
          </div>
          <p className="text-muted-foreground text-xs mt-2 font-mono">
            Security Clearance Required · Terminal Access Control
          </p>
        </div>

        {/* Auth Card */}
        <Card className="industrial-card border-primary/30">
          <CardHeader className="space-y-1 border-b border-border">
            <CardTitle className="text-2xl font-bold text-center text-primary">
              ACCESS TERMINAL
            </CardTitle>
            <CardDescription className="text-center font-mono text-xs">
              Enter credentials to establish secure connection
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="font-mono">LOGIN</TabsTrigger>
                <TabsTrigger value="signup" className="font-mono">REGISTER</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-xs uppercase tracking-wide text-muted-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="operator@fugger.command"
                        className="pl-10 bg-muted/50 border-primary/20 focus:border-primary font-mono"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-xs uppercase tracking-wide text-muted-foreground">
                      Security Code
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-muted/50 border-primary/20 focus:border-primary font-mono"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-6 terminal-glow font-mono uppercase tracking-wide" disabled={isLoading}>
                    {isLoading ? "CONNECTING..." : "Establish Connection"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username" className="text-xs uppercase tracking-wide text-muted-foreground">
                      Username
                    </Label>
                    <div className="relative">
                      <Factory className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="operator_name"
                        className="pl-10 bg-muted/50 border-primary/20 focus:border-primary font-mono"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-xs uppercase tracking-wide text-muted-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="operator@fugger.command"
                        className="pl-10 bg-muted/50 border-primary/20 focus:border-primary font-mono"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-xs uppercase tracking-wide text-muted-foreground">
                      Security Code
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-muted/50 border-primary/20 focus:border-primary font-mono"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-muted/30 border border-primary/20 rounded p-3 mt-4">
                    <p className="text-xs text-muted-foreground font-mono">
                      <span className="text-primary">⚠</span> Registration requires security clearance approval.
                      Access granted immediately for demonstration purposes.
                    </p>
                  </div>

                  <Button type="submit" className="w-full mt-6 terminal-glow font-mono uppercase tracking-wide">
                    Request Access
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded p-3 mt-4">
            <p className="text-xs text-destructive font-mono">
              <span className="text-destructive">⚠</span> {error}
            </p>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-6 font-mono">
          <span className="text-primary">SECURE</span> · All transmissions encrypted
        </p>
      </div>
    </div>
  );
};

export default Auth;
