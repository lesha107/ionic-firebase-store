import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreComponent } from 'src/app/core/components/core.component';
import { CoreRoutingModule } from 'src/app/core/routes';
import { FORMLY_CONFIGS } from 'src/app/core/settings/configs';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FormlyIonicModule } from '@ngx-formly/ionic';

const CORE_DECLARATIONS = [CoreComponent];
const CORE_PROVIDERS = [StatusBar, SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }];
const CORE_IMPORTS = [
  BrowserModule,
  BrowserAnimationsModule,
  CoreRoutingModule,
  IonicModule.forRoot(),
  SharedModule,
  FormlyIonicModule,
  FormlyModule.forRoot(FORMLY_CONFIGS),
  ToastrModule.forRoot(),
  ReactiveFormsModule,
];

@NgModule({
  declarations: CORE_DECLARATIONS,
  imports: CORE_IMPORTS,
  providers: CORE_PROVIDERS,
})
export class CoreModule {}
