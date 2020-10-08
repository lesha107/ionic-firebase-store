import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { OrdersService } from '../../services';
import { DataItem } from '../../interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public readonly displayedColumns: string[];
  public readonly options: string[];
  public readonly pageSizeOptions: number[];

  public dataSource$: Observable<MatTableDataSource<DataItem>>;

  constructor(private readonly _ordersService: OrdersService, public dialog: MatDialog) {
    this.displayedColumns = ['order', 'price', 'status'];
    this.pageSizeOptions = [5, 10, 25];
  }

  ngAfterViewInit(): void {
    this.dataSource$ = this._ordersService.getUserOrders().pipe(
      map((data) => new MatTableDataSource(data)),
      tap((dataSource: any) => {
        dataSource.paginator = this.paginator;
        dataSource.sort = this.sort;
      })
    );
  }

  public async openDialog(): Promise<void> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {},
    });

    const result = await dialogRef.afterClosed().toPromise();

    if (result?.order) {
      await this._ordersService.createNewOrder(result);
    }
  }
}
