

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  username: string;
  access: string;
  refresh: string;
  access_expires: number;
  refresh_expires: number;
}

export interface ApiErrorResponse {
  detail?: string;
  email?: string[];
  password?: string[];
  [key: string]: any;
}