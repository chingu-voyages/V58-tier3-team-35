import App from "@/App";
import Guest from "@/context/Guest";
import ProtectedRoute from "@/context/ProtectedRoute";
import Layout from "@/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import List from "@/pages/List";
import Login from "@/pages/Login";
import Map from "@/pages/Map";
import NotFound from "@/pages/NotFound";
import Signup from "@/pages/Signup";
import VerifyEmail from "@/pages/VerifyEmail";
import Logout from "@/pages/Logout";
import MyFilters from "@/pages/MyFilters";

const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
        handle: { title: "Home | ChinguVerse" },
      },
      {
        path: "list",
        Component: List,
        handle: { title: "User List | ChinguVerse" },
      },
      {
        path: "map",
        Component: Map,
        handle: { title: "Map | ChinguVerse" },
      },
      {
        path: "auth",
        Component: Guest,
        children: [
          {
            index: true,
            Component: Login,
            handle: { title: "Login | Chingu Verse" },
          },
          {
            path: "signup",
            Component: Signup,
            handle: { title: "Signup | Chingu Verse" },
          },
        ],
      },
      {
        path: "/user",
        Component: ProtectedRoute,
        children: [
          {
            index: true,
            Component: Dashboard,
            handle: { title: "Dashboard | ChinguVerse" },
          },
          {
            path: "favorite-filters",
            Component: MyFilters,
            handle: { title: "My Favorite Filters | ChinguVerse" },
          },
          {
            path: "logout",
            Component: Logout,
            handle: { title: "Logging out..." },
          },
        ],
      },
      {
        path: "verify-email/:token",
        Component: VerifyEmail,
      },
      {
        path: "*",
        Component: NotFound,
        handle: { title: "Not Found | ChinguVerse" },
      },
    ],
  },
];

export default routes;
