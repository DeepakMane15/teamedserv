import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-prfile-preview-popup',
  templateUrl: './prfile-preview-popup.component.html',
  styleUrl: './prfile-preview-popup.component.scss'
})
export class PrfilePreviewPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<PrfilePreviewPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {}

  closeDialog() {
    this.dialogRef.close();
  }
}
