import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import {
  ADD_POPUP_COMPONENT,
  FileType,
} from 'src/app/common/constants/AppEnum';
import { AddFormPopupComponent } from 'src/app/shared/dialog/add-form-popup/add-form-popup.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-living-request',
  templateUrl: './living-request.component.html',
  styleUrl: './living-request.component.scss',
})
export class LivingRequestComponent {
  public showSpinner: Boolean = false;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public timezones: any;
  public addressPredictions: any;
  public livingData!: any;
  public fieldData: any;
  public fileType = FileType;
  public photoError!: string;
  public licenceError!: string;
  public resumeError!: string;
  public fileError: boolean = false;
  public roomsMaster = [];
  public amenitiesMaster = [];

  livingForm = this.fb.group({
    id: 0,
    customer_id: 0,
    name: ['', Validators.required],
    room: [[]],
    description: ['', Validators.required],
    address: ['', Validators.required],
    fromDate: [new Date, Validators.required],
    toDate: [new Date(), Validators.required],
    patientId: [[]],
  });

  public roomSettings!: IDropdownSettings;
  public amenitySettings!: IDropdownSettings;
  public patSettings!: IDropdownSettings;
  public patientMaster: any;

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.patSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.roomSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.amenitySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.fetchRoomsMaster();
    this.fetchPatients();

    this.livingData = history.state.livingData;
    console.log(this.livingData);
    this.livingForm.patchValue({
      id: this.livingData.id,
      customer_id: this.livingData.customer_id,
      name: this.livingData.name,
      description: this.livingData.description,
      toDate: new Date(this.livingData.to_date),
      fromDate: new Date(this.livingData.from_date),
      address: this.livingData.address,
    });
  }

  fetchPatients() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_PATIENTS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.patientMaster = res.data;
          if (history.state.livingData.patient)
            this.livingForm.patchValue({
              patientId: this.patientMaster.filter(
                (p: any) => p.id === history.state.livingData.patient
              ),
            });
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  fetchRoomsMaster() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_ROOMS_MASTER).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.roomsMaster = res.data.rooms;
          this.amenitiesMaster = res.data.amenities;
          if (history.state.livingData.room_id)
            this.livingForm.patchValue({
              room: this.roomsMaster.find(
                (p: any) => p.id === history.state.livingData.room_id
              ),
            });
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
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
      this.fetchPatients();
    });
  }

  onSubmit(): void {
    if (this.livingForm.valid) {
      const formModel: any = this.livingForm.value;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        if (key !== 'patientId' && key !== 'room') {
          const value = formModel[key];
          formData.append(key, value);
        } else {
          formData.append(key, formModel[key][0].id);
        }
      }
      this.showSpinner = true;
      this._apiService
        .post(
          this.livingData
            ? APIConstant.UPADTE_LIVING_REQUEST
            : APIConstant.ADD_LIVING_REQUEST,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/medical-facility/requests']);
            } else {
              this.showSpinner = false;
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

  public handleCancel() {
    this.router.navigate(['/medical-facility/requests'], {
      state: { livingData: this.livingData },
    });
  }
  public navigateBack() {
    this.router.navigate(['/medical-facility/requests']);
  }

  onItemSelect(item: any) {
    // this.livingForm.patchValue({
    //   patientId: item.id
    // })
  }
  onSelectAll(items: any) {}
}
