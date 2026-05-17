import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { Lock, LogIn, Shield } from "lucide-react";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated, isInitializing, isLoggingIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/patient/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-elevated border border-border p-8 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground">
              Secure Login
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              MedVault uses Internet Identity for secure, private
              authentication.
            </p>
          </div>
          <div className="w-full space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Lock className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Your identity is cryptographically secured. No passwords stored.
              </p>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={login}
              disabled={isInitializing || isLoggingIn}
              data-ocid="login.submit_button"
            >
              {isLoggingIn ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>Opening Internet
                  Identity...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login with Internet Identity
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
