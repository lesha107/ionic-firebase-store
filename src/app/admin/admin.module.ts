import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './routes/admin-routing.module';
import { AdminComponent } from './component/admin.component';
import { ADMIN_PAGES } from './pages';
import { AuthModule } from '../auth/auth.module';

export const ADMIN_DECLARATIONS = [AdminComponent, ...ADMIN_PAGES];
export const ADMIN_IMPORTS = [SharedModule, AuthModule, AdminRoutingModule];

@NgModule({
  declarations: ADMIN_DECLARATIONS,
  imports: ADMIN_IMPORTS,
})
export class AdminModule {}
