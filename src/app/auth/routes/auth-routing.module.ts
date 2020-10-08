import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../component/auth.component';
import { AUTH_ROUTES } from './auth-routes';
import { SignInComponent, SignUpComponent } from '../pages';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: AUTH_ROUTES.SIGN_IN.path,
        component: SignInComponent
      },
      {
        path: AUTH_ROUTES.SIGN_UP.path,
        component: SignUpComponent
      },
      {
        path: '',
        redirectTo: AUTH_ROUTES.SIGN_IN.path
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
