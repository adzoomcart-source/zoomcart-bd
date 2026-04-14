import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Menu,
  ShieldCheck,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useIsAdmin } from "../hooks/useAuth";
import { useMyResellerProfile } from "../hooks/useReseller";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { login, clear, isAuthenticated, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: isAdmin } = useIsAdmin();
  const { data: resellerProfile } = useMyResellerProfile();
  const isReseller = !!resellerProfile;

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-lg text-foreground shrink-0"
            data-ocid="header.logo_link"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-black text-base">
              Z
            </span>
            <span>
              ZoomCart <span className="text-primary">BD</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth [&.active]:text-primary [&.active]:font-semibold"
              data-ocid="header.home_link"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth [&.active]:text-primary [&.active]:font-semibold"
              data-ocid="header.shop_link"
            >
              Products
            </Link>
            <a
              href="https://zoomcartbd.xyz/affiliate-registration/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:text-foreground hover:bg-muted/60 transition-smooth"
              data-ocid="header.become_reseller_link"
            >
              Become a Reseller
            </a>
            {isAuthenticated && isReseller && (
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth [&.active]:text-primary [&.active]:font-semibold"
                data-ocid="header.dashboard_link"
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth [&.active]:text-primary [&.active]:font-semibold"
                data-ocid="header.admin_link"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    Admin
                  </span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-xs"
                  data-ocid="header.logout_button"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isInitializing || isLoggingIn}
                className="bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold"
                data-ocid="header.login_button"
              >
                <User className="w-3.5 h-3.5 mr-1" />
                {isInitializing
                  ? "Loading..."
                  : isLoggingIn
                    ? "Logging in..."
                    : "Login"}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/shop" data-ocid="header.mobile_shop_link">
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-muted/60 transition-smooth"
              aria-label="Toggle menu"
              data-ocid="header.mobile_menu_toggle"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/60 transition-smooth [&.active]:text-primary [&.active]:bg-primary/5"
              data-ocid="header.mobile_home_link"
            >
              Home / হোম
            </Link>
            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/60 transition-smooth [&.active]:text-primary [&.active]:bg-primary/5"
              data-ocid="header.mobile_products_link"
            >
              Products / পণ্যসমূহ
            </Link>
            <a
              href="https://zoomcartbd.xyz/affiliate-registration/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-secondary hover:bg-muted/60 transition-smooth"
              data-ocid="header.mobile_reseller_link"
            >
              Become a Reseller / রিসেলার হন
            </a>
            {isAuthenticated && isReseller && (
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/60 transition-smooth [&.active]:text-primary [&.active]:bg-primary/5"
                data-ocid="header.mobile_dashboard_link"
              >
                <LayoutDashboard className="w-4 h-4 inline mr-2" />
                Dashboard
              </Link>
            )}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/60 transition-smooth [&.active]:text-primary [&.active]:bg-primary/5"
                data-ocid="header.mobile_admin_link"
              >
                <ShieldCheck className="w-4 h-4 inline mr-2" />
                Admin Panel
              </Link>
            )}
            <div className="mt-2 pt-2 border-t border-border">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full"
                  data-ocid="header.mobile_logout_button"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => {
                    login();
                    setMenuOpen(false);
                  }}
                  disabled={isInitializing || isLoggingIn}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold"
                  data-ocid="header.mobile_login_button"
                >
                  <User className="w-4 h-4 mr-2" />
                  {isInitializing ? "Loading..." : "Login / লগইন"}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
