import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthComponent } from './component/auth.component';
import { AuthRoutingModule } from './routes';
import { AUTH_PAGES } from './pages';

export const AUTH_DECLARATIONS = [AuthComponent, ...AUTH_PAGES];
export const AUTH_IMPORTS = [SharedModule, AuthRoutingModule];

@NgModule({
  declarations: AUTH_DECLARATIONS,
  imports: AUTH_IMPORTS,
})
export class AuthModule {}
