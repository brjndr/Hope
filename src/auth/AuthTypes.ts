export interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  name?: string;
  roles: string[];
}

export interface AuthContextValue {
  initialized: boolean;
  isAuthenticated: boolean;
  user: UserProfile | null;
  accessToken: string | null;
  login: () => void;
  logout: () => void;
  hasRole: (role: string) => boolean;
}
