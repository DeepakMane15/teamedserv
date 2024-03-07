import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AssignmentModel } from 'src/app/common/models/AssignmentModel';
import { AssignmentTypeModel } from 'src/app/common/models/AssignmentTypeModel';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.scss',
})
export class AddAssignmentComponent implements OnInit {
  public showSpinner: Boolean = false;
  public assignmentData: any;
  public isUnameAvailable: Boolean = true;
  public panelOpenState = false;
  public medicalTeams: MedicalTeamModel[] = [];
  public patientsMaster: PatientModel[] = [];
  public assignmentsMaster: AssignmentTypeModel[] = [];

  assignmentForm = this.fb.group({
    customer_id: 0,
    assignment_id: 0,
    medicalId: ['', Validators.required],
    medicalProfession: [''],
    assignment: ['', Validators.required],
    transaction: [''],
    date: ['', Validators.required],
    amount: ['', Validators.required],
    paymentDate: [''],
    patientId: ['', Validators.required],
    patientAddress: [''],
    cPerson1Name: [''],
    cPerson1Phone: [''],
    cPerson2Name: [''],
    cPerson2Phone: [''],
    visitDate: ['', Validators.required],
    visitTime: ['', Validators.required],
    prNotes: [''],
    pNotes: [''],
    iNotes: [''],
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.assignmentData = history.state.assignmentData;
    if (this.assignmentData) {
      console.log(this.assignmentData);
      this.assignmentForm.patchValue({
        customer_id: 0,
        assignment_id: 0,
        medicalId: this.assignmentData.medical_team,
        medicalProfession: this.assignmentData.medical_profession,
        assignment: this.assignmentData.assignment,
        transaction: this.assignmentData.transaction,
        date: this.assignmentData.date,
        amount: this.assignmentData.amount,
        paymentDate: this.assignmentData.paymentdate,
        patientId: this.assignmentData.patient,
        patientAddress: this.assignmentData.name,
        cPerson1Name: this.assignmentData.cperson1,
        cPerson1Phone: this.assignmentData.cphone1,
        cPerson2Name: this.assignmentData.cperson2,
        cPerson2Phone: this.assignmentData.cphone2,
        visitDate: this.assignmentData.fromdate,
        visitTime: this.assignmentData.time,
        prNotes: this.assignmentData.ptnotes,
        pNotes: this.assignmentData.pnotes,
        iNotes: this.assignmentData.inotes,
      });
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
          this.medicalTeams = res.data;
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

  public handleMedicalSelect(event: MatSelectChange) {
    let medical = this.medicalTeams.find(
      (medical) => medical.pid === event.value
    );

    if (medical) {
      this.assignmentForm.patchValue({
        medicalProfession: medical.profession_name,
      });
    }
  }
  public navigateBack() {
    this.router.navigate(['/assignments']);
  }

  onSubmit(): void {
    if (this.assignmentForm.valid) {
      const formModel: AssignmentModel = this.assignmentForm
        .value as AssignmentModel;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;
      this._apiService
        .post(
          this.assignmentData
            ? APIConstant.EDIT_ASSIGNMENT
            : APIConstant.ADD_ASSIGNMENT,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/assignments']);
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
    let patient = this.patientsMaster.find((pat) => pat.id === event.value);

    if (patient) {
      this.assignmentForm.patchValue({
        patientAddress: patient.address,
        cPerson1Name: patient.contactPerson1_name,
        cPerson1Phone: patient.contactPerson1_phone,
        cPerson2Name: patient.contactPerson2_name,
        cPerson2Phone: patient.contactPerson2_phone,
      });
    }
  }

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }
}
