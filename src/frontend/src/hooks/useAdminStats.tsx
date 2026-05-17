import {
  type AccessLog,
  type DashboardStats,
  type DoctorProfile,
  createActor,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdminStats() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor)
        return {
          totalPatients: BigInt(0),
          totalAccessLogs: BigInt(0),
          pendingRequests: BigInt(0),
          totalDoctors: BigInt(0),
        };
      return actor.getDashboardStats();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });
}

export function usePendingDoctorRequests() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<DoctorProfile[]>({
    queryKey: ["pendingDoctorRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingDoctorRequests();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 20_000,
  });
}

export function useAllDoctors() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<DoctorProfile[]>({
    queryKey: ["allDoctors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDoctors();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });
}

export function useAccessLogs() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<AccessLog[]>({
    queryKey: ["accessLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAccessLogs();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 20_000,
  });
}

export function useApproveDoctor() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (doctorId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.approveDoctorRequest(doctorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingDoctorRequests"] });
      queryClient.invalidateQueries({ queryKey: ["allDoctors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useRejectDoctor() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      doctorId,
      reason,
    }: { doctorId: bigint; reason: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.rejectDoctorRequest(doctorId, reason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingDoctorRequests"] });
      queryClient.invalidateQueries({ queryKey: ["allDoctors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useSuspendDoctor() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (doctorId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.suspendDoctor(doctorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allDoctors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}
