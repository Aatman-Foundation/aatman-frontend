import { useCallback, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import apiClient from "../api/client.js";

export function useLogout() {
  const toast = useToast();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    let shouldResetAuth = false;

    try {
      await apiClient.post(
        "/user/logout",
        {},
        {
          headers: { "Content-Type": "application/json" },
          skipAuthRefresh: true,
        },
      );

      shouldResetAuth = true;
      toast({
        title: "Logged out",
        description: "You have been signed out successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const status = error.response?.status;

      if (status === 401) {
        // Session already invalidated on the server; treat as logged out.
        shouldResetAuth = true;
        toast({
          title: "Session ended",
          description: "Your session had already expired.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const description =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Unable to log out right now.";

        toast({
          title: "Logout failed",
          description,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoggingOut(false);

      if (shouldResetAuth) {
        setIsAuthenticated(false);
        navigate("/", { replace: true });
      }
    }
  }, [isLoggingOut, navigate, setIsAuthenticated, toast]);

  return { logout, isLoggingOut };
}
