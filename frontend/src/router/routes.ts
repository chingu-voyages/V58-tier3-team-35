import App from "@/App";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import List from "@/pages/List";
import Map from "@/pages/Map";
import NotFound from "@/pages/NotFound";

const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
        handle: { title: "Home | Chingu Demography" },
      },
      {
        path: "/list",
        Component: List,
        handle: { title: "User List | Chingu Demography" },
      },
      {
        path: "/map",
        Component: Map,
        handle: { title: "Map | Chingu Demography" },
      },
      {
        path: "*",
        Component: NotFound,
        handle: { title: "Not Found | Chingu Demography" },
      },
    ],
  },
];

export default routes;
