import { useContext } from "react";
import type { AuthContextValue } from "./AuthTypes";
import { AuthContext } from "./authContext";

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
};