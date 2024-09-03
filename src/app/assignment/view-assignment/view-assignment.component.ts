import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrl: './view-assignment.component.scss',
})
export class ViewAssignmentComponent implements OnInit {
  public medicalData!: MedicalTeamModel;
  public assignmentData!: any;
  public apiKey = environment.googleMapsApiKey;
  public showSpinner: Boolean = false;
  columns: Boolean = true;
  defaultTabIndex!: number;
  public appConstants = AppConstants;
  public hideEdit: boolean = false;
  public MEDICAL_DOCUMENTS_URL = AppConstants.MEDICAL_DOCUMENTS_URL;
  public DEFAULT_IMG = AppConstants.DEFAULT_IMG;
  public comment: string = '';
  public stars: string[] = [];
  public isProf: boolean = false;

  displayedColumns: string[] = [
    'id',
    'User name',
    'Type',
    // 'Time Zone',
    'Branch',
    'Action',
  ];
  public medicalProfile: any = [
    {
      label: 'Transaction',
      key: 'transaction',
    },
    {
      label: 'Date',
      key: 'date',
      type: 'date',
    },
    {
      label: 'Patient',
      key: 'patient_name',
    },
    {
      label: 'Medical Team',
      key: 'medical_team_name',
    },
    {
      label: 'Profession',
      key: 'profession',
    },
    {
      label: 'Amount',
      key: 'amount',
    },
    {
      label: 'Visit Date',
      key: 'fromdate',
      type: 'date',
    },
    {
      label: 'Time In',
      key: 'time',
    },
    {
      label: 'Time Out',
      key: 'timeOut',
    },
    {
      label: 'Type Of',
      key: 'typeOf',
    },
    {
      label: 'Visit Type',
      key: 'visitType',
    },
    {
      label: 'Payment Date',
      key: 'paymentdate',
      type: 'date',
    },
    {
      label: 'Contact Person',
      key: 'cperson1',
    },
    {
      label: 'Contact Person Phone',
      key: 'cphone1',
    },
    {
      label: 'Professional Notes',
      key: 'pnotes',
    },
    {
      label: 'Patient Notes',
      key: 'ptnotes',
    },
    {
      label: 'Internal Notes',
      key: 'inotes',
    },
    {
      label: 'Patient Images',
      key: 'image',
    },
  ];

  constructor(
    private responsiveObserver: ResponsiveService,
    private _apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private _authServices: AuthService
  ) {
    this.responsiveObserver.observeResolution().subscribe((columns) => {
      this.columns = columns;
      console.log(columns);
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    console.log('first refreshed');
  }

  ngAfterViewInit() {}

  ngOnInit() {
    let userProfile = this._authServices.getUserData();
    this.isProf = userProfile.user_type === 'professional';
    this.assignmentData = history.state.assignment;
    console.log(this.assignmentData);
    this.defaultTabIndex = (history && history.state.tabIndex) || 0;
    if (!this.assignmentData) this.router.navigate(['medical-team']);

    this.hideEdit = history.state?.hideEdit ? true : false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isPageRefresh()) {
        }
      }
    });
    this.getOverallStarsRating(0);
  }

  isPageRefresh(): boolean {
    return (
      window.performance &&
      window.performance.navigation.type ===
        window.performance.navigation.TYPE_RELOAD
    );
  }

  getMapUrl(address: string | undefined) {
    const url = `https://www.google.com/maps/embed/v1/place?q=${address}&key=${this.apiKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  navigateToAddUser() {
    this.router.navigate(['customer/add-user'], {
      state: { medicalData: this.medicalData },
    });
  }
  navigateBack() {
    this.router.navigate(['assignments']);
  }

  navigateToEdit() {
    this.router.navigate(['/assignments/edit'], {
      state: { assignmentData: this.assignmentData },
    });
  }
  onModelChange(value: string) {
    if (value.length > 50) {
      this.comment = value.slice(0, 50);
    }
  }

  public getOverallStarsRating(number: number) {
    let k = 0;
    let decimalStar = number % 1;
    let realStar = number - decimalStar;
    while (k < realStar) {
      this.stars.push('star');
      k++;
    }
    if (decimalStar > 0) {
      this.stars.push('star_half');
    }
    while (this.stars.length < 5) {
      this.stars.push('star_border');
    }
  }
  public markRating(index: number) {
    let k = 0;
    while (k <= index) {
      this.stars[k] = 'star';
      k++;
    }
    while (k < 5) {
      this.stars[k] = 'star_border';
      k++;
    }
  }
  public submitComment() {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('customer_id', this.assignmentData.company_id);
    fd.append('assignment_id', this.assignmentData.id);
    fd.append('rating', this.stars.filter((s: string) => s === 'star')?.length?.toString());
    fd.append('comment', this.comment);

    this._apiService.post(APIConstant.POST_RATING, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.assignmentData.rating = this.stars.filter((s: string) => s === 'star')?.length?.toString();
          this.assignmentData.comment = this.comment;
          this.router.navigateByUrl('/assignments/view', { state: { assignment: this.assignmentData } });
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Initial Data fetch failed', error);
      }
    );
  }
}
