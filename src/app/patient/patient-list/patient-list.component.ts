import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent {
  displayedColumns: string[] = ['id', 'Name', 'Address', 'Phone No', 'Action'];
  public showSpinner: Boolean = false;
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _apiService: ApiService, private filterService: FilterServiceService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchPatients();
  }

  applyFilter(): void {
    this.filteredDataSource = this.filterService.applyFilter(this.dataSource.data, this.searchTerm);
  }

  fetchPatients() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_PATIENTS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
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
    this.router.navigate(['/patients/add']);
  }

  navigateToEdit(patientData: PatientModel) {
    this.router.navigate(['/patients/edit'], {
      state: { patientData: patientData },
    });
  }
  navigateToView(patientData: PatientModel) {
    this.router.navigate(['/patients/view'], {
      state: { id: patientData.id, tabIndex: 0 },
    });
  }
  handleDeletePatient(patientId: any) {
    let fd = new FormData();
    fd.append('patient_id', patientId);
    this.showSpinner = true;
    this._apiService.post(APIConstant.DELETE_CUSTOMER, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          console.log(res.message);
          this.fetchPatients();
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
}
