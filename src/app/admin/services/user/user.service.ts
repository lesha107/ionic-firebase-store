import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { initFirestoreCollection } from 'src/app/utils/firebase/firestore';
import { UserBase } from 'src/app/auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly _afs: AngularFirestore) {}

  getUsers(): Observable<UserBase[]> {
    return this._afs.collectionGroup('users').snapshotChanges().pipe(map(initFirestoreCollection));
  }
}
