import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppToastrService } from 'src/app/core/services';
import { APP_TOASTR_MESSAGES } from 'src/app/core/services/app-toastr/app-toastr-messages';
import { AuthService } from '../services';
import { AUTH_ROUTES } from 'src/app/auth/routes/auth-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _appToastrService: AppToastrService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  canActivate(): boolean {
    const { user } = this._authService;

    if (!user) {
      this._router.navigateByUrl(AUTH_ROUTES.SIGN_IN.fullPath);
      this._appToastrService.error(APP_TOASTR_MESSAGES.INVALID_CREDENTIAL, 'Auth');
    }

    return !!user;
  }
}
