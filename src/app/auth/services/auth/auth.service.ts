import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  SignInResponseType,
  SignInArgsType,
  CreateUserArgsType,
  CreateUserResponeType,
  UpdateUserArgsInterface,
} from '../../interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';
export interface User {
  uid: string;
  email: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly currentUser$: BehaviorSubject<firebase.User>;
  user$: Observable<any>;
  constructor(
    private readonly _afAuth: AngularFireAuth,
    private readonly _afs: AngularFirestore,
    private readonly _toastrService: ToastrService
  ) {
    this.user$ = this._afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this._afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.currentUser$ = new BehaviorSubject(null);
  }

  public get user(): firebase.User {
    return this.currentUser$.getValue();
  }

  async signIn(args: SignInArgsType): SignInResponseType {
    try {
      const { email, password } = args;
      const credential = await this._afAuth.signInWithEmailAndPassword(email, password);

      this.currentUser$.next(credential.user);
      return credential.user;
    } catch (err) {
      return null;
    }
  }

  async createUser(args: CreateUserArgsType): CreateUserResponeType {
    try {
      const { email, password } = args;
      const user = await this._afAuth.createUserWithEmailAndPassword(email, password);

      this._toastrService.success('User Created');

      return user;
    } catch (err) {}
  }

  async updateUsersData(args: UpdateUserArgsInterface): Promise<void> {
    try {
      const { data, options } = args;
      const user = await this._afs.collection('users').doc(data.user.uid).set(options);

      this._toastrService.success('User Updated');
    } catch (err) {}
  }
}
