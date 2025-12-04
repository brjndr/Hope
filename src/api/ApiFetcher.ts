import keycloak from "../keycloak";

export const apiFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  // Refresh token if needed
  if (keycloak.authenticated) {
    try {
      await keycloak.updateToken(60);
    } catch (err) {
      console.error("Token refresh failed:", err);
      window.location.href = "/unauthorized";
    }
  }

  const token = keycloak.token;

  const response = await fetch(
    import.meta.env.VITE_API_BASE_URL + url,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  // Handle unauthorized response
  if (response.status === 401) {
    console.warn("Backend returned 401 → redirect to unauthorized");
    window.location.href = "/unauthorized";
    return Promise.reject("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(`API Error ${response.status}`);
  }

  return response.json() as Promise<T>;
};
