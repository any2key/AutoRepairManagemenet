import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIResponse, Client } from '../../model';
import { ApiService } from '../../services/api.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  header = '';

  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>, private ui: UiService, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Client) { }

  ngOnInit(): void {
    if (this.data == null)
    {
      this.header = 'Добавление';
    } else
    {
      this.header = 'Редактирование';
      this.form.patchValue(this.data);
    }
  }



  form = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      carBrand: new FormControl('', [Validators.required]),
      carNumber: new FormControl('', [Validators.required]),
      carVin: new FormControl('', [Validators.required]),
    });


  onNoClick(): void {
    this.dialogRef.close();
  }

  apply() {
    if (!this.form.valid) {
      this.ui.show('Форма заполнена некорректно');
      return;
    }
    let req = new Client();
    req = this.form.value as Client;
    req.id = this.data == null ? -1 : this.data.id;
    this.api.postData<APIResponse, Client>('clients/addOrUpdate', req).subscribe(res =>
    {
      if (!res.isOk)
        this.ui.show(res.message);
      else this.ui.show('Успешно');

      this.dialogRef.close();
    });

  }


}
