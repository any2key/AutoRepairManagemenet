import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { APIResponse, DataResponse, Job } from '../model';
import { ApiService } from '../services/api.service';
import { UiService } from '../services/ui.service';
import { AddJobComponent } from './add-job/add-job.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'action'];

  dataSource = new MatTableDataSource<Job>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;
  @ViewChild(MatSort)
  sort!: MatSort | null;
  constructor(private api: ApiService, private ui: UiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.api.getData<DataResponse<Job[]>>('Jobs/fetch').subscribe(res => {
      if (!res.isOk)
        this.ui.show(res.message);
      else {
        this.dataSource = new MatTableDataSource<Job>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openDialog(Job: Job, type: number) {
    const data: Job = Job;
    if (type == 0) {
      data == null;
    }
    const dialogRef = this.dialog.open(AddJobComponent, {
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
        this.api.getData<APIResponse>(`Jobs/remove?id=${id}`).subscribe(r => {
          if (!r.isOk)
            this.ui.show(r.message);
          else this.ui.show('Успешно');

          this.refreshTable();
        });
      }
    });
  }

}
