export interface CheckAuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
