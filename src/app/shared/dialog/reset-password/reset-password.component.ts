import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api/api.service';
import { APIConstant } from 'src/app/common/constants/APIConstant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    public dialogRef: MatDialogRef<ResetPasswordComponent>
  ) {}

  resetForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  public onSubmit() {
    if (this.resetForm.valid && this.resetForm.get('password')?.value === this.resetForm.get('confirmPassword')?.value) {
      const fd = new FormData();
      fd.append('new_password', this.resetForm.get('password')?.value || '');
      this._apiService.post(APIConstant.RESET_PASSWORD, fd).subscribe(
        (res: any) => {
          alert("Password updated successfully");
          this.dialogRef.close();
        },
        (error) => {
          this.dialogRef.close();
          console.error('Operation failed', error);
        }
      );
    }
  }
}
