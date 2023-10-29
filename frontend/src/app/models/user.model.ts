import { SocialUser } from '@abacritt/angularx-social-login';
export interface User extends SocialUser {
  address:string;
  token:string;
  isAdmin:boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name?: string;
  email: string;
  password : string;
  confirmPassword : string;
  address?: string;
}
