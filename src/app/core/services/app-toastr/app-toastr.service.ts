import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AppToastrService {
  constructor(private readonly _toastrService: ToastrService) {}

  public error(message: string, title?: string): void {
    this._toastrService.error(message, title);
  }
}
