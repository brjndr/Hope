import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import keycloak from "../keycloak";
import type { AuthContextValue, UserProfile } from "./AuthTypes";
import { AuthContext } from "./authContext";

interface IAuthContextProps {
  children: ReactNode;
}

export const AuthProvider = ({ children} : IAuthContextProps) => {
    const [initialized, setInitialized] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const initRef = useRef(false);

    const setupTokenRefresh = () => {
        // Refresh token a bit before expiry
        const refreshInterval = setInterval(async () => {
        try {
            const refreshed = await keycloak.updateToken(60); 
            if (refreshed) {
                setAccessToken(keycloak.token || null);
            }
        } catch (err) {
            console.error("Failed to refresh token", err);
            setIsAuthenticated(false);
            setAccessToken(null);
            setUser(null);
            window.location.href = "/unauthorized";
        }
        }, 30000); // every 30 seconds check/refresh 

        window.addEventListener("beforeunload", () => clearInterval(refreshInterval));
    };

    useEffect(() => {
        if (initRef.current) return;  
        initRef.current = true;
        // Initialize Keycloak WITHOUT auto login
        keycloak
            .init({
                checkLoginIframe: false, // avoids iframe CSP errors
                pkceMethod: "S256",
            })
            .then((authenticated) => {
                if (authenticated) {
                setIsAuthenticated(true);
                setAccessToken(keycloak.token || null);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const tokenParsed: any = keycloak.tokenParsed;

                const roles: string[] =
                    tokenParsed?.realm_access?.roles ||
                    tokenParsed?.resource_access?.[keycloak.clientId as string]?.roles || [];

                setUser({
                    id: tokenParsed.sub,
                    username: tokenParsed.preferred_username,
                    email: tokenParsed.email,
                    name: tokenParsed.name,
                    roles,
                });

                console.log("User authenticated:", keycloak.tokenParsed);
                console.log("token:", keycloak.token);

                setupTokenRefresh();

                // redirect to dashboard after successful login
                window.history.replaceState({}, "", "/dashboard");
                }

                setInitialized(true);
            })
            .catch((err) => {
                console.error("Keycloak init error:", err);
                setInitialized(true);
                window.location.href = "/unauthorized";
            });     
    }, []);

    const login = () => keycloak.login({ 
        redirectUri: window.location.origin + "/dashboard"    
    });

    const logout = () => {
        keycloak.logout({redirectUri: window.location.origin + "/login"});
    };

    const hasRole = (role: string): boolean => {
        if (!user) return false;
        return user.roles.includes(role);
    };

    const value: AuthContextValue = {
        initialized,
        isAuthenticated,
        user,
        accessToken,
        login,
        logout,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
