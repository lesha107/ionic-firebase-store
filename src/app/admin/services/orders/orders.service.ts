import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { initFirestoreData } from 'src/app/utils/firebase/firestore';
import { AuthService } from 'src/app/auth/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DataSource } from '../../interfaces';
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  public ordersCollection$: Observable<AngularFirestoreCollection>;
  public ordersCollectionBehaviourSubject: BehaviorSubject<AngularFirestoreCollection>;
  constructor(private readonly _afs: AngularFirestore, private readonly _authService: AuthService) {
    this.ordersCollectionBehaviourSubject = new BehaviorSubject(null);
    this.ordersCollection$ = this.ordersCollectionBehaviourSubject.asObservable();
    this._authService.currentUser$
      .pipe(
        untilDestroyed(this),
        filter((user) => !!user?.uid)
      )
      .subscribe(({ uid }) => {
        const orders = this._afs.collection('users').doc(uid).collection('orders');
        this.ordersCollectionBehaviourSubject.next(orders);
      });
  }

  public get ordersCollection(): AngularFirestoreCollection<firebase.firestore.DocumentData> {
    return this.ordersCollectionBehaviourSubject.getValue();
  }
  public createNewOrder(data): void {
    this.ordersCollection.doc(data.id.toString()).set({ order: data.order, price: data.price, status: data.status });
  }

  public getUserOrders(): Observable<DataSource[]> {
    return this._authService.currentUser$.pipe(
      filter((user) => !!user?.uid),
      switchMap((user) =>
        this._afs.collection('users').doc(user.uid).collection('orders').snapshotChanges().pipe(map(initFirestoreData))
      )
    );
  }

  public getAllOrders(): Observable<DataSource[]> {
    return this._authService.currentUser$.pipe(
      filter((user) => !!user?.uid),
      switchMap(() => this._afs.collectionGroup('orders').snapshotChanges().pipe(map(initFirestoreData)))
    );
  }
}
