import { getAccessToken } from "@/lib/local-storage";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = getAccessToken();
        if (!accessToken) {
          navigate("/auth/login", {
            state: { returnUrl: location?.pathname },
            replace: true,
          });
          return;
        }
      } catch {
        navigate("/auth/login", {
          state: { returnUrl: location?.pathname },
          replace: true,
        });
      }
    };

    checkAuth();
  }, [navigate, location?.pathname]);

  return <>{children}</>;
}
