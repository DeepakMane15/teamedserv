import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConstants } from '../common/constants/AppConstants';
import { FileType } from '../common/constants/AppEnum';
import { AuthService } from '../shared/services/auth.service';
import { ApiService } from '../shared/services/api/api.service';
import { APIConstant } from '../common/constants/APIConstant';

@Component({
  selector: 'app-company-adv',
  templateUrl: './company-adv.component.html',
  styleUrl: './company-adv.component.scss',
})
export class CompanyAdvComponent implements OnInit {
  companyForm = this.fb.group({
    name: '',
    description: '',
    services: '',
    logo: null as File | null,
    banner: null as File | null,
    publish: false
  });

  public logoError!: string;
  public bannerError!: string;
  public fileError: boolean = false;
  public showSpinner: boolean = false;
  public userProfile!:any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _apiService: ApiService
  ) {}

  ngOnInit() {
    this.userProfile = this.authService.getUserData();
    console.log(this.userProfile);
    this.companyForm.patchValue({
      name: this.userProfile.company_name,
      logo: this.userProfile.logo,
      description: this.userProfile.description,
      services: this.userProfile.services,
      banner: this.userProfile.banner,
      publish: this.userProfile.publish
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const formModel: any = this.companyForm.value;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }

      formData.append('id', this.userProfile.id)

      this.showSpinner = true;
      this._apiService.post(APIConstant.ADV_POST, formData).subscribe(
        (res: any) => {
          if (res && res.status) {
            this.showSpinner = false;
            this.userProfile.banner = formData.get('banner');
            this.userProfile.description = formData.get('description');
            this.userProfile.services = formData.get('services');
            this.userProfile.logo = formData.get('logo');
            this.userProfile.publish = formData.get('publish');

            this.authService.storeUserData(this.userProfile);
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

  public onFileSelected(event: any, isLogo: boolean = false) {
    const file: File = event.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      if (fileSizeInMB > AppConstants.MAX_JPG_SIZE) {
        if(isLogo)
        this.logoError = AppConstants.SIZE_ERROR_MSG;
      else
      this.bannerError = AppConstants.SIZE_ERROR_MSG;
        return;
      }
      if (isLogo) this.companyForm.get('logo')?.patchValue(file);
      else this.companyForm.get('banner')?.patchValue(file);

      if (isLogo) this.logoError = '';
      else this.bannerError = '';
      // this.removeErrorMsg(type);
    } else {
      if (isLogo) this.logoError = AppConstants.JPG_TYPE_ERROR_MSG;
      else this.bannerError = AppConstants.JPG_TYPE_ERROR_MSG;
    }
  }
}
