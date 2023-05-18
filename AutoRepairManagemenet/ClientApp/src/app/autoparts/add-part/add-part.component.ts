import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIResponse, AutoPart } from '../../model';
import { ApiService } from '../../services/api.service';
import { UiService } from '../../services/ui.service';
const floatNumericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {

  header = '';

  constructor(
    public dialogRef: MatDialogRef<AddPartComponent>, private ui: UiService, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: AutoPart) { }

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
    let req = new AutoPart();
    req = this.form.value as AutoPart;
    req.id = this.data == null ? -1 : this.data.id;
    this.api.postData<APIResponse, AutoPart>('AutoParts/addOrUpdate', req).subscribe(res => {
      if (!res.isOk)
        this.ui.show(res.message);
      else this.ui.show('Успешно');

      this.dialogRef.close();
    });

  }

}
