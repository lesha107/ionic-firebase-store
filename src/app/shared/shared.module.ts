import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { RouterModule } from '@angular/router';
import { SHARED_COMPONENTS } from 'src/app/shared/components';
import { FirebaseModule } from 'src/app/shared/firebase.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { IonicModule } from '@ionic/angular';

const SHARED_DECLARATIONS = [...SHARED_COMPONENTS];
const SHARED_IMPORTS = [
  IonicModule,
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  FormlyMaterialModule,
  FirebaseModule,
  MaterialModule,
  FormlyModule,
];
const SHARED_EXPORTS = [...SHARED_IMPORTS, ...SHARED_DECLARATIONS];
const SHARED_PROVIDERS = [];

@NgModule({
  declarations: SHARED_DECLARATIONS,
  imports: SHARED_IMPORTS,
  exports: SHARED_EXPORTS,
  providers: SHARED_PROVIDERS,
})
export class SharedModule {}
