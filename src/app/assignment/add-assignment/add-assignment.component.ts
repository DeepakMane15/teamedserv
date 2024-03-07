import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
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
    // companyUser: ['', Validators.required],
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
    this.router.navigate(['/medical-team']);
  }

  public onSubmit() {}

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }
}