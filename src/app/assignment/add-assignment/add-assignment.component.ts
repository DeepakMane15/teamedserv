import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import {
  ADD_POPUP_COMPONENT,
  FileType,
} from 'src/app/common/constants/AppEnum';
import { AssignmentModel } from 'src/app/common/models/AssignmentModel';
import { AssignmentTypeModel } from 'src/app/common/models/AssignmentTypeModel';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { AddFormPopupComponent } from 'src/app/shared/dialog/add-form-popup/add-form-popup.component';
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
  public photoError!: string;
  public fileType = FileType;

  assignmentForm = this.fb.group({
    customer_id: 0,
    assignment_id: 0,
    medicalId: [[], Validators.required],
    medicalProfession: [''],
    assignment: [[], Validators.required],
    transaction: [''],
    date: ['', Validators.required],
    amount: ['', Validators.required],
    paymentDate: [''],
    patientId: [[], Validators.required],
    patientAddress: [''],
    cPerson1Name: [''],
    cPerson1Phone: [''],
    cPerson2Name: [''],
    cPerson2Phone: [''],
    visitDate: ['', Validators.required],
    visitTime: ['', Validators.required],
    visitTimeOut: ['', Validators.required],
    prNotes: [''],
    pNotes: [''],
    iNotes: [''],
    image: null as File | null,
    typeOf: ['in-person'], // 'in-person' selected by default
    visitType: ['scheduled'], // Default value
    timezone: ['1', Validators.required]
  });
  public medSettings!: IDropdownSettings;
  public assSettings!: IDropdownSettings;
  public patSettings!: IDropdownSettings;
  public timezones:any;

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.getTimeZones();
    this.medSettings = {
      singleSelection: true,
      idField: 'pid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.patSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.assSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.assignmentData = history.state.assignmentData;
    console.log(this.assignmentData);
    if (this.assignmentData) {
      console.log(this.assignmentData);
      this.assignmentForm.patchValue({
        customer_id: this.assignmentData.company_id,
        assignment_id: this.assignmentData.id,
        // medicalId: this.assignmentData.medical_team,
        medicalProfession: this.assignmentData.profession,
        // assignment: this.assignmentData.assignment,
        transaction: this.assignmentData.transaction,
        date: this.assignmentData.date,
        amount: this.assignmentData.amount,
        paymentDate: this.assignmentData.paymentdate,
        // patientId: this.assignmentData.patient,
        patientAddress: this.assignmentData.name,
        cPerson1Name: this.assignmentData.cperson1,
        cPerson1Phone: this.assignmentData.cphone1,
        cPerson2Name: this.assignmentData.cperson2,
        cPerson2Phone: this.assignmentData.cphone2,
        visitDate: this.assignmentData.fromdate,
        visitTime: this.assignmentData.time,
        visitTimeOut: this.assignmentData.timeOut,
        prNotes: this.assignmentData.ptnotes,
        pNotes: this.assignmentData.pnotes,
        iNotes: this.assignmentData.inotes,
        typeOf: this.assignmentData.typeOf,
        visitType: this.assignmentData.visitType,
        timezone: this.assignmentData.timezone
      });
    }
    // this.fetchMedicalTeams();
    this.fetchInitialData();
  }
  onItemSelect(item: any) {
    this.handleMedicalSelect(item);
  }
  public getTimeZones() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_TIMEZONE).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.timezones = res.data;
          this.assignmentForm.patchValue({
            timezone: res.data[0].id
          })
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
  onSelectAll(items: any) {}
  public fetchInitialData() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_ASSIGNMENT_INITIAL_DATA).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.assignmentsMaster = res.data.assignment;
          this.patientsMaster = res.data.patients;
          this.medicalTeams = res.data.medicalTeams;

          if (this.patientsMaster && this.assignmentData) {
            this.assignmentForm.patchValue({
              patientId: res.data.patients.filter(
                (item: any) => this.assignmentData.patient === item.id
              ),
              assignment: res.data.assignment.filter(
                (item: any) => this.assignmentData.assignment === item.id
              ),
              medicalId: res.data.medicalTeams.filter(
                (item: any) => this.assignmentData.medical_team === item.pid
              ),
            });

            let patientSelected = this.patientsMaster.find(
              (p) => p.id === this.assignmentData.patient
            );

            if (patientSelected) {
              this.assignmentForm.patchValue({
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
          this.medicalTeams = res.data;
          if (this.assignmentData) {
            this.assignmentForm.patchValue({
              medicalId: res.data.filter(
                (item: any) => this.assignmentData.medical_team === item.pid
              ),
            });
          }
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

  public handleMedicalSelect(item: any) {
    let medical = this.medicalTeams.find((medical) => medical.pid === item.pid);

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
        if (
          key !== 'medicalId' &&
          key !== 'assignment' &&
          key !== 'patientId'
        ) {
          const value = formModel[key];
          formData.append(key, value);
        }
      }
      formData.append(
        'medicalId',
        (this.assignmentForm.get('medicalId')?.value || [])
          .map((item: any) => item.pid)
          .join(',')
      );
      formData.append(
        'patientId',
        (this.assignmentForm.get('patientId')?.value || [])
          .map((item: any) => item.id)
          .join(',')
      );
      formData.append(
        'assignment',
        (this.assignmentForm.get('assignment')?.value || [])
          .map((item: any) => item.id)
          .join(',')
      );
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

  public handlePatientSelect(item: any) {
    let patient = this.patientsMaster.find((pat) => pat.id === item.id);

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

  calculateTimeDifference(): string {
    const timeIn = this.assignmentForm.get('visitTime')?.value;
    const timeOut = this.assignmentForm.get('visitTimeOut')?.value;

    if (timeIn && timeOut) {
      const [hoursIn, minutesIn] = timeIn.split(':').map(Number);
      const [hoursOut, minutesOut] = timeOut.split(':').map(Number);

      const dateIn = new Date();
      dateIn.setHours(hoursIn, minutesIn, 0, 0);

      const dateOut = new Date();
      dateOut.setHours(hoursOut, minutesOut, 0, 0);

      let diff = (dateOut.getTime() - dateIn.getTime()) / 1000 / 60; // difference in minutes

      if (diff < 0) {
        diff += 24 * 60; // Adjust for negative difference (time out on the next day)
      }

      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      return `${hours}:${minutes.toString().padStart(2, '0')}`;
    } else {
      return '';
    }
  }


  public openAddPopUpForm() {
    const dialogRef = this.dialog.open(AddFormPopupComponent, {
      width: '900px',
      height: '550px',
      data: {
        component: ADD_POPUP_COMPONENT.PATIENT,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchInitialData();
    });
  }
  public openMedicalAddPopUpForm() {
    const dialogRef = this.dialog.open(AddFormPopupComponent, {
      width: '900px',
      height: '550px',
      data: {
        component: ADD_POPUP_COMPONENT.PROFESSIONAL,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchInitialData();
    });
  }
  public onFileSelected(event: any, type: FileType) {
    const file: File = event.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (type === FileType.LICENCE || type === FileType.RESUME) {
      if (file && file.type === 'application/pdf') {
        if (fileSizeInMB > AppConstants.MAX_PDF_SIZE) {
          this.setErrorMsg(type, 'size');
          return;
        }
        this.assignmentForm.get('image')?.patchValue(file);
        this.removeErrorMsg(type);
      } else {
        this.setErrorMsg(type, 'type');
      }
    } else {
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        if (fileSizeInMB > AppConstants.MAX_JPG_SIZE) {
          this.photoError = AppConstants.SIZE_ERROR_MSG;
          return;
        }
        this.assignmentForm.get('image')?.patchValue(file);
        this.removeErrorMsg(type);
      } else {
        this.photoError = AppConstants.JPG_TYPE_ERROR_MSG;
      }
    }
  }

  private setErrorMsg(fileType: FileType, errorType: string): void {
    if (errorType == 'size') {
      this.photoError = AppConstants.SIZE_ERROR_MSG;
    }
  }

  private removeErrorMsg(fileType: FileType): void {
    this.photoError = '';
  }
}
