import { SignIn } from './user.interface';
import * as firebase from 'firebase';

export type SignInWithPasswordArgsType = SignIn;
export type SignInWithPasswordResponseType = Promise<Partial<firebase.User>>;
