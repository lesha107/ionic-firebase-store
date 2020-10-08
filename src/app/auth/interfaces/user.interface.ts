export interface UserBase {
  email: string;
  password: string;
  roles: ['client' | 'saller'];
  uid?: string;
}

export interface OrderOptions {
  order: string;
  price: number;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  password: string;
  roles: ['client' | 'saller'];
}
