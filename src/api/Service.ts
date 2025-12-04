import { apiFetch } from "./ApiFetcher";

export const fetchUserProfile = () => {
  return apiFetch("/user/me");
};
