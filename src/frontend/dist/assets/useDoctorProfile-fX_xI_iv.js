import { l as useActor, m as useQuery, n as useQueryClient, o as createActor } from "./index-1WRhTf4i.js";
import { u as useMutation } from "./useMutation-Coptp5Yz.js";
function useDoctorProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const query = useQuery({
    queryKey: ["doctorProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDoctorProfile();
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
function useSubmitDoctorRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitDoctorRequest(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctorProfile"] });
      queryClient.invalidateQueries({ queryKey: ["doctorStatus"] });
    }
  });
}
export {
  useSubmitDoctorRequest as a,
  useDoctorProfile as u
};
