import { c as createLucideIcon, j as jsxRuntimeExports, y as Slot, f as cn, z as cva, t as useActor, A as useQuery, v as useQueryClient, C as useMutation, w as createActor, P as ProductCategory } from "./index-BZpH0Fbn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function useProducts(category) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!actor) return [];
      if (!category || category === "all") {
        return actor.listProducts();
      }
      const catMap = {
        fan: ProductCategory.fan,
        gadgets: ProductCategory.gadgets,
        kitchen: ProductCategory.kitchen,
        health: ProductCategory.health
      };
      return actor.listProductsByCategory(catMap[category]);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useProduct(id) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !actorFetching && id !== null
  });
}
function useSearchProducts(term) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", "search", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchProducts(term);
    },
    enabled: !!actor && !actorFetching && term.trim().length > 0,
    staleTime: 1e3 * 30
  });
}
function usePlaceOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.placeOrder(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    }
  });
}
function useAddProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addProduct(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProduct(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
export {
  Badge as B,
  Package as P,
  useSearchProducts as a,
  useProduct as b,
  usePlaceOrder as c,
  useDeleteProduct as d,
  useAddProduct as e,
  useUpdateProduct as f,
  useProducts as u
};
