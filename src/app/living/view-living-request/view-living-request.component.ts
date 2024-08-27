import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StripeService } from 'src/app/shared/services/stripe/stripe.service';
import { PaymentModalComponent } from 'src/app/payment-modal/payment-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-living-request',
  templateUrl: './view-living-request.component.html',
  styleUrl: './view-living-request.component.scss'
})
export class ViewLivingRequestComponent {

  public livingData!: any;
  public apiKey = environment.googleMapsApiKey;
  public showSpinner: Boolean = false;
  public columns: Boolean = true;
  public defaultTabIndex!: number;
  public appConstants = AppConstants;
  public protectedView: boolean = false;
  public mapUrl!: SafeResourceUrl;
  public roomData: any;
  public backUrl!:string;
  public livingId!: string;

  public displayedColumns: string[] = [
    'id',
    'Name',
    'Type',
    // 'Time Zone',
    'Branch',
    'Action',
  ];
  public medicalProfile = [
    {
      label: 'Name',
      key: 'name',
      protect: false,
    },
    {
      label: 'Address',
      key: 'address',
      protect: false,
    },
    {
      label: 'Description',
      key: 'description',
      protect: false,
    },
    {
      label: 'Patient',
      key: 'patient_name',
      protect: false,
    },
    {
      label: 'Room',
      key: 'room_name',
      protect: false,
    },
    {
      label: 'From Date',
      key: 'from_date',
      protect: false,
    },
    {
      label: 'To Date',
      key: 'to_date',
      protect: false,
    },
  ];

  constructor(
    private responsiveObserver: ResponsiveService,
    private _apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private _authService: AuthService,
    public dialog: MatDialog,
    private _stripeService: StripeService
  ) {
    this.responsiveObserver.observeResolution().subscribe((columns) => {
      this.columns = columns;
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    console.log('first refreshed');
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.showSpinner = true;
    this.livingId = history.state.livingId;
    this.backUrl = history.state.backUrl || '/medical-facility/requests';
    if (this.livingId) this.fetchLivingData(this.livingId);
    if (!this.livingId) this.router.navigate(['living']);
  }

  private fetchLivingData(id: string) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('id', id);
    this._apiService.post(APIConstant.GET_LIVING_REQUEST, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.livingData = res.data;
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }
  public isPageRefresh(): boolean {
    return (
      window.performance &&
      window.performance.navigation.type ===
        window.performance.navigation.TYPE_RELOAD
    );
  }

  public getMapUrl(address: string | undefined) {
    const url = `https://www.google.com/maps/embed/v1/place?q=${address}&key=${this.apiKey}`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public navigateBack() {
    this.router.navigate([this.backUrl]);
  }

  public getValue(data: any): string {
    if (this.livingData[data.key]) {
      if (data.protect && this.protectedView) {
        return this.protectContent(this.livingData[data.key]);
      }
      return this.livingData[data.key];
    }
    return '';
  }
  private protectContent(content: string): string {
    let modifiedString = content.slice(0, 4);
    for (let i = 4; i < content.length; i++) {
      modifiedString += '*';
    }
    return modifiedString;
  }
  public getName(): string {
    return this.livingData['name'];
  }

  openDialog(): void {
    const userProfile = this._authService.getUserData();
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      data: { ...this.livingData, customerId: userProfile.customer_id },
      width: '600px', // Set width to 600 pixels
      autoFocus: false,
      // height: '800px', // Set height to 400 pixels
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.savePayment(result);
      else alert('Error: unexpected error occured');
    });
  }

  public book () {
    const fd = new FormData();
    fd.append('livingId', this.livingId)
    this._apiService.post(APIConstant.BOOK_LIVING, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          alert("Booked successfully");
          this.fetchLivingData(this.livingId);
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  public sendInvitation() {
    const fd = new FormData();
    fd.append('pid', this.livingData.pid.toString());
    fd.append('sendEmail', '1');
    this.showSpinner = true;
    this._apiService.post(APIConstant.SEND_INVITATION, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.fetchLivingData(this.livingData.pid.toString());
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  public savePayment(intent: any) {
    const fd = new FormData();
    fd.append('pid', this.livingData.pid.toString());
    fd.append('intent_id', intent.id);

    this._apiService.post(APIConstant.SAVE_PAYMENT, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.fetchLivingData(this.livingData.pid.toString());
        } else {
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log('save failed', error);
      }
    );
  }
}

