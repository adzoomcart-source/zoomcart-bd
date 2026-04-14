import type { backendInterface } from "../backend";
import { OrderStatus, ProductCategory, UserRole } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockPrincipal = { toString: () => "aaaaa-aa" } as Principal;

const sampleProducts = [
  {
    id: BigInt(1),
    name: "Turbo Fan",
    description: "Best-selling summer fan with powerful airflow. Stay cool all day!",
    commission: BigInt(120),
    imageUrl: "https://placehold.co/400x400/ff4444/ffffff?text=Turbo+Fan",
    isFeatured: true,
    category: ProductCategory.fan,
    price: BigInt(1200),
    createdAt: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(2),
    name: "Kitchen Chopper",
    description: "Multi-function vegetable chopper. Save time in the kitchen!",
    commission: BigInt(100),
    imageUrl: "https://placehold.co/400x400/ff8800/ffffff?text=Chopper",
    isFeatured: true,
    category: ProductCategory.kitchen,
    price: BigInt(950),
    createdAt: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(3),
    name: "Skin Care Kit",
    description: "Natural glow skin care set. Popular among women.",
    commission: BigInt(150),
    imageUrl: "https://placehold.co/400x400/22bb55/ffffff?text=Skin+Care",
    isFeatured: false,
    category: ProductCategory.health,
    price: BigInt(1500),
    createdAt: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(4),
    name: "Bluetooth Gadget",
    description: "Wireless mini speaker with FM radio. Trendy accessory!",
    commission: BigInt(130),
    imageUrl: "https://placehold.co/400x400/5533ff/ffffff?text=Gadget",
    isFeatured: false,
    category: ProductCategory.gadgets,
    price: BigInt(1100),
    createdAt: BigInt(Date.now() * 1_000_000),
  },
];

const sampleOrders = [
  {
    id: BigInt(1),
    customerName: "Rahim Uddin",
    customerPhone: "+8801712345678",
    productId: BigInt(1),
    status: OrderStatus.completed,
    orderDate: BigInt(Date.now() * 1_000_000),
    commissionAmount: BigInt(120),
    resellerPrincipal: mockPrincipal,
  },
  {
    id: BigInt(2),
    customerName: "Nasrin Akter",
    customerPhone: "+8801812345678",
    productId: BigInt(2),
    status: OrderStatus.pending,
    orderDate: BigInt(Date.now() * 1_000_000),
    commissionAmount: BigInt(100),
    resellerPrincipal: mockPrincipal,
  },
];

const sampleReseller = {
  isApproved: true,
  principal: mockPrincipal,
  name: "Karim Reseller",
  email: "karim@example.com",
  affiliateCode: "ZOOM123",
  registeredAt: BigInt(Date.now() * 1_000_000),
  totalSales: BigInt(42),
  totalEarnings: BigInt(4800),
};

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,
  addProduct: async (input) => ({
    ...input,
    id: BigInt(99),
    createdAt: BigInt(Date.now() * 1_000_000),
  }),
  assignCallerUserRole: async () => undefined,
  deleteProduct: async () => undefined,
  getCallerUserRole: async () => UserRole.user,
  getMyResellerProfile: async () => sampleReseller,
  getOrders: async () => sampleOrders,
  getOrdersByReseller: async () => sampleOrders,
  getProduct: async (id) => sampleProducts.find((p) => p.id === id) ?? null,
  getResellerProfile: async () => sampleReseller,
  initSampleProducts: async () => undefined,
  isCallerAdmin: async () => false,
  listProducts: async () => sampleProducts,
  listProductsByCategory: async (category) =>
    sampleProducts.filter((p) => p.category === category),
  listResellers: async () => [
    {
      isApproved: true,
      principal: mockPrincipal,
      name: "Karim Reseller",
      email: "karim@example.com",
      affiliateCode: "ZOOM123",
      registeredAt: BigInt(Date.now() * 1_000_000),
    },
  ],
  placeOrder: async (input) => ({
    id: BigInt(100),
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    productId: input.productId,
    status: OrderStatus.pending,
    orderDate: BigInt(Date.now() * 1_000_000),
    commissionAmount: BigInt(120),
    resellerPrincipal: mockPrincipal,
  }),
  registerReseller: async (input) => ({
    isApproved: false,
    principal: mockPrincipal,
    name: input.name,
    email: input.email,
    affiliateCode: "NEW" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    registeredAt: BigInt(Date.now() * 1_000_000),
  }),
  searchProducts: async (term) =>
    sampleProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.description.toLowerCase().includes(term.toLowerCase())
    ),
  updateOrderStatus: async () => undefined,
  updateProduct: async (id, input) => ({
    ...input,
    id,
    createdAt: BigInt(Date.now() * 1_000_000),
  }),
  updateResellerStatus: async () => undefined,
};
