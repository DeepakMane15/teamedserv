import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-view-job-opening',
  templateUrl: './view-job-opening.component.html',
  styleUrl: './view-job-opening.component.scss'
})
export class ViewJobOpeningComponent implements OnInit {
  public patientData!: PatientModel;
  public apiKey = environment.googleMapsApiKey;
  public showSpinner: Boolean = false;
  columns: Boolean = true;
  defaultTabIndex!: number;
  public appConstants = AppConstants;
  public address!: string;
  public isMedical: boolean = false;

  public patientProfile: any = [
    {
      label: 'Title',
      key: 'title',
    },
    {
      label: 'Profession',
      key: 'profession_name',
    },
    {
      label: 'Service Area',
      key: 'service_area_names',
    },
    {
      label: 'Languages',
      key: 'language_names',
    },
    {
      label: 'County',
      key: 'country_names',
    },
    {
      label: 'Description',
      key: 'description',
    },
  ];



  constructor(
    private responsiveObserver: ResponsiveService,
    private _apiService: ApiService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private _apiServices: ApiService,
    private router: Router
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
    let jobId = history.state.jobId;
    if (jobId) this.fetchJobData(jobId);
    this.defaultTabIndex = (history && history.state.tabIndex) || 0;
    if (!jobId) this.router.navigate(['job-portal']);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isPageRefresh()) {
        }
      }
    });
    this.isMedical = this.authService.getUserData()?.user_type ===  UserTypeConstant.PROFESSIONAL;
  }

  private fetchJobData(jobId: string) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('job_id', jobId);
    this._apiService.post(APIConstant.GET_JOB_PORTAL_BY_ID, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.patientData = res.data;
          this.address = res.data.address;
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  isPageRefresh(): boolean {
    return (
      window.performance &&
      window.performance.navigation.type ===
        window.performance.navigation.TYPE_RELOAD
    );
  }

  public applyJob() {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('jid',this.patientData.id.toString());
    this._apiServices.post(APIConstant.APPLY_JOB_OPENING, fd).subscribe(
      (res: any) => {
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  navigateBack() {
    this.router.navigate(['job-portal']);
  }

  navigateToEdit() {
    this.router.navigate(['/job-portal/edit'], {
      state: { patientData: this.patientData },
    });
  }
}
