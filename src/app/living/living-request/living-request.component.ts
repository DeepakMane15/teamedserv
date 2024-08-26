import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import { ADD_POPUP_COMPONENT, FileType } from 'src/app/common/constants/AppEnum';
import { AddFormPopupComponent } from 'src/app/shared/dialog/add-form-popup/add-form-popup.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-living-request',
  templateUrl: './living-request.component.html',
  styleUrl: './living-request.component.scss'
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
    // rooms: this.fb.array([this.createRoom()]),
    items: this.fb.array([
      this.fb.group({
        roomType: ['', Validators.required]
      }),
    ]),
    description: ['', Validators.required],
    address: ['', Validators.required],
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required],
    patientId: [[]]
  });

  selectedFiles: File[] = [];

  myForm = this.fb.group({
    items: this.fb.array([
      this.fb.group({
        roomType: ['', Validators.required],
        amenities: [[], [Validators.required]],
        price: ['', Validators.required], // Nested FormArray
      }),
    ]),
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
      // items: this.livingData.rooms,
      address: this.livingData.address,
    });
  }

  addItem() {
    const item = this.fb.group({
      roomType: ['', Validators.required],
      amenities: [[], [Validators.required]],
      price: ['', Validators.required],
      // Add more form controls as needed
    });

    this.items.push(item);
  }

  // Helper method to get the 'items' FormArray
  get items() {
    return this.livingForm.get('items') as FormArray;
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

  deleteItem(itemIndex: number) {
    this.items.removeAt(itemIndex);
  }
  fetchPatients() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_PATIENTS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.patientMaster = res.data;
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
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  onSubmit(): void {
    console.log(this.livingForm.value);
    console.log(this.items.value);
    if (this.livingForm.valid) {
      const formModel: any = this.livingForm.value;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        if (key !== 'items') {
          const value = formModel[key];
          formData.append(key, value);
        }
      }
      formData.append('items', JSON.stringify(this.livingForm.get('items')?.value))
      this.showSpinner = true;
      this._apiService
        .post(
          this.livingData ? APIConstant.EDIT_LIVING : APIConstant.ADD_LIVING,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/medical-facility']);
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
    this.router.navigate(['living'], {
      state: { livingData: this.livingData },
    });
  }
  public navigateBack() {
    this.router.navigate(['/medical-facility']);
  }

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  public onFileSelected(event: any, type: FileType) {
    const file: File = event.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (type === FileType.LICENCE) {
      if (file && file.type === 'application/pdf') {
        if (fileSizeInMB > AppConstants.MAX_PDF_SIZE) {
          this.setErrorMsg(type, 'size');
          return;
        }
        const files: FileList = event.target.files;
        this.selectedFiles = [];
        for (let i = 0; i < files.length; i++) {
          this.selectedFiles.push(files[i]);
        }

        this.removeErrorMsg(type);
      } else {
        this.setErrorMsg(type, 'type');
      }
    }
  }

  private setErrorMsg(fileType: FileType, errorType: string): void {
    if (errorType == 'size') {
      if (fileType === FileType.LICENCE) {
        this.licenceError = AppConstants.SIZE_ERROR_MSG;
      } else {
        this.photoError = AppConstants.SIZE_ERROR_MSG;
      }
    } else if ((errorType = 'type')) {
      if (fileType === FileType.LICENCE) {
        this.licenceError = AppConstants.PDF_TYPE_ERROR_MSG;
      } else {
        this.resumeError = AppConstants.PDF_TYPE_ERROR_MSG;
      }
    }
  }

  private removeErrorMsg(fileType: FileType): void {
    switch (fileType) {
      case FileType.LICENCE: {
        this.licenceError = '';
        break;
      }
      case FileType.PHOTO: {
        this.photoError = '';
        break;
      }
      case FileType.RESUME: {
        this.resumeError = '';
        break;
      }
      default:
        break;
    }
  }
}

