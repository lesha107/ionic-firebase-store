import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { AppToastrService } from 'src/app/core/services';
import { APP_TOASTR_MESSAGES } from 'src/app/core/services/app-toastr/app-toastr-messages';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly _appToastrService: AppToastrService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log('FUCK YOU BITCH', route.data.expectedRole);
    return this._authService.user$.pipe(
      tap((user) => console.log('role guard', user)),
      filter((user) => !!user),
      map((user) => user.roles.includes(route.data.expectedRole)),
      tap((role) => {
        if (!role) {
          this._router.navigateByUrl('auth');
          this._appToastrService.error(APP_TOASTR_MESSAGES.INVALID_ROLE, 'Auth');
        }
      })
    );
  }
}
