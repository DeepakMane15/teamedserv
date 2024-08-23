import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConstants } from '../common/constants/AppConstants';
import { FileType } from '../common/constants/AppEnum';
import { AuthService } from '../shared/services/auth.service';
import { ApiService } from '../shared/services/api/api.service';
import { APIConstant } from '../common/constants/APIConstant';
import { MatDialog } from '@angular/material/dialog';
import { AdvFormPopupComponent } from '../shared/dialog/adv-form-popup/adv-form-popup.component';

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
    publish: false,
  });

  public logoError!: string;
  public bannerError!: string;
  public fileError: boolean = false;
  public showSpinner: boolean = false;
  public userProfile!: any;
  public MEDICAL_DOCUMENTS_URL = AppConstants.MEDICAL_DOCUMENTS_URL;
  public DEFAULT_IMG = AppConstants.DEFAULT_IMG;
  public servicesArray = [];
  public bannerImage: string =
    'https://publish.nstu.ru/bitrix/templates/aspro-scorp/images/small-banners-background.png';
  public logoImage: string =
    'https://media.istockphoto.com/id/1275720974/vector/blue-and-green-medical-cross-health.jpg?s=612x612&w=0&k=20&c=j322qhLcySdh7qhtlTnUf_EUzlQG2i9bnoJ3vHdJ81I=';

  public comments = [
    {
      userLogo: this.DEFAULT_IMG,
      userName: 'User One',
      commentText: 'This is the first user comment.',
      date: new Date(),
    },
    {
      userLogo: this.DEFAULT_IMG,
      userName: 'User Two',
      commentText: 'This is the second user comment.',
      date: new Date(),
    },
    {
      userLogo: this.DEFAULT_IMG,
      userName: 'User Three',
      commentText: 'This is the third user comment.',
      date: new Date(),
    },
    {
      userLogo: this.DEFAULT_IMG,
      userName: 'User Four',
      commentText: 'This is the fourth user comment.',
      date: new Date(),
    },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userProfile = this.authService.getUserData();
    console.log(this.userProfile);
    if (
      this.userProfile.banner !== null ||
      this.userProfile.banner?.trim().length > 0
    ) {
      this.bannerImage = this.MEDICAL_DOCUMENTS_URL + this.userProfile.banner;
    }
    if (
      this.userProfile.logo !== null ||
      this.userProfile.logo?.trim().length > 0
    ) {
      this.logoImage = this.MEDICAL_DOCUMENTS_URL + this.userProfile.logo;
    }
    this.servicesArray = this.userProfile.services?.split(',');
    this.companyForm.patchValue({
      name: this.userProfile.company_name,
      logo: this.userProfile.logo,
      description: this.userProfile.description,
      services: this.userProfile.services,
      banner: this.userProfile.banner,
      publish: this.userProfile.publish,
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const formModel: any = this.companyForm.value;
      const formData = new FormData();

      formData.append('id', this.userProfile.id);
      formData.append('banner', this.userProfile.banner);
      formData.append('logo', this.userProfile.logo);
      formData.append('description', this.userProfile.description);
      formData.append('services', this.userProfile.services);
      formData.append('email', this.userProfile.email);
      formData.append('services', this.userProfile.services);
      formData.append('cellphone', this.userProfile.cellphone);
      formData.append('email', this.userProfile.email);

      this.showSpinner = true;
      this._apiService.post(APIConstant.ADV_POST, formData).subscribe(
        (res: any) => {
          if (res && res.status) {
            this.showSpinner = false;
            this.userProfile.description = formData.get('description');
            this.userProfile.services = formData.get('services');
            this.servicesArray = this.userProfile.services.split(',');
            if (res.data['logo']) {
              this.userProfile.logo = res.data['logo'];
              this.logoImage = this.MEDICAL_DOCUMENTS_URL + res.data['logo'];
            }
            if (res.data['banner']) {
              this.userProfile.banner = res.data['banner'];
              this.bannerImage =
                this.MEDICAL_DOCUMENTS_URL + res.data['banner'];
            }
            this.userProfile.publish = formData.get('publish');
            this.userProfile.cellphone = formData.get('cellphone');
            this.userProfile.email = formData.get('email');

            this.authService.storeUserData(this.userProfile);
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

  public onFileSelected(event: any, isLogo: boolean = false) {
    const file: File = event.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      if (fileSizeInMB > AppConstants.MAX_JPG_SIZE) {
        if (isLogo) this.logoError = AppConstants.SIZE_ERROR_MSG;
        else this.bannerError = AppConstants.SIZE_ERROR_MSG;
        return;
      }
      if (isLogo) {
        this.companyForm.get('logo')?.patchValue(file);
        this.userProfile.logo = file;
        this.onSubmit();
      } else {
        this.userProfile.banner = file;
        this.companyForm.get('banner')?.patchValue(file);
        this.onSubmit();
      }

      if (isLogo) this.logoError = '';
      else this.bannerError = '';
      // this.removeErrorMsg(type);
    } else {
      if (isLogo) this.logoError = AppConstants.JPG_TYPE_ERROR_MSG;
      else this.bannerError = AppConstants.JPG_TYPE_ERROR_MSG;
    }
  }

  public openFormPopup(type: number) {
    const placeholder = type === 1 ? 'Enter description' : 'Enter services';
    const title =
      type === 1
        ? 'Edit Description'
        : type === 2
        ? 'Edit Services'
        : 'Edit Contact';
    const dialogRef = this.dialog.open(AdvFormPopupComponent, {
      width: '500px',
      height: '500px',
      data: {
        title: title,
        placeholder: placeholder,
        type: type,
        model:
          type === 1
            ? this.userProfile.description
            : this.userProfile.services.split(','),
        email: this.userProfile.email,
        cellphone: this.userProfile.cellphone,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        if (type === 1) {
          this.userProfile.description = result.model;
        } else if (type == 2) {
          this.userProfile.services = result.model;
        } else {
          this.userProfile.cellphone = result.cellphone;
          this.userProfile.email = result.email;
        }
        this.onSubmit();
      }
    });
  }
  public getOverallStarsRating(number: number): string[] {
    let stars = [];
    let k = 0;
    let decimalStar = number % 1;
    let realStar = number - decimalStar;
    while (k < realStar) {
      stars.push('star');
      k++;
    }
    if(decimalStar > 0) {
      stars.push('star_half');
    }
    while (stars.length < 5) {
      stars.push('star_border');
    }
    return stars;
  }
}
