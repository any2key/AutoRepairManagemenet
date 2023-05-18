import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIResponse, DataResponse, Document, Order } from '../../model';
import { ApiService } from '../../services/api.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

  header = '';

  orders: Order[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddDocumentComponent>, private ui: UiService, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Document) {

    this.api.getData<DataResponse<Order[]>>('Orders/fetch').subscribe(res => {
      this.orders = res.data;
      if (data != null)
        this.form.get('order').patchValue(this.orders.find(x => x.id == data.order.id));
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
      order: new FormControl(null, [Validators.required]),
      orderStatus: new FormControl(1, [Validators.required]),
      jobQuality: new FormControl(1, [Validators.required]),
      clientReview: new FormControl(3, [Validators.required]),
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
    this.api.postData<APIResponse, Order>('Documents/addOrUpdate', req).subscribe(res => {
      if (!res.isOk)
        this.ui.show(res.message);
      else this.ui.show('Успешно');

      this.dialogRef.close();
    });

  }

}
