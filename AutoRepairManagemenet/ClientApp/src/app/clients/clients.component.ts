import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { APIResponse, Client, DataResponse } from '../model';
import { ApiService } from '../services/api.service';
import { UiService } from '../services/ui.service';
import { AddClientComponent } from './add-client/add-client.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phone', 'carBrand', 'carNumber', 'carVin', 'action'];

  dataSource = new MatTableDataSource<Client>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;
  @ViewChild(MatSort)
  sort!: MatSort | null;
  constructor(private api: ApiService, private ui: UiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.api.getData<DataResponse<Client[]>>('clients/fetch').subscribe(res => {
      if (!res.isOk)
        this.ui.show(res.message);
      else {
        this.dataSource = new MatTableDataSource<Client>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openDialog(client: Client, type: number) {
    const data: Client = client;
    if (type == 0) {
      data == null;
    }
    const dialogRef = this.dialog.open(AddClientComponent, {
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
        this.api.getData<APIResponse>(`clients/remove?id=${id}`).subscribe(r => {
          if (!r.isOk)
            this.ui.show(r.message);
          else this.ui.show('Успешно');

          this.refreshTable();
        });
      }
    });
  }
}
