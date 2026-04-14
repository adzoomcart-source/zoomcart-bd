export type {
  Product,
  ProductInput,
  ProductId,
  ProductCategory as ProductCategoryType,
  Order,
  OrderInput,
  OrderId,
  OrderStatus as OrderStatusType,
  Reseller,
  ResellerInput,
  ResellerProfile,
  Timestamp,
} from "../backend.d.ts";

export { ProductCategory, OrderStatus, UserRole } from "../backend";

export interface TrustSignal {
  icon: string;
  label: string;
  sublabel: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  labelBn: string;
  icon: string;
  value: string;
}

export type FilterCategory = "all" | "fan" | "gadgets" | "kitchen" | "health";
