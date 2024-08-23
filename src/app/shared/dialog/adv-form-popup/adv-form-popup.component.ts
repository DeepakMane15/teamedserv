import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adv-form-popup',
  templateUrl: './adv-form-popup.component.html',
  styleUrl: './adv-form-popup.component.scss'
})
export class AdvFormPopupComponent {

  public serv: string= "";
  public wordCount:number = 0;
  constructor(
    public dialogRef: MatDialogRef<AdvFormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  add() {
    this.data.model.push(this.serv);
    this.serv = "";
  }
  delete(index: number) {
    this.data.model.splice(index,1);
  }
  submit() {
    this.dialogRef.close(this.data);
  }
  onModelChange(value: string) {
    if (value.length > 50) {
      this.data.model = value.slice(0, 50);
    }
  }
}
