import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { DELETE_TYPE } from 'src/app/common/constants/AppEnum';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { DeleteConfirmComponent } from 'src/app/shared/dialog/delete-confirm/delete-confirm.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';
import { MedicalBulkUploadComponent } from '../medical-bulk-upload/medical-bulk-upload.component';

@Component({
  selector: 'app-medical-list',
  templateUrl: './medical-list.component.html',
  styleUrls: ['./medical-list.component.scss'],
})
export class MedicalListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'Name',
    'Email/Phn No',
    'Profession',
    'Languages',
    // 'Ethnicity',
    'Service_area',
    // 'Address',
    'Action',
  ];
  public deleteType = DELETE_TYPE;
  public showSpinner: Boolean = false;
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private filterService: FilterServiceService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    if (this.authService.getUserData().user_type === 'professional') {
      this.router.navigateByUrl('');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.fetchMedicalTeams();
  }

  fetchMedicalTeams() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_MEDICALTEAMS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
          this.filteredDataSource = this.dataSource.data;
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  public openBulkUpload() {
    const dialogRef = this.dialog.open(MedicalBulkUploadComponent, {
      width: '500px',
      height: '530px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result)
        this.fetchMedicalTeams();
    });
  }

  navigateToAdd() {
    this.router.navigate(['/medical-team/add']);
  }

  applyFilter(): void {
    if (this.searchTerm.length > 0) {
      this.dataSource.data = this.filterService.applyFilter(
        this.filteredDataSource,
        this.searchTerm
      );
    } else {
      this.dataSource.data = this.filteredDataSource;
    }
  }

  navigateToEdit(medicalData: MedicalTeamModel) {
    this.router.navigate(['/medical-team/edit'], {
      state: { medicalData: medicalData },
    });
  }
  navigateToView(medicalData: MedicalTeamModel) {
    this.router.navigate(['/medical-team/view'], {
      state: { pid: medicalData.pid, tabIndex: 0 },
    });
  }

  public openResetPopUp() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'Medical-Team' },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  handleDelete(pid: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'Medical-Team' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let fd = new FormData();
        fd.append('type', DELETE_TYPE.MEDICAL.toString());
        fd.append('pid', pid);
        this.showSpinner = true;
        this._apiService.post(APIConstant.COMMON_DELETE, fd).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.fetchMedicalTeams();
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
  public refineLongText(value: string): string {
    let values = value?.split(',');

    if (values?.length > 2) return values?.splice(0, 2)?.join(',');
    return value;
  }

  public approveMedicalTeam(pid: number) {
    const fd = new FormData();
    fd.append('pid', pid.toString());
    this.showSpinner = true;
    this._apiService.post(APIConstant.APPROVE_MEDICALTEAM, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.fetchMedicalTeams();
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
}
