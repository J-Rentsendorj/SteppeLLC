export const UserRole = {
  Investor: 1,
  Admin: 2
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const UserStatus = {
  Pending: 0,
  Approved: 1,
  Rejected: 2
} as const;

export type UserStatus = typeof UserStatus[keyof typeof UserStatus];

export interface User {
  id: string;
  email: string;
  fullName: string;
  organization?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  approvedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  organization?: string;
  accreditedInvestorAttestation: boolean;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  tokenType: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
