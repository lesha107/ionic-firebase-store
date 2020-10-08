import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// import { FirebaseUserOptions } from 'src/app/auth/interfaces';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { UserService } from 'src/app/admin/services/user/user.service';
import { OrdersService } from '../../services';
import { DataSource } from '../../interfaces';

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

  public readonly dateControl: FormControl;
  public readonly roleControl: FormControl;

  public dataSource$: Observable<MatTableDataSource<DataSource>>;

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
      await this.createOrder(result);
    }
  }

  public async createOrder(data): Promise<void> {
    try {
      await this._ordersService.createNewOrder(data);
    } catch (er) {
      throwError(er);
    }
  }
}
