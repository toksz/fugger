import { Factory, Home, Building2, Gem, Package, Boxes, Users, Crown, TrendingUp, Calculator, Map, FileText, Info, Menu, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const baseLinks = [
    { href: "/headquarters", icon: Home, label: "Headquarters" },
    { href: "/factories", icon: Factory, label: "Factories" },
    { href: "/special-buildings", icon: Building2, label: "Special Buildings" },
    { href: "/resources", icon: Gem, label: "Resources" },
    { href: "/products", icon: Package, label: "Products" },
    { href: "/loot", icon: Boxes, label: "Loot" },
    { href: "/units", icon: Users, label: "Units" },
    { href: "/luxury-goods", icon: Crown, label: "Luxury Goods" },
    { href: "/prices", icon: TrendingUp, label: "Market Prices" },
  ];

  const toolLinks = [
    { href: "/calculators", icon: Calculator, label: "Calculators" },
    { href: "/map", icon: Map, label: "Map Tools" },
  ];

  const infoLinks = [
    { href: "/changelog", icon: FileText, label: "Changelog" },
    { href: "/about", icon: Info, label: "About" },
  ];

  return (
    <nav className="bg-card border-b-2 border-primary relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <Factory className="h-6 w-6 text-primary group-hover:terminal-glow transition-all" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary tracking-wider leading-none">
                FUGGER
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Command Center
              </span>
            </div>
            <Badge variant="outline" className="ml-2 border-primary/50 text-primary text-xs">
              v0.1
            </Badge>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-muted">
                  <Building2 className="h-4 w-4 mr-2" />
                  Base
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border-border w-56">
                {baseLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="flex items-center cursor-pointer">
                      <link.icon className="h-4 w-4 mr-2 text-primary" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-muted">
                  <Calculator className="h-4 w-4 mr-2" />
                  Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border-border w-56">
                {toolLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="flex items-center cursor-pointer">
                      <link.icon className="h-4 w-4 mr-2 text-primary" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-muted">
                  <Info className="h-4 w-4 mr-2" />
                  Info
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border-border w-56">
                {infoLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="flex items-center cursor-pointer">
                      <link.icon className="h-4 w-4 mr-2 text-primary" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/profile" className="ml-2">
              <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-muted">
                <Users className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>

            <Link to="/auth">
              <Button variant="outline" className="ml-4">
                <Lock className="h-4 w-4 mr-2" />
                <span className="font-bold">Login</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <div className="space-y-1">
              <div className="text-primary text-xs font-bold uppercase tracking-wide px-2 py-1">Base</div>
              {baseLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center px-2 py-2 text-foreground hover:bg-muted hover:text-primary rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
