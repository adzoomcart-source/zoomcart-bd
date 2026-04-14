import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    id: OrderId;
    customerName: string;
    status: OrderStatus;
    customerPhone: string;
    orderDate: Timestamp;
    productId: ProductId;
    commissionAmount: bigint;
    resellerPrincipal: Principal;
}
export interface ResellerProfile {
    isApproved: boolean;
    principal: Principal;
    name: string;
    email: string;
    totalSales: bigint;
    totalEarnings: bigint;
    affiliateCode: string;
    registeredAt: Timestamp;
}
export type Timestamp = bigint;
export interface ProductInput {
    name: string;
    description: string;
    commission: bigint;
    imageUrl: string;
    isFeatured: boolean;
    category: ProductCategory;
    price: bigint;
}
export interface OrderInput {
    customerName: string;
    customerPhone: string;
    productId: ProductId;
    resellerAffiliateCode: string;
}
export interface ResellerInput {
    name: string;
    email: string;
}
export type ProductId = bigint;
export interface Reseller {
    isApproved: boolean;
    principal: Principal;
    name: string;
    email: string;
    affiliateCode: string;
    registeredAt: Timestamp;
}
export interface Product {
    id: ProductId;
    name: string;
    createdAt: Timestamp;
    description: string;
    commission: bigint;
    imageUrl: string;
    isFeatured: boolean;
    category: ProductCategory;
    price: bigint;
}
export type OrderId = bigint;
export enum OrderStatus {
    pending = "pending",
    paid = "paid",
    completed = "completed"
}
export enum ProductCategory {
    fan = "fan",
    gadgets = "gadgets",
    kitchen = "kitchen",
    health = "health"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(input: ProductInput): Promise<Product>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getMyResellerProfile(): Promise<ResellerProfile | null>;
    getOrders(): Promise<Array<Order>>;
    getOrdersByReseller(): Promise<Array<Order>>;
    getProduct(id: ProductId): Promise<Product | null>;
    getResellerProfile(principal: Principal): Promise<ResellerProfile | null>;
    initSampleProducts(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    listProducts(): Promise<Array<Product>>;
    listProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    listResellers(): Promise<Array<Reseller>>;
    placeOrder(input: OrderInput): Promise<Order>;
    registerReseller(input: ResellerInput): Promise<Reseller>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    updateOrderStatus(orderId: OrderId, status: OrderStatus): Promise<void>;
    updateProduct(id: ProductId, input: ProductInput): Promise<Product>;
    updateResellerStatus(principal: Principal, approved: boolean): Promise<void>;
}
