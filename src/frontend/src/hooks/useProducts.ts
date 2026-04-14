import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductCategory, createActor } from "../backend";
import type {
  Order,
  OrderInput,
  Product,
  ProductId,
  ProductInput,
} from "../backend.d.ts";
import type { FilterCategory } from "../types";

export function useProducts(category?: FilterCategory) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!actor) return [];
      if (!category || category === "all") {
        return actor.listProducts();
      }
      const catMap: Record<string, ProductCategory> = {
        fan: ProductCategory.fan,
        gadgets: ProductCategory.gadgets,
        kitchen: ProductCategory.kitchen,
        health: ProductCategory.health,
      };
      return actor.listProductsByCategory(catMap[category]);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useProduct(id: ProductId | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !actorFetching && id !== null,
  });
}

export function useSearchProducts(term: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products", "search", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchProducts(term);
    },
    enabled: !!actor && !actorFetching && term.trim().length > 0,
    staleTime: 1000 * 30,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<Order, Error, OrderInput>({
    mutationFn: async (input: OrderInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.placeOrder(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

export function useAddProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ProductInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addProduct(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: ProductId; input: ProductInput }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProduct(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: ProductId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
