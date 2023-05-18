import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { APIResponse, AutoPart, DataResponse } from '../model';
import { ApiService } from '../services/api.service';
import { UiService } from '../services/ui.service';
import { AddPartComponent } from './add-part/add-part.component';
const floatNumericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

@Component({
  selector: 'app-AutoParts',
  templateUrl: './AutoParts.component.html',
  styleUrls: ['./AutoParts.component.css']
})
export class AutoPartsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'action'];

  dataSource = new MatTableDataSource<AutoPart>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;
  @ViewChild(MatSort)
  sort!: MatSort | null;
  constructor(private api: ApiService, private ui: UiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.api.getData<DataResponse<AutoPart[]>>('AutoParts/fetch').subscribe(res => {
      if (!res.isOk)
        this.ui.show(res.message);
      else {
        this.dataSource = new MatTableDataSource<AutoPart>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openDialog(AutoPart: AutoPart, type: number) {
    const data: AutoPart = AutoPart;
    if (type == 0) {
      data == null;
    }
    const dialogRef = this.dialog.open(AddPartComponent, {
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
        this.api.getData<APIResponse>(`AutoParts/remove?id=${id}`).subscribe(r => {
          if (!r.isOk)
            this.ui.show(r.message);
          else this.ui.show('Успешно');

          this.refreshTable();
        });
      }
    });
  }

}
