export type Tags = {
  id: string;
  tag_alias: string;
  description: string;
  created_on: string;
};

export type Connections = {
  id: string;
  auth_token: string;
  service: string;
  created_on: string;
  expires_on: string;
  user_id: string;
  meta_data: object;
};

export type HealthCheckResponse = {
  status: number;
  message: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  expires_on: string;
};

export type LogoutRequest = {
  token: string;
};
