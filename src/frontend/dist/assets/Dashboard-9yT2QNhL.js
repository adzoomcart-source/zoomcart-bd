import { c as createLucideIcon, j as jsxRuntimeExports, f as cn, g as useAuth, b as useMyResellerProfile, h as useMyOrders, S as Skeleton, U as User, O as OrderStatus, E as ExternalLink, r as reactExports, i as useRegisterReseller, B as Button, e as ue } from "./index-BZpH0Fbn.js";
import { P as Package, B as Badge, u as useProducts } from "./useProducts-JdFzQaP-.js";
import { I as Input } from "./input-CwkB7uKT.js";
import { L as Label } from "./label-CekqDVzw.js";
import { C as Clock } from "./clock-BUX7FxPK.js";
import { T as TrendingUp } from "./trending-up-BZ4keVdQ.js";
import { C as Copy, S as Share2 } from "./share-2-D4DAM7Gy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function formatTk(amount) {
  return `৳${Number(amount).toLocaleString("en-BD")}`;
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function affiliateUrl(code) {
  return `${window.location.origin}?ref=${code}`;
}
const statColorClasses = {
  green: {
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/30",
    icon: "text-success"
  },
  orange: {
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/30",
    icon: "text-warning"
  },
  blue: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
    icon: "text-primary"
  },
  red: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/30",
    icon: "text-destructive"
  }
};
function StatCard({
  label,
  value,
  icon: Icon,
  color
}) {
  const c = statColorClasses[color];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `border ${c.border} ${c.bg} shadow-none`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `text-xs font-medium ${c.text} opacity-80 leading-tight`,
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `text-xl font-bold font-display mt-1 truncate ${c.text}`,
          children: value
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `shrink-0 mt-0.5 ${c.icon}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20 }) })
  ] }) }) });
}
function OrderStatusBadge({ status }) {
  if (status === OrderStatus.pending) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-warning", children: "Pending" });
  }
  if (status === OrderStatus.completed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold bg-primary/10 text-primary", children: "Completed" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-success", children: "Paid" });
}
function AffiliateBox({ code }) {
  const url = affiliateUrl(code);
  function copyUrl() {
    navigator.clipboard.writeText(url);
    ue.success("লিংক কপি হয়েছে! Link copied.");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-primary/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { size: 16, className: "text-primary" }),
      "Affiliate Link / আপনার অ্যাফিলিয়েট লিংক"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 min-w-0 bg-card border border-border rounded-lg px-3 py-2 text-xs font-mono truncate text-muted-foreground",
            "data-ocid": "affiliate.link_display",
            children: url
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: copyUrl,
            "data-ocid": "affiliate.copy_button",
            className: "shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14, className: "mr-1" }),
              "Copy"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Code: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: code }),
        " · Share this link to earn commission on every sale 💸"
      ] })
    ] })
  ] });
}
function CaptionGenerator({ profile }) {
  const { data: products = [] } = useProducts();
  const [selectedId, setSelectedId] = reactExports.useState("");
  const selected = products.find((p) => String(p.id) === selectedId);
  function generateCaption() {
    if (!selected) return "";
    const link = affiliateUrl(profile.affiliateCode);
    return `🔥 *${selected.name}*

💰 মূল্য: ৳${Number(selected.price)}
✅ আপনার লাভ: ৳${Number(selected.commission)}

📦 দ্রুত ডেলিভারি | সারাদেশে পৌঁছে দেওয়া হবে

👉 অর্ডার করুন: ${link}

#ZoomCartBD #অনলাইনশপিং #ডোরস্টেপডেলিভারি`;
  }
  function copyCaption() {
    const caption = generateCaption();
    if (!caption) return;
    navigator.clipboard.writeText(caption);
    ue.success("Caption কপি হয়েছে! Share on WhatsApp/Facebook.");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 16, className: "text-secondary" }),
      "Caption Generator / ক্যাপশন জেনারেটর"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Product নির্বাচন করুন" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            value: selectedId,
            onChange: (e) => setSelectedId(e.target.value),
            "data-ocid": "caption.product_select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select a product —" }),
              products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(p.id), children: [
                p.name,
                " · ৳",
                Number(p.commission),
                " commission"
              ] }, String(p.id)))
            ]
          }
        )
      ] }),
      selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/50 border border-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs whitespace-pre-wrap break-words font-body text-foreground leading-relaxed", children: generateCaption() }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: copyCaption,
          disabled: !selected,
          "data-ocid": "caption.copy_button",
          className: "w-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14, className: "mr-1.5" }),
            "Caption কপি করুন · Copy Caption"
          ]
        }
      )
    ] })
  ] });
}
function OrdersTable({ orders }) {
  const { data: products = [] } = useProducts();
  const productMap = Object.fromEntries(
    products.map((p) => [String(p.id), p.name])
  );
  if (orders.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-dashed border-border bg-muted/30 py-10 text-center",
        "data-ocid": "orders.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ShoppingBag,
            {
              size: 36,
              className: "mx-auto mb-2 text-muted-foreground/40"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground", children: "কোনো অর্ডার নেই" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Share your affiliate link to get your first order!" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-semibold text-xs text-muted-foreground", children: "Product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-semibold text-xs text-muted-foreground hidden sm:table-cell", children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2.5 font-semibold text-xs text-muted-foreground", children: "Commission" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2.5 font-semibold text-xs text-muted-foreground", children: "Status" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: orders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
        "data-ocid": `orders.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-xs truncate max-w-[130px]", children: productMap[String(order.productId)] ?? "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground sm:hidden", children: formatDate(order.orderDate) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs text-muted-foreground hidden sm:table-cell", children: formatDate(order.orderDate) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right font-bold text-xs text-success", children: formatTk(order.commissionAmount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status }) })
        ]
      },
      String(order.id)
    )) })
  ] }) }) });
}
function RegistrationCard() {
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const { mutate: register, isPending, isError, error } = useRegisterReseller();
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    register(
      { name: name.trim(), email: email.trim() },
      {
        onSuccess: () => ue.success("রেজিস্ট্রেশন সফল! Awaiting admin approval."),
        onError: () => ue.error("Registration failed. Please try again.")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto px-4 py-8", "data-ocid": "registration.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-primary/20 shadow-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pb-2 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 28, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl font-display", children: "Become a Reseller" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "রিসেলার হিসেবে যোগ দিন — ১০০% বিনামূল্যে" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-6 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center my-4", children: ["100% Free", "Weekly bKash Pay", "No Stock Needed"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-success", children: t }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-name", className: "text-sm font-semibold", children: "Full Name / পূর্ণ নাম" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "reg-name",
              placeholder: "Your full name",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              "data-ocid": "registration.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-email", className: "text-sm font-semibold", children: "Email / ইমেইল" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "reg-email",
              type: "email",
              placeholder: "your@email.com",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              "data-ocid": "registration.email_input"
            }
          )
        ] }),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-xs text-destructive flex items-center gap-1",
            "data-ocid": "registration.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 12 }),
              error instanceof Error ? error.message : "Registration failed"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full font-bold h-12 text-base",
            disabled: isPending || !name.trim() || !email.trim(),
            "data-ocid": "registration.submit_button",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin inline-block w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" }),
              "Registering…"
            ] }) : "Register as Reseller / রিসেলার হিসেবে যোগ দিন"
          }
        )
      ] })
    ] })
  ] }) });
}
function PendingApprovalBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-4 mt-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 flex items-start gap-3",
      "data-ocid": "approval.pending_banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 20, className: "text-warning mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-warning", children: "Pending Approval / অনুমোদনের অপেক্ষায়" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-warning/80 mt-0.5 leading-relaxed", children: "আপনার আবেদন পর্যালোচনা করা হচ্ছে। অ্যাডমিন শীঘ্রই অনুমোদন দেবেন। You'll be notified once approved by the admin." })
        ] })
      ]
    }
  );
}
function Dashboard() {
  const { isAuthenticated, isInitializing } = useAuth();
  const {
    data: profile,
    isLoading: profileLoading,
    isFetched: profileFetched
  } = useMyResellerProfile();
  const { data: orders = [], isLoading: ordersLoading } = useMyOrders();
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-8 space-y-4 max-w-2xl mx-auto",
        "data-ocid": "dashboard.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) })
        ]
      }
    );
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center px-4 py-16 max-w-md mx-auto",
        "data-ocid": "dashboard.auth_required",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 30, className: "text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold", children: "Login Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Dashboard দেখতে প্রথমে login করুন। Please log in to access your reseller dashboard." })
        ]
      }
    );
  }
  if (profileLoading && !profileFetched) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-8 space-y-4 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) })
    ] });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RegistrationCard, {});
  }
  const pendingOrders = orders.filter((o) => o.status === OrderStatus.pending);
  const pendingBalance = pendingOrders.reduce(
    (s, o) => s + o.commissionAmount,
    0n
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto pb-10", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 24, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "text-lg font-display font-bold truncate",
              "data-ocid": "profile.name",
              children: profile.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: profile.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: profile.isApproved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "badge-success",
            "data-ocid": "profile.approved_badge",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 11 }),
              " Approved"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-warning", "data-ocid": "profile.pending_badge", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
          " Pending"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 pl-1", children: [
        "Joined ",
        formatDate(profile.registeredAt),
        " · Code:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: profile.affiliateCode })
      ] })
    ] }),
    !profile.isApproved && /* @__PURE__ */ jsxRuntimeExports.jsx(PendingApprovalBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-display font-bold text-muted-foreground uppercase tracking-wide mb-3", children: "Your Earnings / আপনার আয়" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", "data-ocid": "stats.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Earned",
            value: formatTk(profile.totalEarnings),
            icon: TrendingUp,
            color: "green"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Pending Balance",
            value: formatTk(pendingBalance),
            icon: DollarSign,
            color: "orange"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Sales",
            value: String(Number(profile.totalSales)),
            icon: ShoppingBag,
            color: "blue"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Orders",
            value: String(orders.length),
            icon: Package,
            color: "red"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateBox, { code: profile.affiliateCode }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CaptionGenerator, { profile }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-display font-bold text-muted-foreground uppercase tracking-wide", children: "Recent Orders / সাম্প্রতিক অর্ডার" }),
        orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "text-xs",
            "data-ocid": "orders.count_badge",
            children: [
              orders.length,
              " total"
            ]
          }
        )
      ] }),
      ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "orders.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersTable, { orders })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-display font-bold text-muted-foreground uppercase tracking-wide mb-3", children: "Resources / সাহায্য" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2", children: [
        {
          label: "Full Guideline / সম্পূর্ণ গাইডলাইন",
          href: "https://docs.google.com/document/d/1vpMIXqWgUf8UlaGPiK1yu-TRKYT_zQWhJVx8jW5GXWo/edit?usp=sharing",
          ocid: "resources.guideline_link"
        },
        {
          label: "Reseller Rules / নিয়মাবলি",
          href: "https://zoomcartbd.xyz/reseller-rules/",
          ocid: "resources.rules_link"
        },
        {
          label: "WhatsApp Support / সাপোর্ট",
          href: "https://wa.me/8801813797898",
          ocid: "resources.support_link"
        }
      ].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: link.href,
          target: "_blank",
          rel: "noopener noreferrer",
          "data-ocid": link.ocid,
          className: "flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted/40 transition-colors group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: link.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ExternalLink,
              {
                size: 14,
                className: "text-muted-foreground group-hover:text-foreground transition-colors"
              }
            )
          ]
        },
        link.href
      )) })
    ] })
  ] });
}
export {
  Dashboard as default
};
