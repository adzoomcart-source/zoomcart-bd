import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { Lock, ShieldX } from "lucide-react";
import type { ReactNode } from "react";
import { useIsAdmin } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

function LoadingSkeleton() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 flex flex-col gap-4 items-center">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-64" />
    </div>
  );
}

export function ProtectedRoute({
  children,
  requireAdmin,
}: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing, login, isLoggingIn } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  if (isInitializing) {
    return <LoadingSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center gap-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl mb-2">
            Login Required / লগইন প্রয়োজন
          </h2>
          <p className="text-sm text-muted-foreground">
            Please log in with Internet Identity to access this section.
          </p>
        </div>
        <Button
          onClick={login}
          disabled={isLoggingIn}
          className="bg-primary text-primary-foreground hover:opacity-90 font-bold px-8"
          data-ocid="protected.login_button"
        >
          {isLoggingIn ? "Logging in..." : "Login Now / এখনই লগইন করুন"}
        </Button>
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (requireAdmin && (adminLoading || isAdmin === undefined)) {
    return <LoadingSkeleton />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center gap-6 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <ShieldX className="w-8 h-8 text-destructive" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl mb-2">Access Denied</h2>
          <p className="text-sm text-muted-foreground">
            This section is for admins only. You don't have permission to view
            this page.
          </p>
        </div>
        <Link to="/">
          <Button variant="outline" data-ocid="protected.back_home_button">
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
