import { c as createLucideIcon, u as useParams, a as useSearch, b as useMyResellerProfile, r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Link, B as Button, E as ExternalLink, d as ShoppingCart, e as ue, P as ProductCategory } from "./index-BZpH0Fbn.js";
import { b as useProduct, c as usePlaceOrder, P as Package, B as Badge } from "./useProducts-JdFzQaP-.js";
import { I as Input } from "./input-CwkB7uKT.js";
import { L as Label } from "./label-CekqDVzw.js";
import { m as motion } from "./proxy-BDEox-Hz.js";
import { S as Star } from "./star-adzUYa1i.js";
import { S as Share2, C as Copy } from "./share-2-D4DAM7Gy.js";
import { T as TrendingUp } from "./trending-up-BZ4keVdQ.js";
import { C as CircleCheckBig } from "./circle-check-big-BWEKeiDu.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode);
const categoryLabels = {
  [ProductCategory.fan]: "Turbo Fan / ফ্যান",
  [ProductCategory.gadgets]: "Gadgets / গ্যাজেট",
  [ProductCategory.kitchen]: "Kitchen Tools / রান্নাঘর",
  [ProductCategory.health]: "Health & Beauty / সৌন্দর্য"
};
function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const search = useSearch({ strict: false });
  const refCode = search.ref ?? "";
  const productId = BigInt(id);
  const { data: product, isLoading } = useProduct(productId);
  const { data: resellerProfile } = useMyResellerProfile();
  const placeOrder = usePlaceOrder();
  const affiliateCode = (resellerProfile == null ? void 0 : resellerProfile.affiliateCode) ?? refCode;
  const [customerName, setCustomerName] = reactExports.useState("");
  const [customerPhone, setCustomerPhone] = reactExports.useState("");
  const [orderSuccess, setOrderSuccess] = reactExports.useState(false);
  const [captionCopied, setCaptionCopied] = reactExports.useState(false);
  const [linkCopied, setLinkCopied] = reactExports.useState(false);
  const affiliateLink = product ? `${window.location.origin}/product/${id}?ref=${affiliateCode}` : "";
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(affiliateLink);
    setLinkCopied(true);
    ue.success("Affiliate link copied! / লিংক কপি হয়েছে");
    setTimeout(() => setLinkCopied(false), 2e3);
  };
  const handleCopyCaption = async () => {
    if (!product) return;
    const sellPrice2 = product.price - product.commission;
    const caption = `🔥 *${product.name}*

✅ মাত্র ৳${sellPrice2.toString()} তে পাচ্ছেন!
📦 Fast Delivery
💳 bKash / Nagad Payment

👉 Order করুন এখনই:
${affiliateLink}

📲 Powered by ZoomCart BD`;
    await navigator.clipboard.writeText(caption);
    setCaptionCopied(true);
    ue.success("Caption copied! Share on WhatsApp or Facebook 📲");
    setTimeout(() => setCaptionCopied(false), 2e3);
  };
  const handleWhatsAppShare = () => {
    if (!product) return;
    const sellPrice2 = product.price - product.commission;
    const text = encodeURIComponent(
      `🔥 *${product.name}*
✅ ৳${sellPrice2.toString()}
💰 কমিশন: ৳${product.commission.toString()}
👉 ${affiliateLink}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    if (!affiliateCode) {
      ue.error("Please login or use a reseller affiliate link");
      return;
    }
    try {
      await placeOrder.mutateAsync({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        productId,
        resellerAffiliateCode: affiliateCode
      });
      setOrderSuccess(true);
      setCustomerName("");
      setCustomerPhone("");
      ue.success("অর্ডার সফলভাবে দেওয়া হয়েছে! / Order placed successfully!");
    } catch {
      ue.error("Order failed. Please try again / আবার চেষ্টা করুন");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-video rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" })
    ] });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-16 h-16 mx-auto mb-4 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl mb-2", children: "Product Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "This product may have been removed or doesn't exist." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", "data-ocid": "product.back_to_shop_button", children: "Back to Shop" }) })
    ] });
  }
  const sellPrice = product.price - product.commission;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/shop",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-smooth",
        "data-ocid": "product.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Products / পণ্যসমূহ"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "bg-card border border-border rounded-2xl overflow-hidden mb-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video md:aspect-[4/3] overflow-hidden bg-muted/30", children: [
            product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.imageUrl,
                alt: product.name,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-7xl", children: "📦" }),
            product.isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-3 left-3 bg-warning text-warning-foreground font-bold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
              "Best Seller"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs mb-1.5 font-semibold", children: categoryLabels[product.category] ?? product.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-xl leading-tight", children: product.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleWhatsAppShare,
                  className: "p-2 rounded-lg border border-border hover:bg-muted/60 transition-smooth shrink-0",
                  "aria-label": "Share on WhatsApp",
                  "data-ocid": "product.whatsapp_share_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: product.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 mb-4 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Original Price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-price-strike text-base", children: [
                  "৳",
                  product.price.toString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Customer Price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-black text-xl", children: [
                  "৳",
                  sellPrice.toString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-success" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-success", children: "আপনার কমিশন / Your Commission" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-commission text-sm px-3 py-1 font-black", children: [
                  "৳",
                  product.commission.toString()
                ] })
              ] })
            ] })
          ] })
        ]
      }
    ),
    affiliateCode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        className: "bg-card border border-border rounded-2xl p-4 mb-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 text-primary" }),
            "Share & Earn / শেয়ার করুন ও আয় করুন"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted/40 rounded-lg px-3 py-2 text-xs text-muted-foreground font-mono truncate border border-border", children: affiliateLink }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: handleCopyLink,
                className: "shrink-0 h-9 px-3 font-semibold",
                "data-ocid": "product.copy_link_button",
                children: linkCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: handleCopyCaption,
                className: "h-9 text-xs font-semibold gap-1.5",
                "data-ocid": "product.copy_caption_button",
                children: [
                  captionCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                  "Copy Caption"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: handleWhatsAppShare,
                className: "h-9 text-xs font-bold gap-1.5 bg-success text-success-foreground hover:opacity-90",
                "data-ocid": "product.whatsapp_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                  "WhatsApp Share"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15 },
        className: "bg-card border border-border rounded-2xl p-5 mb-4",
        "data-ocid": "product.order_form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-base mb-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 text-primary" }),
            "Place Order / অর্ডার করুন"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Customer-এর তথ্য দিন এবং অর্ডার করুন" }),
          orderSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "py-6 text-center",
              "data-ocid": "product.order_success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-success mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg mb-1", children: "Order Placed! 🎉" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "অর্ডার সফলভাবে দেওয়া হয়েছে। আমরা শীঘ্রই ডেলিভারি করব।" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setOrderSuccess(false),
                    "data-ocid": "product.new_order_button",
                    children: "Place Another Order"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePlaceOrder, className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customerName", className: "text-xs font-semibold", children: "Customer Name / কাস্টমারের নাম" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "customerName",
                  type: "text",
                  placeholder: "Full name...",
                  value: customerName,
                  onChange: (e) => setCustomerName(e.target.value),
                  required: true,
                  className: "h-10",
                  "data-ocid": "product.customer_name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customerPhone", className: "text-xs font-semibold", children: "Customer Phone / ফোন নম্বর" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "customerPhone",
                  type: "tel",
                  placeholder: "01XXXXXXXXX",
                  value: customerPhone,
                  onChange: (e) => setCustomerPhone(e.target.value),
                  required: true,
                  className: "h-10",
                  "data-ocid": "product.customer_phone_input"
                }
              )
            ] }),
            !affiliateCode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-warning/10 border border-warning/30 rounded-lg p-3 text-xs text-muted-foreground",
                "data-ocid": "product.no_affiliate_warning",
                children: [
                  "⚠️ আপনাকে লগইন করতে হবে অথবা একটি affiliate link দিয়ে আসতে হবে।",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/dashboard",
                      className: "text-primary font-semibold underline ml-1",
                      children: "Login now"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: placeOrder.isPending || !affiliateCode || !customerName.trim() || !customerPhone.trim(),
                className: "bg-primary text-primary-foreground hover:opacity-90 h-12 font-bold text-sm",
                "data-ocid": "product.place_order_submit_button",
                children: placeOrder.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin", children: "⏳" }),
                  "Placing Order..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 mr-2" }),
                  "Place Order / অর্ডার করুন"
                ] })
              }
            ),
            placeOrder.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive text-center",
                "data-ocid": "product.order_error_state",
                children: "Order failed. Please try again / আবার চেষ্টা করুন"
              }
            )
          ] })
        ]
      }
    ),
    !resellerProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.2 },
        className: "bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold mb-0.5", children: "রিসেলার না হয়ে থাকলে আজই রেজিস্ট্রেশন করুন!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "100% Free • No Investment • Weekly Payment (bKash / Nagad)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://zoomcartbd.xyz/affiliate-registration/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "cta-primary text-sm",
              "data-ocid": "product.register_cta",
              children: "Become a Reseller — Free! →"
            }
          )
        ]
      }
    )
  ] });
}
export {
  ProductDetail as default
};
