import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CORE_ROUTES } from './core-routes';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth']);

const routes: Routes = [
  {
    path: CORE_ROUTES.AUTH.path,
    loadChildren: () => import('src/app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: CORE_ROUTES.ADMIN.path,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () => import('src/app/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: CORE_ROUTES.AUTH.path,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
