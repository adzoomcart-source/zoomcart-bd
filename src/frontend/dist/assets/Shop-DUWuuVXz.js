import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, S as Skeleton } from "./index-BZpH0Fbn.js";
import { u as useProducts, a as useSearchProducts, B as Badge, P as Package } from "./useProducts-JdFzQaP-.js";
import { I as Input } from "./input-CwkB7uKT.js";
import { m as motion } from "./proxy-BDEox-Hz.js";
import { T as TrendingUp } from "./trending-up-BZ4keVdQ.js";
import { S as Star } from "./star-adzUYa1i.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const categoryTabs = [
  { value: "all", label: "All", labelBn: "সব", emoji: "🏪" },
  { value: "fan", label: "Turbo Fan", labelBn: "ফ্যান", emoji: "💨" },
  { value: "kitchen", label: "Kitchen Tools", labelBn: "রান্নাঘর", emoji: "🍳" },
  { value: "health", label: "Health & Beauty", labelBn: "স্বাস্থ্য", emoji: "💄" },
  { value: "gadgets", label: "Gadgets", labelBn: "গ্যাজেট", emoji: "📱" }
];
function ProductCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "product-card p-3 flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-square rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded-lg" })
  ] });
}
function Shop() {
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [searchInput, setSearchInput] = reactExports.useState("");
  const { data: categoryProducts, isLoading: catLoading } = useProducts(activeCategory);
  const { data: searchResults, isLoading: searchLoading } = useSearchProducts(searchTerm);
  const isSearching = searchTerm.trim().length > 0;
  const products = isSearching ? searchResults ?? [] : categoryProducts ?? [];
  const isLoading = isSearching ? searchLoading : catLoading;
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "rounded-2xl bg-gradient-to-r from-primary to-secondary p-5 mb-5 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-primary-foreground/80 uppercase tracking-widest mb-1", children: "লাভজনক পণ্যসমূহ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-black text-2xl text-primary-foreground leading-tight mb-1", children: [
              "Profit with Top",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Trending Products 🔥"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary-foreground/80", children: "High demand products = Easy sale" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary-foreground/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-2 -bottom-6 w-16 h-16 rounded-full bg-primary-foreground/10" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 mb-5 no-scrollbar", children: [
      { emoji: "⚡", text: "Fast Delivery", sub: "২৪-৪৮ ঘণ্টা" },
      { emoji: "💳", text: "Weekly Pay", sub: "bKash / Nagad" },
      { emoji: "✅", text: "Free Register", sub: "100% বিনামূল্যে" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "trust-signal shrink-0 gap-1 flex-col items-start py-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: s.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-xs", children: s.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-[10px]", children: s.sub })
        ]
      },
      s.text
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "flex gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "search",
            placeholder: "Search products / পণ্য খুঁজুন...",
            value: searchInput,
            onChange: (e) => setSearchInput(e.target.value),
            className: "pl-9 h-10",
            "data-ocid": "shop.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 font-bold",
          "data-ocid": "shop.search_submit_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" })
        }
      ),
      isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => {
            setSearchTerm("");
            setSearchInput("");
          },
          className: "h-10 text-xs",
          "data-ocid": "shop.search_clear_button",
          children: "Clear"
        }
      )
    ] }),
    !isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar", children: categoryTabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveCategory(tab.value),
        className: `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-smooth border ${activeCategory === tab.value ? "bg-primary text-primary-foreground border-primary shadow-card" : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30"}`,
        "data-ocid": `shop.category_tab.${tab.value}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: tab.label })
        ]
      },
      tab.value
    )) }),
    !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: products.length }),
        " ",
        isSearching ? `results for "${searchTerm}"` : "products found"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sorted by trending" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3", children: [
      isLoading ? ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}, k)) : products.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: Math.min(idx * 0.05, 0.3) },
          className: "product-card flex flex-col",
          "data-ocid": `shop.product_card.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/product/$id",
                params: { id: product.id.toString() },
                className: "flex flex-col flex-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-3 pb-0", children: [
                    product.isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-1.5 left-1.5 bg-warning text-warning-foreground text-[10px] font-bold z-10 px-1.5 py-0.5 flex items-center gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5 fill-current" }),
                      "Hot"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-lg overflow-hidden bg-muted/40", children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: product.imageUrl,
                        alt: product.name,
                        className: "w-full h-full object-cover transition-smooth hover:scale-105"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-4xl", children: "📦" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 pt-2.5 flex flex-col flex-1 gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xs leading-tight line-clamp-2", children: product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-price-strike text-xs", children: [
                        "৳",
                        product.price.toString()
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm", children: [
                        "৳",
                        (product.price - product.commission).toString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "badge-commission text-[11px] self-start", children: [
                      "Profit: ৳",
                      product.commission.toString()
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/product/$id",
                  params: { id: product.id.toString() },
                  "data-ocid": `shop.order_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      className: "w-full bg-primary text-primary-foreground hover:opacity-90 font-bold text-xs h-8",
                      children: "Order for Customer"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/product/$id",
                  params: { id: product.id.toString() },
                  "data-ocid": `shop.save_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "w-full font-semibold text-xs h-7",
                      children: "Save Product"
                    }
                  )
                }
              )
            ] })
          ]
        },
        product.id.toString()
      )),
      !isLoading && products.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "col-span-2 md:col-span-4 py-16 text-center",
          "data-ocid": "shop.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-16 h-16 mx-auto mb-4 text-muted-foreground/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base mb-1", children: "No products found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: isSearching ? "Try a different search term / অন্য কিছু খুঁজুন" : "Products will appear here soon / শীঘ্রই পণ্য যোগ হবে" }),
            isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setSearchTerm("");
                  setSearchInput("");
                },
                "data-ocid": "shop.empty_clear_button",
                children: "Clear Search"
              }
            )
          ]
        }
      )
    ] }),
    !isLoading && products.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.4 },
        className: "mt-8 rounded-2xl section-alt border border-border p-5 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-base mb-1", children: "💸 আজই রিসেলার হিসেবে যোগ দিন" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "1 sale = ৳80–150 commission | 5 sales/day = ৳400–700" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://zoomcartbd.xyz/affiliate-registration/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "cta-primary text-sm",
              "data-ocid": "shop.reseller_cta",
              children: "Become a Reseller — Free!"
            }
          )
        ]
      }
    )
  ] });
}
export {
  Shop as default
};
