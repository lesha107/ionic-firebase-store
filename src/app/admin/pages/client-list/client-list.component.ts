import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersService } from '../../services';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {
  public readonly OrdersList$: Observable<any>;
  constructor(private readonly _ordersService: OrdersService) {
    this.OrdersList$ = this._ordersService.getAllOrders();
  }
}
