import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Package, Search, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useProducts, useSearchProducts } from "../hooks/useProducts";
import type { FilterCategory } from "../types";

const categoryTabs: {
  value: FilterCategory;
  label: string;
  labelBn: string;
  emoji: string;
}[] = [
  { value: "all", label: "All", labelBn: "সব", emoji: "🏪" },
  { value: "fan", label: "Turbo Fan", labelBn: "ফ্যান", emoji: "💨" },
  { value: "kitchen", label: "Kitchen Tools", labelBn: "রান্নাঘর", emoji: "🍳" },
  { value: "health", label: "Health & Beauty", labelBn: "স্বাস্থ্য", emoji: "💄" },
  { value: "gadgets", label: "Gadgets", labelBn: "গ্যাজেট", emoji: "📱" },
];

function ProductCardSkeleton() {
  return (
    <div className="product-card p-3 flex flex-col gap-2">
      <Skeleton className="w-full aspect-square rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-8 w-full rounded-lg" />
    </div>
  );
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data: categoryProducts, isLoading: catLoading } =
    useProducts(activeCategory);
  const { data: searchResults, isLoading: searchLoading } =
    useSearchProducts(searchTerm);

  const isSearching = searchTerm.trim().length > 0;
  const products = isSearching
    ? (searchResults ?? [])
    : (categoryProducts ?? []);
  const isLoading = isSearching ? searchLoading : catLoading;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-5 mb-5 relative overflow-hidden"
      >
        <div className="relative z-10">
          <p className="text-xs font-bold text-primary-foreground/80 uppercase tracking-widest mb-1">
            লাভজনক পণ্যসমূহ
          </p>
          <h1 className="font-display font-black text-2xl text-primary-foreground leading-tight mb-1">
            Profit with Top
            <br />
            Trending Products 🔥
          </h1>
          <p className="text-xs text-primary-foreground/80">
            High demand products = Easy sale
          </p>
        </div>
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary-foreground/10" />
        <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full bg-primary-foreground/10" />
      </motion.div>

      {/* Trust Signals */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 no-scrollbar">
        {[
          { emoji: "⚡", text: "Fast Delivery", sub: "২৪-৪৮ ঘণ্টা" },
          { emoji: "💳", text: "Weekly Pay", sub: "bKash / Nagad" },
          { emoji: "✅", text: "Free Register", sub: "100% বিনামূল্যে" },
        ].map((s) => (
          <div
            key={s.text}
            className="trust-signal shrink-0 gap-1 flex-col items-start py-2"
          >
            <span className="text-base leading-none">{s.emoji}</span>
            <span className="font-bold text-xs">{s.text}</span>
            <span className="text-muted-foreground text-[10px]">{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products / পণ্য খুঁজুন..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 h-10"
            data-ocid="shop.search_input"
          />
        </div>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 font-bold"
          data-ocid="shop.search_submit_button"
        >
          <Search className="w-4 h-4" />
        </Button>
        {isSearching && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSearchInput("");
            }}
            className="h-10 text-xs"
            data-ocid="shop.search_clear_button"
          >
            Clear
          </Button>
        )}
      </form>

      {/* Category Filter */}
      {!isSearching && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveCategory(tab.value)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-smooth border ${
                activeCategory === tab.value
                  ? "bg-primary text-primary-foreground border-primary shadow-card"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
              data-ocid={`shop.category_tab.${tab.value}`}
            >
              <span>{tab.emoji}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      {!isLoading && (
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{products.length}</span>{" "}
            {isSearching ? `results for "${searchTerm}"` : "products found"}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5 text-success" />
            <span>Sorted by trending</span>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {isLoading
          ? (["a", "b", "c", "d", "e", "f"] as const).map((k) => (
              <ProductCardSkeleton key={k} />
            ))
          : products.map((product, idx) => (
              <motion.div
                key={product.id.toString()}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                className="product-card flex flex-col"
                data-ocid={`shop.product_card.${idx + 1}`}
              >
                <Link
                  to="/product/$id"
                  params={{ id: product.id.toString() }}
                  className="flex flex-col flex-1"
                >
                  {/* Image */}
                  <div className="relative p-3 pb-0">
                    {product.isFeatured && (
                      <Badge className="absolute top-1.5 left-1.5 bg-warning text-warning-foreground text-[10px] font-bold z-10 px-1.5 py-0.5 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Hot
                      </Badge>
                    )}
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted/40">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover transition-smooth hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          📦
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 pt-2.5 flex flex-col flex-1 gap-1.5">
                    <h3 className="font-display font-semibold text-xs leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-price-strike text-xs">
                        ৳{product.price.toString()}
                      </span>
                      <span className="font-bold text-sm">
                        ৳{(product.price - product.commission).toString()}
                      </span>
                    </div>
                    <div className="badge-commission text-[11px] self-start">
                      Profit: ৳{product.commission.toString()}
                    </div>
                  </div>
                </Link>

                {/* CTA */}
                <div className="px-3 pb-3 flex flex-col gap-1.5">
                  <Link
                    to="/product/$id"
                    params={{ id: product.id.toString() }}
                    data-ocid={`shop.order_button.${idx + 1}`}
                  >
                    <Button
                      size="sm"
                      className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold text-xs h-8"
                    >
                      Order for Customer
                    </Button>
                  </Link>
                  <Link
                    to="/product/$id"
                    params={{ id: product.id.toString() }}
                    data-ocid={`shop.save_button.${idx + 1}`}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full font-semibold text-xs h-7"
                    >
                      Save Product
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}

        {/* Empty State */}
        {!isLoading && products.length === 0 && (
          <div
            className="col-span-2 md:col-span-4 py-16 text-center"
            data-ocid="shop.empty_state"
          >
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="font-display font-bold text-base mb-1">
              No products found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isSearching
                ? "Try a different search term / অন্য কিছু খুঁজুন"
                : "Products will appear here soon / শীঘ্রই পণ্য যোগ হবে"}
            </p>
            {isSearching && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSearchInput("");
                }}
                data-ocid="shop.empty_clear_button"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Banner */}
      {!isLoading && products.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-2xl section-alt border border-border p-5 text-center"
        >
          <p className="font-display font-black text-base mb-1">
            💸 আজই রিসেলার হিসেবে যোগ দিন
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            1 sale = ৳80–150 commission | 5 sales/day = ৳400–700
          </p>
          <a
            href="https://zoomcartbd.xyz/affiliate-registration/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary text-sm"
            data-ocid="shop.reseller_cta"
          >
            Become a Reseller — Free!
          </a>
        </motion.div>
      )}
    </div>
  );
}
