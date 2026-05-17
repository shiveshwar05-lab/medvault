import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Cross,
  Heart,
  Home,
  LogIn,
  Menu,
  Settings,
  Shield,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function NavLink({
  to,
  children,
  onClick,
}: { to: string; children: React.ReactNode; onClick?: () => void }) {
  const routerState = useRouterState();
  const isActive =
    routerState.location.pathname === to ||
    (to !== "/" && routerState.location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-foreground/70 hover:text-foreground hover:bg-muted"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout, role } =
    useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Branding */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              data-ocid="nav.home_link"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-primary shadow-subtle group-hover:shadow-elevated transition-smooth">
                <Shield className="w-5 h-5 text-primary-foreground" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 flex items-center justify-center bg-accent rounded-full">
                  <Cross className="w-1.5 h-1.5 text-accent-foreground" />
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-foreground text-base tracking-tight">
                  MedVault
                </span>
                <span className="text-[10px] text-muted-foreground font-mono tracking-wider">
                  DIGITAL MEMORY VAULT
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/">
                <Home className="w-3.5 h-3.5" />
                Home
              </NavLink>

              {!isAuthenticated && (
                <>
                  <NavLink to="/patient/register">
                    <User className="w-3.5 h-3.5" />
                    Register
                  </NavLink>
                  <NavLink to="/doctor/register">
                    <Stethoscope className="w-3.5 h-3.5" />
                    For Doctors
                  </NavLink>
                </>
              )}

              {isAuthenticated &&
                (role === "patient" || role === "unknown") && (
                  <NavLink to="/patient/dashboard">
                    <Activity className="w-3.5 h-3.5" />
                    My Profile
                  </NavLink>
                )}

              {isAuthenticated && role === "doctor" && (
                <NavLink to="/doctor/dashboard">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Doctor Portal
                </NavLink>
              )}

              {isAuthenticated && role === "admin" && (
                <NavLink to="/admin">
                  <Settings className="w-3.5 h-3.5" />
                  Admin
                </NavLink>
              )}
            </nav>

            {/* Auth Button */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated && (
                <Badge
                  variant="outline"
                  className="text-xs border-primary/30 text-primary bg-primary/5"
                >
                  {role === "admin"
                    ? "🛡 Admin"
                    : role === "doctor"
                      ? "🩺 Doctor"
                      : role === "patient"
                        ? "👤 Patient"
                        : "👤 User"}
                </Badge>
              )}
              <Button
                variant={isAuthenticated ? "outline" : "default"}
                size="sm"
                onClick={handleAuthAction}
                disabled={isInitializing || isLoggingIn}
                data-ocid="nav.auth_button"
                className="min-w-[80px]"
              >
                {isInitializing ? (
                  "Loading..."
                ) : isLoggingIn ? (
                  "Opening..."
                ) : isAuthenticated ? (
                  "Logout"
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5 mr-1" />
                    Login
                  </>
                )}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted transition-smooth"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu_toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
              <Home className="w-3.5 h-3.5" />
              Home
            </NavLink>
            {!isAuthenticated && (
              <>
                <NavLink
                  to="/patient/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-3.5 h-3.5" />
                  Register as Patient
                </NavLink>
                <NavLink
                  to="/doctor/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  Register as Doctor
                </NavLink>
              </>
            )}
            {isAuthenticated && (role === "patient" || role === "unknown") && (
              <NavLink
                to="/patient/dashboard"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Activity className="w-3.5 h-3.5" />
                My Profile
              </NavLink>
            )}
            {isAuthenticated && role === "doctor" && (
              <NavLink
                to="/doctor/dashboard"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                Doctor Portal
              </NavLink>
            )}
            {isAuthenticated && role === "admin" && (
              <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Settings className="w-3.5 h-3.5" />
                Admin Panel
              </NavLink>
            )}
            <div className="pt-2 border-t border-border mt-1">
              <Button
                variant={isAuthenticated ? "outline" : "default"}
                size="sm"
                onClick={handleAuthAction}
                disabled={isInitializing || isLoggingIn}
                className="w-full"
                data-ocid="nav.mobile_auth_button"
              >
                {isInitializing
                  ? "Loading..."
                  : isAuthenticated
                    ? "Logout"
                    : "Login with Internet Identity"}
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} MedVault — Digital Human Memory
                Vault
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
