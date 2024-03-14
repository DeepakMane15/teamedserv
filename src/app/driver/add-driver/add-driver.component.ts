import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.scss',
})
export class AddDriverComponent {
  public showSpinner: Boolean = false;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public timezones: any;
  public addressPredictions: any;
  public patientData!: any;

  patientForm = this.fb.group({
    id: 0,
    customer_id: 0,
    name: ['', Validators.required],
    address: ['', Validators.required],
    timeZone: ['', Validators.required],
    telephone: '',
    mobile: ['', Validators.required],
    cperson1: ['', Validators.required],
    cperson2: ['', Validators.required],
    cphone1: ['', Validators.required],
    cphone2: ['', Validators.required],
    specialNotes: '',
    internalNotes: '',
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService  ) {}

  ngOnInit(): void {
    this.getTimeZones();
    this.patientData = history.state.patientData;
    this.patientForm.patchValue({
      id: this.patientData.id,
      customer_id: this.patientData.customer_id,
      name: this.patientData.name,
      address: this.patientData.address,
      timeZone: this.patientData.time_zone,
      telephone: this.patientData.telephone,
      mobile: this.patientData.mobile,
      cperson1: this.patientData['contactPerson1_name'],
      cperson2: this.patientData['contactPerson2_name'],
      cphone1: this.patientData['contactPerson1_phone'],
      cphone2: this.patientData['contactPerson2_phone'],
      specialNotes: this.patientData['special_notes'],
      internalNotes: this.patientData['internal_notes'],
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const formModel: PatientModel = this.patientForm.value as PatientModel;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;
      this._apiService
        .post(
          this.patientData ? APIConstant.EDIT_DRIVER : APIConstant.ADD_DRIVER,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/patients']);
            } else {
              this.showSpinner = false;
              console.log(res.message);
            }
          },
          (error) => {
            this.showSpinner = false;
            console.error('Operation failed', error);
          }
        );
    }
    return;
  }

  handleMobileNumber(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    let enteredValue = inputElement.value;

    enteredValue = enteredValue.replace(/\D/g, ''); // Allow only numbers
    enteredValue = enteredValue.slice(0, 10); // Limit to 10 characters

    // Format the phone number as (XXX) XXX-XXXX
    if (enteredValue.length > 3) {
      enteredValue = `(${enteredValue.slice(0, 3)}) ${enteredValue.slice(3)}`;
    }
    if (enteredValue.length > 9) {
      enteredValue = `${enteredValue.slice(0, 9)}-${enteredValue.slice(9)}`;
    }

    // Update form control value and validate
    if (field === 'phone')
      this.patientForm.patchValue(
        { mobile: enteredValue },
        { emitEvent: false }
      );
    else if (field === 'telephone')
      this.patientForm.patchValue(
        { telephone: enteredValue },
        { emitEvent: false }
      );

    this.patientForm.get(field)?.markAsTouched(); // Mark phone as touched
  }

  public getTimeZones() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_TIMEZONE).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.timezones = res.data;
        } else {
          console.error('Timexone fetch failed');
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Timexone fetch failed', error);
      }
    );
  }
  public handleCancel() {
    this.router.navigate(['patients'], {
      state: { patientData: this.patientData },
    });
  }
  public navigateBack() {
    this.router.navigate(['/patients']);
  }
}
