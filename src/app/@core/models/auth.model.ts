export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  cookie: Cookie;
  passport: Passport;
}

export interface SignupCredentials extends LoginCredentials {
  fullName: string;
}

export interface SignupResponse extends LoginResponse {}

export interface Cookie {
  expires: Date;
  httpOnly: boolean;
  originalMaxAge: number;
  path: string;
  sameSite: boolean;
}

export interface Passport {
  user: User
}

export interface User {
  id: string;
}
