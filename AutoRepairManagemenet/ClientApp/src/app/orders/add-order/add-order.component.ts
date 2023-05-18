import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIResponse, AutoPart, Client, DataResponse, Employee, Job, Order } from '../../model';
import { ApiService } from '../../services/api.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  header = '';

  clients: Client[] = [];
  employers: Employee[] = [];
  jobs: Job[] = [];
  autoParts: AutoPart[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddOrderComponent>, private ui: UiService, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Order)
  {

    this.api.getData<DataResponse<Client[]>>('clients/fetch').subscribe(res =>
    {
      this.clients = res.data;
      if (data != null)
        this.form.get('client').patchValue(this.clients.find(x => x.id == data.client.id));
      
    });
    this.api.getData<DataResponse<Employee[]>>('employers/fetch').subscribe(res => {
      this.employers = res.data;
      if (data != null)
        this.form.get('employee').patchValue(this.employers.find(x => x.id == data.employee.id));
    });
    this.api.getData<DataResponse<Job[]>>('jobs/fetch').subscribe(res => {
      this.jobs = res.data;
      if (data != null)
        this.form.get('job').patchValue(this.jobs.find(x => x.id == data.job.id));
    });

    this.api.getData<DataResponse<AutoPart[]>>('autoparts/fetch').subscribe(res => {
      this.autoParts = res.data;
      if (data != null)
        this.form.get('autoPart').patchValue(this.autoParts.find(x => x.id == data.autoPart.id));
    });

  }

  ngOnInit(): void {
    if (this.data == null) {
      this.header = 'Добавление';
    } else {
      this.header = 'Редактирование';
      this.form.patchValue(this.data);
    }
  }



  form = new FormGroup(
    {
      client: new FormControl(null, [Validators.required]),
      employee: new FormControl(null, [Validators.required]),
      job: new FormControl(null, [Validators.required]),
      autoPart: new FormControl(null, [Validators.required]),
    });


  onNoClick(): void {
    this.dialogRef.close();
  }

  apply() {
    if (!this.form.valid) {
      this.ui.show('Форма заполнена некорректно');
      return;
    }
    let req = new Order();
    req = this.form.value as Order;
    req.id = this.data == null ? -1 : this.data.id;
    this.api.postData<APIResponse, Order>('Orders/addOrUpdate', req).subscribe(res => {
      if (!res.isOk)
        this.ui.show(res.message);
      else this.ui.show('Успешно');

      this.dialogRef.close();
    });

  }
}
