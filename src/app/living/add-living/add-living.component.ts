import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import { FileType } from 'src/app/common/constants/AppEnum';
import { DriverModel } from 'src/app/common/models/DriverModel';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-living',
  templateUrl: './add-living.component.html',
  styleUrl: './add-living.component.scss',
})
export class AddLivingComponent {
  public showSpinner: Boolean = false;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public timezones: any;
  public addressPredictions: any;
  public driverData!: any;
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
    price: ['', Validators.required],
    amenities: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    ratings: ['', Validators.required],
    images: null as File | null,
  });

  myForm!: FormGroup;

  public roomSettings!: IDropdownSettings;
  public amenitySettings!: IDropdownSettings;


  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      items: this.fb.array([
        this.fb.group({
          roomType: ['', Validators.required],
          amenities: [[], [Validators.required]],
          price: ['', Validators.required], // Nested FormArray
        }),
      ]),
    });

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

    // this.driverData = history.state.driverData;
    // this.livingForm.patchValue({
    //   id: this.driverData.id,
    //   customer_id: this.driverData.customer_id,
    //   name: this.driverData.name,
    //   rooms: this.driverData.rooms,
    //   price: this.driverData.price,
    //   address: this.driverData.address,
    // });
  }

  addItem() {
    const item = this.fb.group({
      roomType: ['', Validators.required],
      amenities: [[], [Validators.required]],
      price: ['', Validators.required]
      // Add more form controls as needed
    });

    this.items.push(item);
  }

  // Helper method to get the 'items' FormArray
  get items() {
    return this.myForm.get('items') as FormArray;
  }

  deleteItem(itemIndex: number) {
    this.items.removeAt(itemIndex);
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
    console.log(this.items.value)
    if (this.livingForm.valid) {
      const formModel: any = this.livingForm.value;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;
      this._apiService
        .post(
          this.driverData ? APIConstant.EDIT_DRIVER : APIConstant.ADD_DRIVER,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/driver']);
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

    this.livingForm.get(field)?.markAsTouched(); // Mark phone as touched
  }

  public handleCancel() {
    this.router.navigate(['living'], {
      state: { driverData: this.driverData },
    });
  }
  public navigateBack() {
    this.router.navigate(['/living']);
  }

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  public async checkUsernameAvailable(event: Event) {
    if (!this.livingForm.get('email')?.hasError('email')) {
      const inputElement = event.target as HTMLInputElement;
      let email = inputElement.value;
      try {
        this.isChecking = true;
        console.log(this.isChecking);
        const isAvailable: boolean =
          await this._authService.checkUsernameAvailable(email);
        this.isUnameAvailable = isAvailable;
        this.livingForm.get('email')?.updateValueAndValidity();
      } catch (err) {
        console.log(err);
      } finally {
        this.isChecking = false;
        console.log(this.isChecking);
      }
    }
  }

  public generateRandomPassword() {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&';

    let password = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
  public onFileSelected(event: any, type: FileType) {
    const file: File = event.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (type === FileType.LICENCE) {
      if (file && file.type === 'application/pdf') {
        if (fileSizeInMB > AppConstants.MAX_PDF_SIZE) {
          this.setErrorMsg(type, 'size');
          return;
        }
        this.livingForm.get('images')?.patchValue(file);
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
