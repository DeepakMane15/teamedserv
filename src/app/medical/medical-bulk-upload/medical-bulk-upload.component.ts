import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-medical-bulk-upload',
  templateUrl: './medical-bulk-upload.component.html',
  styleUrl: './medical-bulk-upload.component.scss'
})
export class MedicalBulkUploadComponent {
  @ViewChild('bulkUploadInput') bulkUploadInput!: ElementRef;

  fileName: string = '';
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<MedicalBulkUploadComponent>,
    private _apiService: ApiService
  )
  {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
    }
  }

  public handleBulkUpload(event: Event) {
     if (this.selectedFile) {
      const formData = new FormData();
      formData.append('csv_file', this.selectedFile);

      this._apiService
        .post(APIConstant.BULK_UPLOAD_MEDICALTEAMS, formData)
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.dialogRef.close(1);
            }
          },
          (error) => {
            this.dialogRef.close(0);
          }
        );
    }
  }

  downloadTemplate() {
    const link = document.createElement('a');
    link.href = '/assets/template/professional-data.csv'; // Adjust the path to the template file
    link.download = 'professional-data.csv';
    link.click();
  }
}
