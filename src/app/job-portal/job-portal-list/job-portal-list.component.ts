import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-job-portal-list',
  templateUrl: './job-portal-list.component.html',
  styleUrl: './job-portal-list.component.scss',
})
export class JobPortalListComponent implements OnInit {
  displayedColumns: string[] = [
    'no',
    'title',
    'description',
    'profession',
    'applicants',
    'status',
    'action',
  ];

  showSpinner: any;
  public showSpinnner: Boolean = false;
  public originalData: any = [];
  public isMedical: boolean = false;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _apiServices: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isMedical =
      this.authService.getUserData()?.user_type ===
      UserTypeConstant.PROFESSIONAL;
      console.log(this.authService.getUserData());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchDrivers();
  }

  fetchDrivers() {
    this.showSpinner = true;
    this._apiServices.get(APIConstant.GET_JOB_PORTAL).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
          this.originalData = res.data;
          console.log(res.data);
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
  navigateToAdd() {
    this.router.navigate(['/job-portal/add']);
  }

  navigateToEdit(jobData: any) {
    this.router.navigate(['/job-portal/edit'], {
      state: { jobData: jobData },
    });
  }
  navigateToView(jobData: any) {
    this.router.navigate(['/job-portal/view'], {
      state: { jobId: jobData.id, tabIndex: 0 },
    });
  }

  handleDeleteAssignment(assignmentNO: any) {
    let fd = new FormData();
    fd.append('assignment_No', assignmentNO);
    // this.showSpinner = true;
    // this._apiServices.post(APIConstant.DELETE_CUSTOMER, fd).subscribe(
    //   (res: any) => {
    //     if (res && res.status) {
    //       this.showSpinner = false;
    //       console.log(res.message);
    //       this.fetchAssignments();
    //     } else {
    //       this.showSpinner = false;
    //     }
    //   },
    //   (error) => {
    //     this.showSpinner = false;
    //     console.log('Delete failed', error);
    //   }
    // );
  }

  public applyJob(jid: string) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('jid',jid);
    this._apiServices.post(APIConstant.APPLY_JOB_OPENING, fd).subscribe(
      (res: any) => {
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
  public refineLongText(value: string): string {
    let values = value?.split(',');

    if (values?.length > 2) return values?.splice(0, 2)?.join(',');
    return value;
  }
}
