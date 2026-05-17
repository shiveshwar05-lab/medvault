import { l as useActor, n as useQueryClient, m as useQuery, o as createActor, q as AccessType } from "./index-1WRhTf4i.js";
import { u as useMutation } from "./useMutation-Coptp5Yz.js";
function usePatientProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const query = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 3e4
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched
  };
}
function useRegisterPatient() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.registerPatient(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      queryClient.invalidateQueries({ queryKey: ["callerUserRole"] });
    }
  });
}
function useUpdatePatientProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePatientProfile(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    }
  });
}
function useEmergencyAccess(emergencyId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["emergencyInfo", emergencyId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPatientEmergencyInfo(emergencyId, AccessType.qr_scan);
    },
    enabled: !!actor && !actorFetching && !!emergencyId,
    staleTime: 6e4,
    retry: 1
  });
}
export {
  usePatientProfile as a,
  useUpdatePatientProfile as b,
  useEmergencyAccess as c,
  useRegisterPatient as u
};
