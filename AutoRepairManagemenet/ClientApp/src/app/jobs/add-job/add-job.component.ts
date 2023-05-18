import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIResponse, Job } from '../../model';
import { ApiService } from '../../services/api.service';
import { UiService } from '../../services/ui.service';
const floatNumericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  header = '';

  constructor(
    public dialogRef: MatDialogRef<AddJobComponent>, private ui: UiService, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Job) { }

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
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.pattern(floatNumericNumberReg)]),
    });


  onNoClick(): void {
    this.dialogRef.close();
  }

  apply() {
    if (!this.form.valid) {
      this.ui.show('Форма заполнена некорректно');
      return;
    }
    let req = new Job();
    req = this.form.value as Job;
    req.id = this.data == null ? -1 : this.data.id;
    this.api.postData<APIResponse, Job>('Jobs/addOrUpdate', req).subscribe(res => {
      if (!res.isOk)
        this.ui.show(res.message);
      else this.ui.show('Успешно');

      this.dialogRef.close();
    });

  }

}
