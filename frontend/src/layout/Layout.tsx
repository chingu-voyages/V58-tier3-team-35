import { Outlet, useLocation, useMatch, useMatches } from "react-router";
import Header from "./Header";
import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type RouteHandle = {
  title: string;
};

export default function Layout() {
  const location = useLocation();
  const matches = useMatches();

  useEffect(() => {
    const current = matches[matches.length - 1];
    const handle = current?.handle as RouteHandle;
    if (handle?.title) {
      document.title = handle?.title;
    }
  }, [matches]);
  return (
    <Box minH="100vh" display="flex" flexDir="column">
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Box as="main" flex="1">
            <Outlet key={location.pathname} />
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
