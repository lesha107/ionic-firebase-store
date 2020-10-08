import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { OrderOptions } from '../../../auth/interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  public readonly form: FormGroup;
  public readonly model: any;
  public readonly options: FormlyFormOptions;
  public readonly fields: FormlyFieldConfig[];

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: OrderOptions) {
    this.form = this.getForm();
    this.options = this.getOptions();
    this.model = this.getModel();
    this.fields = this.getFields();
  }

  private getForm(): FormGroup {
    return new FormGroup({});
  }

  private getOptions(): FormlyFormOptions {
    return {
      formState: {
        awesomeIsForced: false,
      },
    };
  }

  private getModel(): any {
    return {};
  }

  private getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'order',
        type: 'input',
        templateOptions: {
          label: 'Your order',
          placeholder: 'Enter your order',
          required: true,
        },
      },
      {
        key: 'price',
        type: 'input',
        templateOptions: {
          label: 'Order price',
          placeholder: 'Enter your price',
          required: true,
        },
      },
    ];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.dialogRef.close({ ...this.form.value, status: 'in progress', id: new Date().getTime() });
    }
  }
}
