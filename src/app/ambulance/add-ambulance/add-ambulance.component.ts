import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AmbulanceModel } from 'src/app/common/models/AmbulanceModel';
import { AssignmentModel } from 'src/app/common/models/AssignmentModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-ambulance',
  templateUrl: './add-ambulance.component.html',
  styleUrl: './add-ambulance.component.scss',
})
export class AddAmbulanceComponent implements OnInit {
  public showSpinner: Boolean = false;
  public assignmentData: any;
  public isUnameAvailable: Boolean = true;
  public panelOpenState = false;
  public patientsMaster: any = [];
  public medicalMaster: any = [];
  public customerMaster: any = [];
  public transportationMethod: any = [];
  public awardMethod: any = [];
  public ambulanceData: boolean = false;
  public assignmentsMaster: any = [];

  ambulanceForm = this.fb.group({
    customer_id: 0,
    assignment: ['', Validators.required],
    date: ['', Validators.required],
    transaction: ['', Validators.required],
    patient: ['', Validators.required],
    patientAddress: ['', Validators.required],
    cPerson1Name: ['', Validators.required],
    cPerson2Name: ['', Validators.required],
    cPerson1Phone: ['', Validators.required],
    cPerson2Phone: ['', Validators.required],
    amount: ['', Validators.required],
    paymentDate: ['', Validators.required],
    driver: ['0', Validators.required],
    vehicleModel: ['', Validators.required],
    registrationNo: ['', Validators.required],
    pickupAddress: ['', Validators.required],
    pickupDate: ['', Validators.required],
    pickupTime: ['', Validators.required],
    pickupPO: [''],
    pickupPU: [''],
    destAddress: ['', Validators.required],
    destDate: ['', Validators.required],
    destTime: ['', Validators.required],
    destPO: [''],
    destPU: [''],
    specialNotes: [''],
    driverNotes: [''],
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.assignmentData = history.state.assignmentData;
    console.log(this.assignmentData);
    if (this.assignmentData) {
      console.log(this.assignmentData);
      // this.ambulanceForm.patchValue({
      // customer_id: this.assignmentData.company_id,
      // medicalId: this.assignmentData.medical_team,
      // medicalProfession: this.assignmentData.profession,
      // assignment: this.assignmentData.assignment,
      // transaction: this.assignmentData.transaction,
      // date: this.assignmentData.date,
      // amount: this.assignmentData.amount,
      // paymentDate: this.assignmentData.paymentdate,
      // patientId: this.assignmentData.patient,
      // patientAddress: this.assignmentData.name,
      // cPerson1Name: this.assignmentData.cperson1,
      // cPerson1Phone: this.assignmentData.cphone1,
      // cPerson2Name: this.assignmentData.cperson2,
      // cPerson2Phone: this.assignmentData.cphone2,
      // visitDate: this.assignmentData.fromdate,
      // visitTime: this.assignmentData.time,
      // prNotes: this.assignmentData.ptnotes,
      // pNotes: this.assignmentData.pnotes,
      // iNotes: this.assignmentData.inotes,
      // });
    }
    this.fetchMedicalTeams();
    this.fetchInitialData();
  }

  public fetchInitialData() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_ASSIGNMENT_INITIAL_DATA).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.assignmentsMaster = res.data.assignment;
          this.patientsMaster = res.data.patients;

          if (this.patientsMaster && this.assignmentData) {
            let patientSelected = this.patientsMaster.find(
              (p: any) => p.id === this.assignmentData.patient
            );

            if (patientSelected) {
              this.ambulanceForm.patchValue({
                patientAddress: patientSelected.address,
              });
            }
          }
        } else {
          console.error('Initial Data fetch failed');
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Initial Data fetch failed', error);
      }
    );
  }
  public fetchMedicalTeams() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_MEDICALTEAMS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          // this.medicalTeams = res.data;
        } else {
          console.error('Medical teams fetch failed');
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Medical teams fetch failed', error);
      }
    );
  }

  public navigateBack() {
    this.router.navigate(['/ambulance']);
  }

  onSubmit(): void {
    console.log(this.ambulanceForm.value);
    if (this.ambulanceForm.valid) {
      const formModel: any = this.ambulanceForm.value;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;
      this._apiService
        .post(
          this.ambulanceData
            ? APIConstant.EDIT_ASSIGNMENT
            : APIConstant.ADD_MEDTRANS,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              // this.router.navigate(['/ambulance']);
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

  public handlePatientSelect(event: MatSelectChange) {
    let patient = this.patientsMaster.find(
      (pat: any) => pat.id === event.value
    );

    if (patient) {
      this.ambulanceForm.patchValue({
        patientAddress: patient.address,
        cPerson1Name: patient.contactPerson1_name,
        cPerson1Phone: patient.contactPerson1_phone,
        cPerson2Name: patient.contactPerson2_name,
        cPerson2Phone: patient.contactPerson2_phone,
      });
    }
  }
}
