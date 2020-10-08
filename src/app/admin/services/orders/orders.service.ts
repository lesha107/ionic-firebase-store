import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { initFirestoreCollection } from 'src/app/utils/firebase/firestore';
import { AuthService } from 'src/app/auth/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DataItem } from '../../interfaces';
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly ordersCollectionBehaviourSubject: BehaviorSubject<AngularFirestoreCollection>;

  constructor(private readonly _afs: AngularFirestore, private readonly _authService: AuthService) {
    this.ordersCollectionBehaviourSubject = new BehaviorSubject(null);

    this._authService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      const orders = this._afs.collection('users').doc(user.uid).collection('orders');
      this.ordersCollectionBehaviourSubject.next(orders);
    });
  }

  private get ordersCollection(): AngularFirestoreCollection<firebase.firestore.DocumentData> {
    return this.ordersCollectionBehaviourSubject.getValue();
  }

  public createNewOrder(data): void {
    const { id, ...user } = data;

    console.log(data);

    this.ordersCollection.doc(id.toString()).set(user);
  }

  public getUserOrders(): Observable<DataItem[]> {
    return this._authService.user$.pipe(
      switchMap((user) =>
        this._afs
          .collection('users')
          .doc(user.uid)
          .collection('orders')
          .snapshotChanges()
          .pipe(map(initFirestoreCollection))
      )
    );
  }

  public getAllOrders(): Observable<DataItem[]> {
    return this._afs.collectionGroup('orders').snapshotChanges().pipe(map(initFirestoreCollection));
  }
}
