import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ADMIN_ROUTES } from 'src/app/admin/routes/admin-routes';
import { UserService } from 'src/app/admin/services';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { SignInWithPasswordArgsType, SignInWithPasswordResponseType } from '../../interfaces';
@UntilDestroy()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public readonly fields: FormlyFieldConfig[];
  public readonly form: FormGroup;
  public readonly model: unknown;
  public readonly options: FormlyFormOptions;

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _userService: UserService
  ) {
    this.fields = this.getFormlyFields();
    this.form = this.getForm();
    this.options = this.getOptions();
    this.model = {};
  }

  private getFormlyFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          placeholder: 'Enter your email...',
          required: true,
        },
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          label: 'Password',
          placeholder: 'Enter your password...',
          type: 'password',
          required: true,
        },
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'saller',
            type: 'checkbox',
            templateOptions: {
              label: 'Продавец',
              required: true,
            },
            expressionProperties: {
              'templateOptions.disabled': 'model.client',
            },
          },
          {
            key: 'client',
            type: 'checkbox',
            templateOptions: {
              label: 'Клиент',
              required: true,
            },
            expressionProperties: {
              'templateOptions.disabled': 'model.saller',
            },
          },
        ],
      },
    ];
  }

  private getForm(): FormGroup {
    return new FormGroup({});
  }

  private getOptions(): FormlyFormOptions {
    return {};
  }

  async signUp(): Promise<void> {
    try {
      if (!this.form.valid) {
        return;
      }
      const data = await this._authService.createUser(this.form.value);
      await this._authService.updateUsersData({ data, options: this.form.value });
      this._userService
        .getUsers()
        .pipe(untilDestroyed(this))
        .subscribe(async (users) => {
          const currentUser: any = users.find((x) => x.id === data.user.uid);
          const route = currentUser.saller ? ADMIN_ROUTES.SALLERS.fullPath : ADMIN_ROUTES.CLIENTS.fullPath;
          await this._router.navigateByUrl(route);
        });
    } catch (er) {}
  }

  signInWithPassword(args: SignInWithPasswordArgsType): SignInWithPasswordResponseType {
    return this._authService.signIn(args);
  }
}
