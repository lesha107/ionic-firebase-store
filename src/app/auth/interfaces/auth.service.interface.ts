import * as firebase from 'firebase';
import { SignIn, SignUp } from './user.interface';

export type SignInArgsType = SignIn;

export type SignInResponseType = Promise<Partial<firebase.User>>;

export type CreateUserArgsType = SignIn;

export type CreateUserResponeType = Promise<Partial<firebase.auth.UserCredential>>;

export interface UpdateUserArgsInterface {
  data: Partial<firebase.auth.UserCredential>;
  options: SignUp;
}
