import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrl: './add-event-dialog.component.scss',
})
export class AddEventDialogComponent implements OnInit {
  eventForm: FormGroup;
  selectedTimes = {
    E: new Date(),
  };
  public showSpinner: boolean = false;
  public isAvailableType: boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _apiService: ApiService
  ) {
    this.eventForm = this.fb.group({
      start: [data.date, Validators.required],
      startTime: ['', Validators.required],
      end: [data.date, Validators.required],
      endTime: ['', Validators.required],
      notes: '',
    });
  }
  ngOnInit() {
    this.isAvailableType = true;
    if (this.data) {
      this.eventForm.patchValue({
        start: this.data.start,
        startTime: this.data.startTime,
        end: this.data.end,
        endTime: this.data.endTime,
        notes: this.data.notes || "",
      });
      this.isAvailableType = this.data.title === 'Available';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public handleTypeChange(event: MatRadioChange) {
    this.isAvailableType = event.value === '1';
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;

      const startDateTime = new Date(formValue.start);
      const [startHours, startMinutes] = formValue.startTime
        .split(':')
        .map(Number);
      startDateTime.setHours(startHours, startMinutes);

      // Create the end date and time
      const endDateTime = new Date(formValue.end);
      const [endHours, endMinutes] = formValue.endTime.split(':').map(Number);
      endDateTime.setHours(endHours, endMinutes);

      const formattedStartDateTime = this.formatDateTime(startDateTime);
      const formattedEndDateTime = this.formatDateTime(endDateTime);

      console.log(this.isAvailableType);
      let eventData = {
        id: this.data?.extendedProps?.id,
        title: this.isAvailableType ? 'Available' : 'Occupied',
        type: this.isAvailableType ? 'Available' : 'Occupied',
        start: formattedStartDateTime,
        end: formattedEndDateTime,
        notes: formValue.notes || "",
      };

      let call = await this.addJobPost(eventData);
      // Combine end date and time
      if (call) this.dialogRef.close(eventData);
      else this.dialogRef.close(false);
    }
  }

  public addJobPost(formValue: any): Promise<boolean> {
    console.log(formValue);
    this.showSpinner = true;
    let formData = new FormData();
    for (let key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return new Promise((resolve, reject) => {
      this._apiService
        .post(APIConstant.ADD_OR_EDIT_JOB_POST, formData)
        .subscribe(
          (res: any) => {
            this.showSpinner = false;
            resolve(true);
          },
          (error) => {
            this.showSpinner = false;
            console.error('Operation failed', error);
            resolve(false); // or reject(error) if you want to propagate the error
          }
        );
    });
  }
  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
