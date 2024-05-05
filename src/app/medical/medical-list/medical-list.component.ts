import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { DELETE_TYPE } from 'src/app/common/constants/AppEnum';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';

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

  constructor(private _apiService: ApiService, private router: Router, private filterService: FilterServiceService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchMedicalTeams();
  }

  fetchMedicalTeams() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_MEDICALTEAMS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
          this.filteredDataSource = this.dataSource.data.slice();
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
    this.router.navigate(['/medical-team/add']);
  }

  applyFilter(): void {
    this.filteredDataSource = this.filterService.applyFilter(this.dataSource.data, this.searchTerm);
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

  handleDelete(pid: any) {
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
