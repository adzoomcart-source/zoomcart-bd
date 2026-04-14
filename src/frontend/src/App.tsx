import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));

function PageLoader() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-4">
      <Skeleton className="h-48 w-full rounded-2xl" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(["a", "b", "c", "d"] as const).map((k) => (
          <Skeleton key={k} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Home />
      </Suspense>
    </Layout>
  ),
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Shop />
      </Suspense>
    </Layout>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <ProductDetail />
      </Suspense>
    </Layout>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <Layout>
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Layout>
      <ProtectedRoute requireAdmin>
        <Suspense fallback={<PageLoader />}>
          <Admin />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  shopRoute,
  productDetailRoute,
  dashboardRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
