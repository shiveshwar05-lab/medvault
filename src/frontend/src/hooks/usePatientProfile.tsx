import { AccessType, createActor } from "@/backend";
import type { PatientProfile, RegisterPatientInput } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function usePatientProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const query = useQuery<PatientProfile | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useRegisterPatient() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RegisterPatientInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.registerPatient(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      queryClient.invalidateQueries({ queryKey: ["callerUserRole"] });
    },
  });
}

export function useUpdatePatientProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RegisterPatientInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePatientProfile(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

export function useEmergencyAccess(emergencyId: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["emergencyInfo", emergencyId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPatientEmergencyInfo(emergencyId, AccessType.qr_scan);
    },
    enabled: !!actor && !actorFetching && !!emergencyId,
    staleTime: 60_000,
    retry: 1,
  });
}
