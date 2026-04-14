import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  Copy,
  ExternalLink,
  Package,
  Share2,
  ShoppingCart,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCategory } from "../backend";
import { usePlaceOrder, useProduct } from "../hooks/useProducts";
import { useMyResellerProfile } from "../hooks/useReseller";

const categoryLabels: Record<string, string> = {
  [ProductCategory.fan]: "Turbo Fan / ফ্যান",
  [ProductCategory.gadgets]: "Gadgets / গ্যাজেট",
  [ProductCategory.kitchen]: "Kitchen Tools / রান্নাঘর",
  [ProductCategory.health]: "Health & Beauty / সৌন্দর্য",
};

export default function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const search = useSearch({ strict: false }) as Record<string, string>;
  const refCode = search.ref ?? "";

  const productId = BigInt(id);
  const { data: product, isLoading } = useProduct(productId);
  const { data: resellerProfile } = useMyResellerProfile();
  const placeOrder = usePlaceOrder();

  const affiliateCode = resellerProfile?.affiliateCode ?? refCode;

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [captionCopied, setCaptionCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const affiliateLink = product
    ? `${window.location.origin}/product/${id}?ref=${affiliateCode}`
    : "";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(affiliateLink);
    setLinkCopied(true);
    toast.success("Affiliate link copied! / লিংক কপি হয়েছে");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleCopyCaption = async () => {
    if (!product) return;
    const sellPrice = product.price - product.commission;
    const caption = `🔥 *${product.name}*\n\n✅ মাত্র ৳${sellPrice.toString()} তে পাচ্ছেন!\n📦 Fast Delivery\n💳 bKash / Nagad Payment\n\n👉 Order করুন এখনই:\n${affiliateLink}\n\n📲 Powered by ZoomCart BD`;
    await navigator.clipboard.writeText(caption);
    setCaptionCopied(true);
    toast.success("Caption copied! Share on WhatsApp or Facebook 📲");
    setTimeout(() => setCaptionCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!product) return;
    const sellPrice = product.price - product.commission;
    const text = encodeURIComponent(
      `🔥 *${product.name}*\n✅ ৳${sellPrice.toString()}\n💰 কমিশন: ৳${product.commission.toString()}\n👉 ${affiliateLink}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    if (!affiliateCode) {
      toast.error("Please login or use a reseller affiliate link");
      return;
    }
    try {
      await placeOrder.mutateAsync({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        productId,
        resellerAffiliateCode: affiliateCode,
      });
      setOrderSuccess(true);
      setCustomerName("");
      setCustomerPhone("");
      toast.success("অর্ডার সফলভাবে দেওয়া হয়েছে! / Order placed successfully!");
    } catch {
      toast.error("Order failed. Please try again / আবার চেষ্টা করুন");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="w-full aspect-video rounded-2xl" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
        <h2 className="font-display font-bold text-xl mb-2">
          Product Not Found
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          This product may have been removed or doesn't exist.
        </p>
        <Link to="/shop">
          <Button variant="outline" data-ocid="product.back_to_shop_button">
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const sellPrice = product.price - product.commission;

  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-smooth"
        data-ocid="product.back_button"
      >
        <ArrowLeft className="w-4 h-4" />
        Products / পণ্যসমূহ
      </Link>

      {/* Product Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl overflow-hidden mb-4"
      >
        {/* Image */}
        <div className="relative aspect-video md:aspect-[4/3] overflow-hidden bg-muted/30">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl">
              📦
            </div>
          )}
          {product.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-warning text-warning-foreground font-bold flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Best Seller
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <Badge variant="outline" className="text-xs mb-1.5 font-semibold">
                {categoryLabels[product.category] ?? product.category}
              </Badge>
              <h1 className="font-display font-black text-xl leading-tight">
                {product.name}
              </h1>
            </div>
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="p-2 rounded-lg border border-border hover:bg-muted/60 transition-smooth shrink-0"
              aria-label="Share on WhatsApp"
              data-ocid="product.whatsapp_share_button"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="bg-muted/40 rounded-xl p-4 mb-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Original Price
              </span>
              <span className="text-price-strike text-base">
                ৳{product.price.toString()}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Customer Price</span>
              <span className="font-display font-black text-xl">
                ৳{sellPrice.toString()}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-bold text-success">
                  আপনার কমিশন / Your Commission
                </span>
              </div>
              <span className="badge-commission text-sm px-3 py-1 font-black">
                ৳{product.commission.toString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Affiliate Link + Share Tools */}
      {affiliateCode && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-4 mb-4"
        >
          <h2 className="font-display font-bold text-sm mb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-primary" />
            Share & Earn / শেয়ার করুন ও আয় করুন
          </h2>

          {/* Affiliate Link */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-muted/40 rounded-lg px-3 py-2 text-xs text-muted-foreground font-mono truncate border border-border">
              {affiliateLink}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyLink}
              className="shrink-0 h-9 px-3 font-semibold"
              data-ocid="product.copy_link_button"
            >
              {linkCopied ? (
                <Check className="w-3.5 h-3.5 text-success" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>

          {/* Caption & WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyCaption}
              className="h-9 text-xs font-semibold gap-1.5"
              data-ocid="product.copy_caption_button"
            >
              {captionCopied ? (
                <Check className="w-3.5 h-3.5 text-success" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              Copy Caption
            </Button>
            <Button
              size="sm"
              onClick={handleWhatsAppShare}
              className="h-9 text-xs font-bold gap-1.5 bg-success text-success-foreground hover:opacity-90"
              data-ocid="product.whatsapp_button"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              WhatsApp Share
            </Button>
          </div>
        </motion.div>
      )}

      {/* Order Form */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card border border-border rounded-2xl p-5 mb-4"
        data-ocid="product.order_form"
      >
        <h2 className="font-display font-bold text-base mb-1 flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-primary" />
          Place Order / অর্ডার করুন
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Customer-এর তথ্য দিন এবং অর্ডার করুন
        </p>

        {orderSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 text-center"
            data-ocid="product.order_success_state"
          >
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
            <p className="font-display font-bold text-lg mb-1">
              Order Placed! 🎉
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              অর্ডার সফলভাবে দেওয়া হয়েছে। আমরা শীঘ্রই ডেলিভারি করব।
            </p>
            <Button
              variant="outline"
              onClick={() => setOrderSuccess(false)}
              data-ocid="product.new_order_button"
            >
              Place Another Order
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="flex flex-col gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="customerName" className="text-xs font-semibold">
                Customer Name / কাস্টমারের নাম
              </Label>
              <Input
                id="customerName"
                type="text"
                placeholder="Full name..."
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="h-10"
                data-ocid="product.customer_name_input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="customerPhone" className="text-xs font-semibold">
                Customer Phone / ফোন নম্বর
              </Label>
              <Input
                id="customerPhone"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                className="h-10"
                data-ocid="product.customer_phone_input"
              />
            </div>

            {!affiliateCode && (
              <div
                className="bg-warning/10 border border-warning/30 rounded-lg p-3 text-xs text-muted-foreground"
                data-ocid="product.no_affiliate_warning"
              >
                ⚠️ আপনাকে লগইন করতে হবে অথবা একটি affiliate link দিয়ে আসতে হবে।
                <Link
                  to="/dashboard"
                  className="text-primary font-semibold underline ml-1"
                >
                  Login now
                </Link>
              </div>
            )}

            <Button
              type="submit"
              disabled={
                placeOrder.isPending ||
                !affiliateCode ||
                !customerName.trim() ||
                !customerPhone.trim()
              }
              className="bg-primary text-primary-foreground hover:opacity-90 h-12 font-bold text-sm"
              data-ocid="product.place_order_submit_button"
            >
              {placeOrder.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Placing Order...
                </span>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Place Order / অর্ডার করুন
                </>
              )}
            </Button>

            {placeOrder.isError && (
              <p
                className="text-xs text-destructive text-center"
                data-ocid="product.order_error_state"
              >
                Order failed. Please try again / আবার চেষ্টা করুন
              </p>
            )}
          </form>
        )}
      </motion.div>

      {/* Not a reseller banner */}
      {!resellerProfile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4 text-center"
        >
          <p className="text-sm font-bold mb-0.5">
            রিসেলার না হয়ে থাকলে আজই রেজিস্ট্রেশন করুন!
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            100% Free • No Investment • Weekly Payment (bKash / Nagad)
          </p>
          <a
            href="https://zoomcartbd.xyz/affiliate-registration/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary text-sm"
            data-ocid="product.register_cta"
          >
            Become a Reseller — Free! →
          </a>
        </motion.div>
      )}
    </div>
  );
}
