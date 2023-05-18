import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { APIResponse, DataResponse, Order } from '../model';
import { ApiService } from '../services/api.service';
import { UiService } from '../services/ui.service';
import { AddOrderComponent } from './add-order/add-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'client', 'employee', 'job', 'autoPart','dateTime','action'];

  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;
  @ViewChild(MatSort)
  sort!: MatSort | null;
  constructor(private api: ApiService, private ui: UiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.api.getData<DataResponse<Order[]>>('Orders/fetch').subscribe(res => {
      if (!res.isOk)
        this.ui.show(res.message);
      else {
        this.dataSource = new MatTableDataSource<Order>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openDialog(Order: Order, type: number) {
    const data: Order = Order;
    if (type == 0) {
      data == null;
    }
    const dialogRef = this.dialog.open(AddOrderComponent, {
      width: '400px',
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
    });
  }
  remove(id: number) {
    this.ui.confirmation().subscribe(res => {
      if (res) {
        this.api.getData<APIResponse>(`Orders/remove?id=${id}`).subscribe(r => {
          if (!r.isOk)
            this.ui.show(r.message);
          else this.ui.show('Успешно');

          this.refreshTable();
        });
      }
    });
  }

}
