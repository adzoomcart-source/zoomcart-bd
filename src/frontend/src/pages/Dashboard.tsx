import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import {
  useMyOrders,
  useMyResellerProfile,
  useRegisterReseller,
} from "@/hooks/useReseller";
import { OrderStatus } from "@/types";
import type { Order, ResellerProfile } from "@/types";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Copy,
  DollarSign,
  ExternalLink,
  Link2,
  Package,
  Share2,
  ShoppingBag,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatTk(amount: bigint) {
  return `৳${Number(amount).toLocaleString("en-BD")}`;
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function affiliateUrl(code: string) {
  return `${window.location.origin}?ref=${code}`;
}

// ── Stat Card ────────────────────────────────────────────────────────────────

type StatColor = "green" | "orange" | "blue" | "red";

const statColorClasses: Record<
  StatColor,
  { bg: string; text: string; border: string; icon: string }
> = {
  green: {
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/30",
    icon: "text-success",
  },
  orange: {
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/30",
    icon: "text-warning",
  },
  blue: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
    icon: "text-primary",
  },
  red: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/30",
    icon: "text-destructive",
  },
};

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  color: StatColor;
}) {
  const c = statColorClasses[color];
  return (
    <Card className={`border ${c.border} ${c.bg} shadow-none`}>
      <CardContent className="pt-4 pb-3 px-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p
              className={`text-xs font-medium ${c.text} opacity-80 leading-tight`}
            >
              {label}
            </p>
            <p
              className={`text-xl font-bold font-display mt-1 truncate ${c.text}`}
            >
              {value}
            </p>
          </div>
          <div className={`shrink-0 mt-0.5 ${c.icon}`}>
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Order Status Badge ───────────────────────────────────────────────────────

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  if (status === OrderStatus.pending) {
    return <span className="badge-warning">Pending</span>;
  }
  if (status === OrderStatus.completed) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold bg-primary/10 text-primary">
        Completed
      </span>
    );
  }
  return <span className="badge-success">Paid</span>;
}

// ── Affiliate Link Box ───────────────────────────────────────────────────────

function AffiliateBox({ code }: { code: string }) {
  const url = affiliateUrl(code);

  function copyUrl() {
    navigator.clipboard.writeText(url);
    toast.success("লিংক কপি হয়েছে! Link copied.");
  }

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Link2 size={16} className="text-primary" />
          Affiliate Link / আপনার অ্যাফিলিয়েট লিংক
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2">
        <div className="flex items-center gap-2">
          <div
            className="flex-1 min-w-0 bg-card border border-border rounded-lg px-3 py-2 text-xs font-mono truncate text-muted-foreground"
            data-ocid="affiliate.link_display"
          >
            {url}
          </div>
          <Button
            size="sm"
            onClick={copyUrl}
            data-ocid="affiliate.copy_button"
            className="shrink-0"
          >
            <Copy size={14} className="mr-1" />
            Copy
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Code: <span className="font-bold text-foreground">{code}</span>
          &nbsp;· Share this link to earn commission on every sale 💸
        </p>
      </CardContent>
    </Card>
  );
}

// ── Caption Generator ────────────────────────────────────────────────────────

