import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { ApiService } from '../../services/api/api.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-category-rename',
  templateUrl: './category-rename.component.html',
  styleUrl: './category-rename.component.scss'
})
export class CategoryRenameComponent {
  public showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  resetForm = this.fb.group({
    name: ['', Validators.required]
  });


  closeDialog() {
    this.dialogRef.close();
  }

  public onSubmit() {
    if (
      this.resetForm.valid
    ) {
      this.showSpinner = true;
      const fd = new FormData();
      fd.append('name', this.resetForm.get('name')?.value || '');
      fd.append('id', this.data.category.category_id);
      this._apiService.post(APIConstant.EDIT_CATEGORY_NAME, fd).subscribe(
        (res: any) => {
          this.showSpinner = false;
          this.dialogRef.close(true);
        },
        (error: any) => {
          this.showSpinner = false;
          this.dialogRef.close();
          console.error('Operation failed', error);
        }
      );
    }
  }
}

