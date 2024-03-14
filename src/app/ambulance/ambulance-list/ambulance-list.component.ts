import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AssignmentStatus } from 'src/app/common/constants/AppEnum';
// import { AssignmentModel } from 'src/app/common/models/AssignmentModel';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-ambulance-list',
  templateUrl: './ambulance-list.component.html',
  styleUrl: './ambulance-list.component.scss'
})
export class AmbulanceListComponent implements OnInit{
  displayedColumns: string[] = [
    'no',
    'transaction',
    'patient',
    'medicalTeam',
    'entryDate',
    'visitDate',
    'amount',
    // 'paymentDate',
    'status',
    'action',
  ];

  showSpinner: any;
  public assignmentStatus = AssignmentStatus;
  public statusFilter: string = 'all';
  public showSpinnner: Boolean = false;
  public originalData: any = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _apiServices: ApiService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchMedtransBookings();
  }

  fetchMedtransBookings() {
    this.showSpinner = true;
    this._apiServices.get(APIConstant.GET_MEDTRANS).subscribe(
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
    this.router.navigate(['/ambulance/add']);
  }

  navigateToEdit(ambulanceData: any) {
    this.router.navigate(['/ambulance/edit'], {
      state: { ambulanceData: ambulanceData },
    });
  }
  navigateToView(ambulanceData: any) {
    this.router.navigate(['/ambulance/view'], {
      state: { ambulanceId: ambulanceData.id, tabIndex: 0 },
    });
  }

  handleDeleteAssignment(ambulanceNO: any) {
    let fd = new FormData();
    fd.append('assignment_No', ambulanceNO);
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
  public filterByStatus() {
    this.showSpinner = true;
    if (this.statusFilter === 'all') {
      this.dataSource.data = this.originalData;
      this.showSpinner = false;
      return;
    }
    let filteredData = this.originalData.filter(
      (data: any) => data.status === this.statusFilter
    );
    this.dataSource.data = filteredData;
    this.showSpinner = false;
  }

  public refineLongText(value: string): string {
    let values = value?.split(',');

    if (values?.length > 2) return values?.splice(0, 2)?.join(',');
    return value;
  }
}
