import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "../app/auth/AuthGuard";
import { authRoles } from "../app/auth/authRoles";

import Loadable from "../app/components/Loadable";
import MatxLayout from "../app/components/MatxLayout/MatxLayout";

import materialRoutes from "../app/views/material-kit/MaterialRoutes";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("../app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("../app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("../app/views/sessions/JwtRegister")));
const ForgotPassword = Loadable(lazy(() => import("../app/views/sessions/ForgotPassword")));
// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("../app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("../app/views/dashboard/Analytics")));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.guest },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.guest }
    ]
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },

  { path: "/staff", element: <Navigate to="dashboard/default" /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
