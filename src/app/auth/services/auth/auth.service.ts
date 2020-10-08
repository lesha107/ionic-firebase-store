import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  SignInResponseType,
  SignInArgsType,
  SignUpArgsType,
  SignUpResponeType,
  UpdateUserArgsInterface,
} from '../../interfaces';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { initFirestoreDoc } from 'src/app/utils/firebase';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _userSubject: ReplaySubject<firebase.User>;
  private readonly _user$: Observable<firebase.User>;

  constructor(private readonly _afAuth: AngularFireAuth, private readonly _afs: AngularFirestore) {
    this._userSubject = new ReplaySubject(1);
    this._user$ = this._userSubject.asObservable();
  }

  get user$() {
    return this.uid$.pipe(
      switchMap((uid) => this._afs.collection('users').doc(uid).snapshotChanges()),
      map(initFirestoreDoc)
    );
  }

  private get uid$() {
    return this._user$.pipe(
      filter((user) => !!user?.uid),
      map((user) => user.uid)
    );
  }

  async signIn(args: SignInArgsType): SignInResponseType {
    try {
      const { email, password } = args;
      const credential = await this._afAuth.signInWithEmailAndPassword(email, password);

      this._userSubject.next(credential.user);

      return credential.user;
    } catch (err) {
      return null;
    }
  }

  async signUp(args: SignUpArgsType): SignUpResponeType {
    try {
      const { email, password } = args;
      const credential = await this._afAuth.createUserWithEmailAndPassword(email, password);

      this._userSubject.next(credential.user);

      return credential;
    } catch (err) {}
  }

  async updateUsersData(args: UpdateUserArgsInterface): Promise<void> {
    try {
      const { data, options } = args;
      await this._afs.collection('users').doc(data.user.uid).set(options);
    } catch (err) {}
  }
}
