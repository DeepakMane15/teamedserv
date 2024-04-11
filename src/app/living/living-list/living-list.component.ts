import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AssignmentStatus } from 'src/app/common/constants/AppEnum';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-living-list',
  templateUrl: './living-list.component.html',
  styleUrl: './living-list.component.scss'
})
export class LivingListComponent implements OnInit {
  displayedColumns: string[] = [
    'no',
    'name',
    'description',
    'address',
    'rooms',
    'action',
  ];

  showSpinner: any;
  public showSpinnner: Boolean = false;
  public livingData: any = [];
  public roomsMaster = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _apiServices: ApiService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchDrivers();
  }



  fetchDrivers() {
    this.showSpinner = true;
    this._apiServices.get(APIConstant.GET_LIVINGS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
          this.livingData = res.data;
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
  navigateToAdd() {
    this.router.navigate(['/living/add']);
  }

  navigateToEdit(livingData: any) {
    this.router.navigate(['/living/edit'], {
      state: { livingData: livingData },
    });
  }
  navigateToView(driverData: any) {
    this.router.navigate(['/living/view'], {
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
