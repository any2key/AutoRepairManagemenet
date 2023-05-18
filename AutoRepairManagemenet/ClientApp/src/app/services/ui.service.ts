import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) { }

  show(message: string) {
    this.snackBar.open(message, "OK", { duration: 2000 });
  }

  showShort(message: string) {
    this.snackBar.open(message, "OK", { duration: 800 });
  }


  confirmation() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
    });
    return dialogRef.afterClosed();
  }




  blobDownloader(res: Blob) {
    var file = new Blob([res], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);

  }
}
