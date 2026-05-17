import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 2 },
  },
});

const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const PatientRegisterPage = lazy(() => import("@/pages/PatientRegisterPage"));
const PatientDashboardPage = lazy(() => import("@/pages/PatientDashboardPage"));
const PatientProfileEditPage = lazy(
  () => import("@/pages/PatientProfileEditPage"),
);
const DoctorRegisterPage = lazy(() => import("@/pages/DoctorRegisterPage"));
const DoctorDashboardPage = lazy(() => import("@/pages/DoctorDashboardPage"));
const EmergencyAccessPage = lazy(() => import("@/pages/EmergencyAccessPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-background">
          <LoadingSpinner size="lg" label="Loading..." />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <SuspenseWrapper>
      <HomePage />
    </SuspenseWrapper>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <SuspenseWrapper>
      <LoginPage />
    </SuspenseWrapper>
  ),
});

const patientRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/register",
  component: () => (
    <SuspenseWrapper>
      <PatientRegisterPage />
    </SuspenseWrapper>
  ),
});

const patientDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/dashboard",
  component: () => (
    <SuspenseWrapper>
      <PatientDashboardPage />
    </SuspenseWrapper>
  ),
});

const patientProfileEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/profile/edit",
  component: () => (
    <SuspenseWrapper>
      <PatientProfileEditPage />
    </SuspenseWrapper>
  ),
});

const doctorRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/doctor/register",
  component: () => (
    <SuspenseWrapper>
      <DoctorRegisterPage />
    </SuspenseWrapper>
  ),
});

const doctorDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/doctor/dashboard",
  component: () => (
    <SuspenseWrapper>
      <DoctorDashboardPage />
    </SuspenseWrapper>
  ),
});

const emergencyAccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/emergency/$emergencyId",
  component: () => (
    <SuspenseWrapper>
      <EmergencyAccessPage />
    </SuspenseWrapper>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <SuspenseWrapper>
      <AdminPage />
    </SuspenseWrapper>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  patientRegisterRoute,
  patientDashboardRoute,
  patientProfileEditRoute,
  doctorRegisterRoute,
  doctorDashboardRoute,
  emergencyAccessRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
