import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-form-popup',
  templateUrl: './add-form-popup.component.html',
  styleUrl: './add-form-popup.component.scss'
})
export class AddFormPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<AddFormPopupComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
