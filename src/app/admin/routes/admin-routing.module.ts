import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../component/admin.component';
import { ADMIN_ROUTES } from './admin-routes';
import { UsersComponent } from '../pages';
import { ClientListComponent } from '../pages/client-list/client-list.component';
import { RoleGuard } from 'src/app/auth/guards';

const routes: Routes = [
  {
    path: ADMIN_ROUTES.CORE.path,
    component: AdminComponent,
    children: [
      {
        path: ADMIN_ROUTES.SALLER.path,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'saller',
        },
        component: ClientListComponent,
      },
      {
        path: ADMIN_ROUTES.CLIENT.path,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'client',
        },
        component: UsersComponent,
      },
      {
        path: ADMIN_ROUTES.CORE.path,
        redirectTo: ADMIN_ROUTES.CLIENT.path,
      },
    ],
  },
  {
    path: ADMIN_ROUTES.CORE.path,
    component: AdminComponent,
  },
  { path: '**', redirectTo: ADMIN_ROUTES.CORE.path },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
