export interface User{
  id:string;
  email:string;
  name:string;
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
