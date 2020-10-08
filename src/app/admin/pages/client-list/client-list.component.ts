import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataItem } from '../../interfaces';
import { OrdersService } from '../../services';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent {
  public readonly data$: Observable<DataItem[]>;

  constructor(private readonly _ordersService: OrdersService) {
    this.data$ = this._ordersService.getAllOrders();
  }
}
