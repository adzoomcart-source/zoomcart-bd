import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Order,
  Reseller,
  ResellerInput,
  ResellerProfile,
} from "../backend.d.ts";

export function useMyResellerProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  const query = useQuery<ResellerProfile | null>({
    queryKey: ["myResellerProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getMyResellerProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useMyOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<Order[]>({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrdersByReseller();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
  });
}

export function useAllOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<Order[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
  });
}

export function useAllResellers() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<Reseller[]>({
    queryKey: ["allResellers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listResellers();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
  });
}

export function useRegisterReseller() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ResellerInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.registerReseller(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myResellerProfile"] });
    },
  });
}

export function useApproveReseller() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      principal,
      approved,
    }: { principal: Principal; approved: boolean }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateResellerStatus(principal, approved);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allResellers"] });
    },
  });
}
