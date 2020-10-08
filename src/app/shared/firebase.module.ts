import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserTrackingService } from '@angular/fire/analytics';

import { environment } from 'src/environments/environment';

export const firebaseConfig = environment.firebaseConfig;

const FIREBASE_IMPORTS = [
  CommonModule,
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFirestoreModule.enablePersistence(),
  AngularFireAuthModule,
];

const FIREBASE_PROVIDERS = [UserTrackingService];

@NgModule({
  imports: FIREBASE_IMPORTS,
  providers: FIREBASE_PROVIDERS,
})
export class FirebaseModule {}
