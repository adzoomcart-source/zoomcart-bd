import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Award,
  ChevronRight,
  MessageCircle,
  Package,
  Send,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useProducts } from "../hooks/useProducts";

/* ── Static data ──────────────────────────────────────────────── */

const trustSignals = [
  { icon: "⚡", label: "Fast Delivery", sublabel: "২৪–৪৮ ঘন্টা" },
  { icon: "💸", label: "Weekly Payment", sublabel: "বিকাশ / নগদ" },
  { icon: "✅", label: "100% Free", sublabel: "Registration" },
  { icon: "🎓", label: "Full Support", sublabel: "Training দেওয়া হয়" },
];

const categories = [
  { id: "gadgets", icon: "📱", label: "Electronics", labelBn: "ইলেকট্রনিক্স" },
  { id: "fan", icon: "💨", label: "Turbo Fan", labelBn: "টার্বো ফ্যান" },
  { id: "health", icon: "💄", label: "Beauty", labelBn: "বিউটি" },
  { id: "kitchen", icon: "🏠", label: "Home & Living", labelBn: "হোম" },
];

const earningRows = [
  { sales: "1 sale", earn: "৳80–150", width: "20%" },
  { sales: "5 sale/day", earn: "৳400–750", width: "55%" },
  { sales: "30 day", earn: "৳12,000–20,000+", width: "100%" },
];

const howItWorks = [
  {
    step: "01",
    icon: "📝",
    title: "Create Account",
    titleBn: "Account খুলুন",
    desc: "100% Free – Register করুন",
  },
  {
    step: "02",
    icon: "🔗",
    title: "Get Your Link",
    titleBn: "Link নিন",
    desc: "Affiliate link সংগ্রহ করুন",
  },
  {
    step: "03",
    icon: "📲",
    title: "Share on Social",
    titleBn: "Share করুন",
    desc: "Facebook / WhatsApp-এ দিন",
  },
  {
    step: "04",
    icon: "💰",
    title: "Earn Commissions",
    titleBn: "Commission পান",
    desc: "Order হলেই আয় হবে 💸",
  },
];

const trustCards = [
  {
    icon: "🎯",
    title: "100% Free Registration",
    desc: "কোনো টাকা বা investment লাগবে না",
    color: "bg-primary/8 border-primary/20",
  },
  {
    icon: "📦",
    title: "Ready Products",
    desc: "Image + video + caption সহ",
    color: "bg-secondary/8 border-secondary/20",
  },
  {
    icon: "🚚",
    title: "Fast Delivery System",
    desc: "আমরা নিজেরাই deliver করি",
    color: "bg-success/8 border-success/20",
  },
  {
    icon: "💳",
    title: "Weekly Payment",
    desc: "bKash / Nagad-এ প্রতি সপ্তাহে",
    color: "bg-warning/10 border-warning/20",
  },
];

const communityLinks = [
  {
    icon: MessageCircle,
    color: "bg-[oklch(0.55_0.18_142)]",
    label: "WhatsApp Channel",
    sublabel: "Products & Updates",
    href: "https://whatsapp.com/channel/0029VbBvLGZAO7RFRcaWmt3r",
  },
  {
    icon: Send,
    color: "bg-[oklch(0.5_0.18_240)]",
    label: "Telegram Channel",
    sublabel: "Products & Offers",
    href: "https://t.me/zoomcartbdreseller",
  },
  {
    icon: MessageCircle,
    color: "bg-[oklch(0.55_0.18_142)]",
    label: "WhatsApp Group",
    sublabel: "Daily Guide & Tips",
    href: "https://chat.whatsapp.com/CsPNgYytOB0JHK7b7olOuy",
  },
  {
    icon: Award,
    color: "bg-warning",
    label: "Full Guidelines",
    sublabel: "নতুন Reseller পড়ুন",
    href: "https://docs.google.com/document/d/1vpMIXqWgUf8UlaGPiK1yu-TRKYT_zQWhJVx8jW5GXWo/edit?usp=sharing",
  },
];

/* ── Sub-components ───────────────────────────────────────────── */

