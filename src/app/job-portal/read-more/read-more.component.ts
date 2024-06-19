import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrl: './read-more.component.scss'
})
export class ReadMoreComponent {

  constructor(
    public dialogRef: MatDialogRef<ReadMoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
