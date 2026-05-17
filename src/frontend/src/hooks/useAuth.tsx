import { UserRole, createActor } from "@/backend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type AppRole =
  | "admin"
  | "doctor"
  | "patient"
  | "user"
  | "guest"
  | "unknown";

export function useAuth() {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    login,
    clear,
    identity,
  } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const { data: userRole } = useQuery<UserRole>({
    queryKey: ["callerUserRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
    staleTime: 60_000,
  });

  const { data: isAdmin } = useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
    staleTime: 60_000,
  });

  const { data: doctorProfile } = useQuery({
    queryKey: ["doctorStatus"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDoctorStatus();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
    staleTime: 30_000,
  });

  function getAppRole(): AppRole {
    if (!isAuthenticated) return "guest";
    if (isAdmin) return "admin";
    if (doctorProfile) return "doctor";
    if (userRole === UserRole.user) return "patient";
    return "unknown";
  }

  function handleLogout() {
    clear();
    queryClient.clear();
  }

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    login,
    logout: handleLogout,
    identity,
    principal: identity?.getPrincipal(),
    role: getAppRole(),
    userRole,
    isAdmin: !!isAdmin,
    doctorProfile,
  };
}
