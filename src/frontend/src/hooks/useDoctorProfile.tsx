import {
  type DoctorProfile,
  type SubmitDoctorRequestInput,
  createActor,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDoctorProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const query = useQuery<DoctorProfile | null>({
    queryKey: ["doctorProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDoctorProfile();
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

export function useSubmitDoctorRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SubmitDoctorRequestInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitDoctorRequest(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctorProfile"] });
      queryClient.invalidateQueries({ queryKey: ["doctorStatus"] });
    },
  });
}
