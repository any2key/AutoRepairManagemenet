import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { APIResponse, DataResponse, Employee } from '../model';
import { ApiService } from '../services/api.service';
import { UiService } from '../services/ui.service';
import { AddEmployerComponent } from './add-employer/add-employer.component';
const floatNumericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css']
})
export class EmployersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phone', 'position',  'action'];

  dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;
  @ViewChild(MatSort)
  sort!: MatSort | null;
  constructor(private api: ApiService, private ui: UiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.api.getData<DataResponse<Employee[]>>('Employers/fetch').subscribe(res => {
      if (!res.isOk)
        this.ui.show(res.message);
      else {
        this.dataSource = new MatTableDataSource<Employee>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openDialog(Employee: Employee, type: number) {
    const data: Employee = Employee;
    if (type == 0) {
      data == null;
    }
    const dialogRef = this.dialog.open(AddEmployerComponent, {
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
        this.api.getData<APIResponse>(`Employers/remove?id=${id}`).subscribe(r => {
          if (!r.isOk)
            this.ui.show(r.message);
          else this.ui.show('Успешно');

          this.refreshTable();
        });
      }
    });
  }

}
