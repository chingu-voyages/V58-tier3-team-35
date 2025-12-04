import { Navigate, useLocation } from "react-router-dom";
import { type ReactElement } from "react";
import { useAuth } from "@/context/AuthContext";
import { Box, Spinner } from "@chakra-ui/react";

type ProtectedRouteProps = {
  children: ReactElement;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  if (!user) {
    return (
      <Navigate to="/auth" replace state={{ from: location.pathname || "/" }} />
    );
  }

  return children;
}