function CaptionGenerator({ profile }: { profile: ResellerProfile }) {
  const { data: products = [] } = useProducts();
  const [selectedId, setSelectedId] = useState<string>("");

  const selected = products.find((p) => String(p.id) === selectedId);

  function generateCaption() {
    if (!selected) return "";
    const link = affiliateUrl(profile.affiliateCode);
    return `🔥 *${selected.name}*\n\n💰 মূল্য: ৳${Number(selected.price)}\n✅ আপনার লাভ: ৳${Number(selected.commission)}\n\n📦 দ্রুত ডেলিভারি | সারাদেশে পৌঁছে দেওয়া হবে\n\n👉 অর্ডার করুন: ${link}\n\n#ZoomCartBD #অনলাইনশপিং #ডোরস্টেপডেলিভারি`;
  }

  function copyCaption() {
    const caption = generateCaption();
    if (!caption) return;
    navigator.clipboard.writeText(caption);
    toast.success("Caption কপি হয়েছে! Share on WhatsApp/Facebook.");
  }

  return (
    <Card>
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Share2 size={16} className="text-secondary" />
          Caption Generator / ক্যাপশন জেনারেটর
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Product নির্বাচন করুন
          </Label>
          <select
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            data-ocid="caption.product_select"
          >
            <option value="">— Select a product —</option>
            {products.map((p) => (
              <option key={String(p.id)} value={String(p.id)}>
                {p.name} · ৳{Number(p.commission)} commission
              </option>
            ))}
          </select>
        </div>

        {selected && (
          <div className="rounded-lg bg-muted/50 border border-border p-3">
            <pre className="text-xs whitespace-pre-wrap break-words font-body text-foreground leading-relaxed">
              {generateCaption()}
            </pre>
          </div>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={copyCaption}
          disabled={!selected}
          data-ocid="caption.copy_button"
          className="w-full"
        >
          <Copy size={14} className="mr-1.5" />
          Caption কপি করুন · Copy Caption
        </Button>
      </CardContent>
    </Card>
  );
}

// ── Orders Table ─────────────────────────────────────────────────────────────

function OrdersTable({ orders }: { orders: Order[] }) {
  const { data: products = [] } = useProducts();
  const productMap = Object.fromEntries(
    products.map((p) => [String(p.id), p.name]),
  );

  if (orders.length === 0) {
    return (
      <div
        className="rounded-xl border border-dashed border-border bg-muted/30 py-10 text-center"
        data-ocid="orders.empty_state"
      >
        <ShoppingBag
          size={36}
          className="mx-auto mb-2 text-muted-foreground/40"
        />
        <p className="text-sm font-semibold text-muted-foreground">
          কোনো অর্ডার নেই
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Share your affiliate link to get your first order!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              <th className="text-left px-3 py-2.5 font-semibold text-xs text-muted-foreground">
                Product
              </th>
              <th className="text-left px-3 py-2.5 font-semibold text-xs text-muted-foreground hidden sm:table-cell">
                Date
              </th>
              <th className="text-right px-3 py-2.5 font-semibold text-xs text-muted-foreground">
                Commission
              </th>
              <th className="text-right px-3 py-2.5 font-semibold text-xs text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={String(order.id)}
                className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                data-ocid={`orders.item.${i + 1}`}
              >
                <td className="px-3 py-2.5">
                  <p className="font-medium text-xs truncate max-w-[130px]">
                    {productMap[String(order.productId)] ?? "Product"}
                  </p>
                  <p className="text-xs text-muted-foreground sm:hidden">
                    {formatDate(order.orderDate)}
                  </p>
                </td>
                <td className="px-3 py-2.5 text-xs text-muted-foreground hidden sm:table-cell">
                  {formatDate(order.orderDate)}
                </td>
                <td className="px-3 py-2.5 text-right font-bold text-xs text-success">
                  {formatTk(order.commissionAmount)}
                </td>
                <td className="px-3 py-2.5 text-right">
                  <OrderStatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Registration Card ────────────────────────────────────────────────────────

function RegistrationCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: register, isPending, isError, error } = useRegisterReseller();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    register(
      { name: name.trim(), email: email.trim() },
      {
        onSuccess: () =>
          toast.success("রেজিস্ট্রেশন সফল! Awaiting admin approval."),
        onError: () => toast.error("Registration failed. Please try again."),
      },
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8" data-ocid="registration.card">
      <Card className="border-2 border-primary/20 shadow-elevated">
        <CardHeader className="text-center pb-2 pt-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <User size={28} className="text-primary" />
          </div>
          <CardTitle className="text-xl font-display">
            Become a Reseller
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            রিসেলার হিসেবে যোগ দিন — ১০০% বিনামূল্যে
          </p>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="flex flex-wrap gap-2 justify-center my-4">
            {["100% Free", "Weekly bKash Pay", "No Stock Needed"].map((t) => (
              <span key={t} className="badge-success">
                {t}
              </span>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-1.5">
              <Label htmlFor="reg-name" className="text-sm font-semibold">
                Full Name / পূর্ণ নাম
              </Label>
              <Input
                id="reg-name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-ocid="registration.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-email" className="text-sm font-semibold">
                Email / ইমেইল
              </Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-ocid="registration.email_input"
              />
            </div>
            {isError && (
              <p
                className="text-xs text-destructive flex items-center gap-1"
                data-ocid="registration.error_state"
              >
                <AlertCircle size={12} />
                {error instanceof Error ? error.message : "Registration failed"}
              </p>
            )}
            <Button
              type="submit"
              className="w-full font-bold h-12 text-base"
              disabled={isPending || !name.trim() || !email.trim()}
              data-ocid="registration.submit_button"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                  Registering…
                </span>
              ) : (
                "Register as Reseller / রিসেলার হিসেবে যোগ দিন"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Pending Approval Banner ──────────────────────────────────────────────────

function PendingApprovalBanner() {
  return (
    <div
      className="mx-4 mt-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 flex items-start gap-3"
      data-ocid="approval.pending_banner"
    >
      <Clock size={20} className="text-warning mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-bold text-warning">
          Pending Approval / অনুমোদনের অপেক্ষায়
        </p>
        <p className="text-xs text-warning/80 mt-0.5 leading-relaxed">
          আপনার আবেদন পর্যালোচনা করা হচ্ছে। অ্যাডমিন শীঘ্রই অনুমোদন দেবেন। You'll be
          notified once approved by the admin.
        </p>
      </div>
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const { isAuthenticated, isInitializing } = useAuth();
  const {
    data: profile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useMyResellerProfile();
  const { data: orders = [], isLoading: ordersLoading } = useMyOrders();

  if (isInitializing) {
    return (
      <div
        className="px-4 py-8 space-y-4 max-w-2xl mx-auto"
        data-ocid="dashboard.loading_state"
      >
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          {(["a", "b", "c", "d"] as const).map((k) => (
            <Skeleton key={k} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="text-center px-4 py-16 max-w-md mx-auto"
        data-ocid="dashboard.auth_required"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <User size={30} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-display font-bold">Login Required</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Dashboard দেখতে প্রথমে login করুন। Please log in to access your reseller
          dashboard.
        </p>
      </div>
    );
  }

  if (profileLoading && !profileFetched) {
    return (
      <div className="px-4 py-8 space-y-4 max-w-2xl mx-auto">
        <Skeleton className="h-8 w-56 rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          {(["a", "b", "c", "d"] as const).map((k) => (
            <Skeleton key={k} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return <RegistrationCard />;
  }

  const pendingOrders = orders.filter((o) => o.status === OrderStatus.pending);
  const pendingBalance = pendingOrders.reduce(
    (s, o) => s + o.commissionAmount,
    0n,
  );

  return (
    <div className="max-w-2xl mx-auto pb-10" data-ocid="dashboard.page">
      {/* Profile Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User size={24} className="text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h1
              className="text-lg font-display font-bold truncate"
              data-ocid="profile.name"
            >
              {profile.name}
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {profile.email}
            </p>
          </div>
          <div className="shrink-0">
            {profile.isApproved ? (
              <span
                className="badge-success"
                data-ocid="profile.approved_badge"
              >
                <CheckCircle2 size={11} /> Approved
              </span>
            ) : (
              <span className="badge-warning" data-ocid="profile.pending_badge">
                <Clock size={11} /> Pending
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 pl-1">
          Joined {formatDate(profile.registeredAt)}
          &nbsp;·&nbsp;Code:{" "}
          <span className="font-bold text-foreground">
            {profile.affiliateCode}
          </span>
        </p>
      </div>

      {/* Pending Approval Banner */}
      {!profile.isApproved && <PendingApprovalBanner />}

      {/* Earnings Stats */}
      <div className="px-4 mt-5">
        <h2 className="text-xs font-display font-bold text-muted-foreground uppercase tracking-wide mb-3">
          Your Earnings / আপনার আয়
        </h2>
        <div className="grid grid-cols-2 gap-3" data-ocid="stats.section">
          <StatCard
            label="Total Earned"
            value={formatTk(profile.totalEarnings)}
            icon={TrendingUp}
            color="green"
          />
          <StatCard
            label="Pending Balance"
            value={formatTk(pendingBalance)}
            icon={DollarSign}
            color="orange"
          />
          <StatCard
            label="Total Sales"
            value={String(Number(profile.totalSales))}
            icon={ShoppingBag}
            color="blue"
          />
          <StatCard
            label="Total Orders"
            value={String(orders.length)}
            icon={Package}
            color="red"
          />
        </div>
      </div>

      {/* Affiliate Link */}
      <div className="px-4 mt-5">
        <AffiliateBox code={profile.affiliateCode} />
      </div>

      {/* Caption Generator */}
      <div className="px-4 mt-4">
        <CaptionGenerator profile={profile} />
      </div>

      {/* Recent Orders */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-display font-bold text-muted-foreground uppercase tracking-wide">
            Recent Orders / সাম্প্রতিক অর্ডার
          </h2>
          {orders.length > 0 && (
            <Badge
              variant="secondary"
              className="text-xs"
              data-ocid="orders.count_badge"
            >
              {orders.length} total
            </Badge>
          )}
        </div>
        {ordersLoading ? (
          <div className="space-y-2" data-ocid="orders.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <OrdersTable orders={orders} />
        )}
      </div>

      {/* Quick Resource Links */}
      <div className="px-4 mt-6">
        <h2 className="text-xs font-display font-bold text-muted-foreground uppercase tracking-wide mb-3">
          Resources / সাহায্য
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {(
            [
              {
                label: "Full Guideline / সম্পূর্ণ গাইডলাইন",
                href: "https://docs.google.com/document/d/1vpMIXqWgUf8UlaGPiK1yu-TRKYT_zQWhJVx8jW5GXWo/edit?usp=sharing",
                ocid: "resources.guideline_link",
              },
              {
                label: "Reseller Rules / নিয়মাবলি",
                href: "https://zoomcartbd.xyz/reseller-rules/",
                ocid: "resources.rules_link",
              },
              {
                label: "WhatsApp Support / সাপোর্ট",
                href: "https://wa.me/8801813797898",
                ocid: "resources.support_link",
              },
            ] as const
          ).map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={link.ocid}
              className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted/40 transition-colors group"
            >
              <span>{link.label}</span>
              <ExternalLink
                size={14}
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