function ProductCardSkeleton() {
  return (
    <div className="product-card p-3">
      <Skeleton className="w-full aspect-square rounded-lg mb-3" />
      <Skeleton className="h-4 w-3/4 mb-1.5" />
      <Skeleton className="h-3 w-1/2 mb-2" />
      <Skeleton className="h-6 w-24 rounded-full mb-2" />
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: {
    id: bigint;
    name: string;
    price: bigint;
    commission: bigint;
    imageUrl: string;
    isFeatured: boolean;
  };
  index: number;
}) {
  const profit = product.commission;
  const sellingPrice = product.price - profit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="product-card"
      data-ocid={`home.product_card.${index + 1}`}
    >
      <Link to="/product/$id" params={{ id: product.id.toString() }}>
        <div className="relative p-3 pb-0">
          {product.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-warning text-warning-foreground text-xs font-bold z-10 px-1.5 py-0.5 flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5" />
              4.8
            </Badge>
          )}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted/40">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                📦
              </div>
            )}
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-display font-semibold text-sm leading-tight mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-1.5">
            {product.name.split(" ").slice(0, 2).join(" ")}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-price-strike">
              ৳{product.price.toString()}
            </span>
            <span className="text-price-main text-base">
              ৳{sellingPrice.toString()}
            </span>
          </div>
          <div className="badge-commission mb-2">
            Profit: ৳{profit.toString()}
          </div>
        </div>
      </Link>
      <div className="px-3 pb-3 flex flex-col gap-1.5">
        <Button
          size="sm"
          className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold text-xs h-8 rounded-lg"
          data-ocid={`home.order_button.${index + 1}`}
          onClick={() => {
            window.location.href = `/product/${product.id.toString()}`;
          }}
        >
          Order for Customer (কাস্টমারের জন্য)
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-full text-xs h-7 rounded-lg"
          data-ocid={`home.save_button.${index + 1}`}
          onClick={() => {
            window.location.href = `/product/${product.id.toString()}`;
          }}
        >
          Save Product
        </Button>
      </div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function Home() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts =
    products?.filter((p) => p.isFeatured).slice(0, 4) ?? [];
  const displayProducts =
    featuredProducts.length > 0
      ? featuredProducts
      : (products?.slice(0, 4) ?? []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary px-4 py-8 md:py-14"
        data-ocid="home.hero_section"
      >
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-32 h-32 rounded-full bg-secondary/30 blur-2xl" />

        <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/25 mb-3 font-bold text-xs">
              🚀 Earn from Home · ঘরে বসে আয়
            </Badge>
            <h1 className="font-display font-black text-3xl md:text-5xl leading-tight text-primary-foreground mb-1">
              Earn Money Online
              <br />
              <span className="text-warning">with ZoomCart BD</span>
            </h1>
            <p className="font-body text-base text-primary-foreground/85 mb-1 mt-2">
              ঘরে বসে আয় করুন –
            </p>
            <p className="font-body text-sm text-primary-foreground/75 mb-5">
              কোনো ইনভেস্টমেন্ট ছাড়াই! কোনো product stock বা delivery ঝামেলা নেই।
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="https://zoomcartbd.xyz/affiliate-registration/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-foreground text-primary font-black text-sm hover:opacity-90 active:scale-95 transition-smooth shadow-lg"
                data-ocid="home.hero_register_cta"
              >
                🔘 Become a Reseller Now
                <ChevronRight className="w-4 h-4" />
              </a>
              <Link to="/shop" data-ocid="home.hero_shop_cta">
                <Button
                  variant="outline"
                  className="font-bold h-11 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
            <p className="text-xs text-primary-foreground/60 font-medium">
              এখনই যোগ দিন — ১০০% বিনামূল্যে! ✨
            </p>
          </motion.div>

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="rounded-2xl overflow-hidden bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 p-5 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-warning/30 flex items-center justify-center text-2xl shrink-0">
                🛒
              </div>
              <div>
                <p className="font-display font-black text-primary-foreground text-lg leading-tight">
                  ZoomCart BD
                </p>
                <p className="text-xs text-primary-foreground/70">
                  আপনার অনলাইন ব্যবসার প্ল্যাটফর্ম
                </p>
              </div>
            </div>
            {/* Mini earning display */}
            <div className="space-y-2">
              {earningRows.map((row) => (
                <div key={row.sales} className="flex items-center gap-3">
                  <div className="text-xs text-primary-foreground/70 w-24 shrink-0">
                    {row.sales}
                  </div>
                  <div className="flex-1 bg-primary-foreground/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: row.width }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-warning rounded-full"
                    />
                  </div>
                  <div className="text-xs font-black text-warning w-28 text-right shrink-0">
                    {row.earn}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {["100% Free", "Fast Delivery", "bKash/Nagad"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold bg-primary-foreground/15 text-primary-foreground px-2 py-0.5 rounded-full"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Signals row ────────────────────────────────── */}
      <section
        className="section-alt px-4 py-3 border-b border-border"
        data-ocid="home.trust_signals_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="trust-signal shrink-0">
                <span className="text-lg">{signal.icon}</span>
                <div>
                  <div className="font-bold text-xs">{signal.label}</div>
                  <div className="text-muted-foreground text-[10px]">
                    {signal.sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section
        className="px-4 py-6 bg-background"
        data-ocid="home.categories_section"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-lg mb-4">
            Categories / ক্যাটাগরি
          </h2>
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {categories.map((cat, i) => (
              <Link
                key={`${cat.id}-${cat.label}`}
                to="/shop"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-smooth text-center"
                data-ocid={`home.category_link.${i + 1}`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-foreground">
                  {cat.label}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {cat.labelBn}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Products ─────────────────────────────────── */}
      <section
        className="section-alt px-4 py-6"
        data-ocid="home.trending_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-lg">
                Profit with Top Trending Products
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                High demand products = Easy sale
              </p>
            </div>
            <Link to="/shop" data-ocid="home.view_all_link">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary font-semibold text-xs"
              >
                View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {isLoading
              ? (["a", "b", "c", "d"] as const).map((k) => (
                  <ProductCardSkeleton key={k} />
                ))
              : displayProducts.map((p, i) => (
                  <ProductCard key={p.id.toString()} product={p} index={i} />
                ))}
            {!isLoading && displayProducts.length === 0 && (
              <div
                className="col-span-2 md:col-span-4 py-12 text-center text-muted-foreground"
                data-ocid="home.products_empty_state"
              >
                <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">
                  Products loading soon / পণ্য শীঘ্রই আসছে
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section
        className="px-4 py-10 bg-background"
        data-ocid="home.how_it_works_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-3 font-bold">
              কীভাবে কাজ করবেন?
            </Badge>
            <h2 className="font-display font-black text-2xl md:text-3xl">
              How It Works
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Simple · Fast · Proven System ✔️
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-4 text-center relative overflow-hidden"
                data-ocid={`home.how_it_works_step.${i + 1}`}
              >
                <div className="absolute top-2 right-2 text-[10px] font-black text-primary/30 font-display">
                  {item.step}
                </div>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-display font-black text-sm mb-0.5 text-foreground">
                  {item.title}
                </div>
                <div className="text-xs font-semibold text-primary mb-1">
                  {item.titleBn}
                </div>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust cards ──────────────────────────────────────── */}
      <section
        className="section-alt px-4 py-10"
        data-ocid="home.trust_cards_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display font-black text-2xl">
              কেন ZoomCart BD? 🔥
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Why thousands choose us
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trustCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-xl border p-4 text-center ${card.color}`}
                data-ocid={`home.trust_card.${i + 1}`}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <div className="font-display font-bold text-sm mb-1">
                  {card.title}
                </div>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Earnings Potential ───────────────────────────────── */}
      <section
        className="px-4 py-10 bg-background"
        data-ocid="home.earnings_section"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-success/15 text-success border-success/20 mb-3 font-bold">
              <TrendingUp className="w-3 h-3 mr-1" />
              Earning Potential
            </Badge>
            <h2 className="font-display font-black text-2xl md:text-3xl mb-2">
              কত আয় করা সম্ভব? 💰
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              নিয়মিত কাজ করলে income বাড়তেই থাকবে
            </p>
            <div className="space-y-3">
              {earningRows.map((row, i) => (
                <div
                  key={row.sales}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-warning shrink-0" />
                      <span className="text-sm font-semibold">{row.sales}</span>
                    </div>
                    <span className="font-display font-black text-success text-base">
                      {row.earn}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: row.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.2 }}
                      className="h-full bg-success rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              💡 নিয়মিত কাজ করলে income বাড়তেই থাকবে
            </p>
          </motion.div>

          {/* Stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-primary-foreground text-center">
              <div className="text-5xl font-display font-black mb-1">
                5,000+
              </div>
              <div className="text-sm opacity-80 font-medium">
                Active Resellers across Bangladesh
              </div>
              <div className="flex justify-center gap-4 mt-4 text-xs opacity-70 font-semibold">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 5K+ Resellers
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" /> 50+ Products
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: "🏆",
                  title: "Certified Platform",
                  sub: "Since 2023",
                  color: "bg-warning/10 border-warning/20",
                },
                {
                  icon: "📲",
                  title: "bKash & Nagad",
                  sub: "Weekly Payout",
                  color: "bg-success/8 border-success/20",
                },
                {
                  icon: "📦",
                  title: "50+ Products",
                  sub: "High demand items",
                  color: "bg-primary/8 border-primary/20",
                },
                {
                  icon: "🎓",
                  title: "Free Training",
                  sub: "Full guideline",
                  color: "bg-secondary/8 border-secondary/20",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className={`rounded-xl border p-3 text-center ${s.color}`}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="font-display font-bold text-xs">
                    {s.title}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section
        className="section-alt px-4 py-10"
        data-ocid="home.final_cta_section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center text-primary-foreground relative overflow-hidden"
          >
            <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-32 h-32 rounded-full bg-secondary/30 blur-2xl" />
            <div className="relative">
              <h2 className="font-display font-black text-3xl md:text-4xl mb-2">
                🚀 Ready to Start?
              </h2>
              <p className="text-primary-foreground/80 text-base mb-2">
                এখনই join করুন এবং নিজের earning journey শুরু করুন 💸
              </p>
              <p className="text-primary-foreground/60 text-sm mb-6">
                100% Free · No Stock · No Delivery Hassle
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href="https://zoomcartbd.xyz/affiliate-registration/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary-foreground text-primary font-black text-base hover:opacity-90 transition-smooth shadow-lg"
                  data-ocid="home.bottom_register_cta"
                >
                  🔘 Become a Reseller Now / এখনই যোগ দিন
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a
                  href="https://zoomcartbd.xyz/affiliate-account/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-primary-foreground/30 text-primary-foreground font-bold text-sm hover:bg-primary-foreground/10 transition-smooth"
                  data-ocid="home.bottom_login_cta"
                >
                  Login করুন →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Community / Social Links ─────────────────────────── */}
      <section
        className="px-4 py-10 bg-background"
        data-ocid="home.community_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-display font-bold text-xl">
              📢 Get Daily Updates
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Join our community channels for products & tips
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {communityLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-smooth text-center"
                data-ocid={`home.community_link.${i + 1}`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${link.color} flex items-center justify-center`}
                >
                  <link.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-xs text-foreground">
                    {link.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {link.sublabel}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Support row */}
          <div className="mt-8 bg-muted/40 rounded-xl p-5 border border-border">
            <div className="text-center mb-4">
              <h3 className="font-display font-bold text-base">
                📞 Need Help?
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a
                href="https://wa.me/8801813797898"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-smooth"
                data-ocid="home.whatsapp_support_link"
              >
                <MessageCircle className="w-4 h-4 text-success" />
                WhatsApp Support
              </a>
              <a
                href="https://zoomcartbd.xyz/reseller-rules/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-smooth"
                data-ocid="home.rules_link"
              >
                <Award className="w-4 h-4 text-warning" />
                Reseller Rules
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
