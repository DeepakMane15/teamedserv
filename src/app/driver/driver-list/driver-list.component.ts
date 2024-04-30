import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AssignmentStatus } from 'src/app/common/constants/AppEnum';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss',
})
export class DriverListComponent implements OnInit {
  displayedColumns: string[] = [
    'no',
    'name',
    'email',
    'mobile',
    'address',
    'action',
  ];

  showSpinner: any;
  public showSpinnner: Boolean = false;
  public originalData: any = [];
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _apiServices: ApiService, private filterService: FilterServiceService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchDrivers();
  }

  applyFilter(): void {
    this.filteredDataSource = this.filterService.applyFilter(this.dataSource.data, this.searchTerm);
  }

  fetchDrivers() {
    this.showSpinner = true;
    this._apiServices.get(APIConstant.GET_DRIVERS).subscribe(
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
    this.router.navigate(['/driver/add']);
  }

  navigateToEdit(driverData: any) {
    this.router.navigate(['/driver/edit'], {
      state: { driverData: driverData },
    });
  }
  navigateToView(driverData: any) {
    this.router.navigate(['/driver/view'], {
      state: { driverId: driverData.id, tabIndex: 0 },
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

  public refineLongText(value: string): string {
    let values = value?.split(',');

    if (values?.length > 2) return values?.splice(0, 2)?.join(',');
    return value;
  }
}
