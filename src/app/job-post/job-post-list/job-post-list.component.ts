import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { DELETE_TYPE } from 'src/app/common/constants/AppEnum';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { ReadMoreComponent } from 'src/app/job-portal/read-more/read-more.component';
import { DeleteConfirmComponent } from 'src/app/shared/dialog/delete-confirm/delete-confirm.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';


@Component({
  selector: 'app-job-post-list',
  templateUrl: './job-post-list.component.html',
  styleUrl: './job-post-list.component.scss'
})
export class JobPostListComponent {
  displayedColumns: string[] = [
    'no',
    'type',
    'date',
    'start_time',
    'end_time',
    'notes',
    'action',
  ];

  showSpinner: any;
  public showSpinnner: Boolean = false;
  public originalData: any = [];
  public isMedical: boolean = false;
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _apiServices: ApiService,
    private router: Router,
    private authService: AuthService,
    private filterService: FilterServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.isMedical =
      this.authService.getUserData()?.user_type ===
      UserTypeConstant.PROFESSIONAL;
    console.log(this.authService.getUserData());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchJobPosts();
  }

  applyFilter(): void {
    this.dataSource.data = this.filterService.applyFilter(
      this.originalData,
      this.searchTerm
    );
  }

  fetchJobPosts() {
    this.showSpinner = true;
    this._apiServices.get(APIConstant.GET_JOB_POST).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
          this.originalData = res.data;
          this.filteredDataSource = this.dataSource.data.slice();
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
  navigateToAdd() {
    this.router.navigate(['/job-post/add']);
  }

  navigateToEdit(eventData: any) {
    // this.router.navigate(['/job-portal/edit'], {
    //   state: { jobData: jobData },
    // });
    console.log(eventData);
    let data = {...eventData, extendedProps: {id: eventData.id}};
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '600px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchJobPosts();
      }
    });
  }
  public getTime(date: string): string {
    const startDate = new Date(date);
        const startHours = String(startDate.getHours()).padStart(2, '0');
        const startMinutes = String(startDate.getMinutes()).padStart(2, '0');
        return `${startHours}:${startMinutes}`;
  }
  navigateToView(jobData: any) {
    this.router.navigate(['/job-portal/view'], {
      state: { jobId: jobData.id, tabIndex: 0 },
    });
  }

  handleDelete(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'Job Post' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let fd = new FormData();
        fd.append('id', id);
        fd.append('type', DELETE_TYPE.JOB_POST.toString());
        this.showSpinner = true;
        this._apiServices.post(APIConstant.COMMON_DELETE, fd).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.fetchJobPosts();
            } else {
              this.showSpinner = false;
            }
          },
          (error) => {
            this.showSpinner = false;
            console.log('Delete failed', error);
          }
        );
      }
    });
  }

  public applyJob(jid: string) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('jid', jid);
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

  public readMore(content: string) {
    const dialogRef = this.dialog.open(ReadMoreComponent, {
      width: '60%',
      maxHeight: '500',
      autoFocus: false,
      data: content,
    });
  }
}

