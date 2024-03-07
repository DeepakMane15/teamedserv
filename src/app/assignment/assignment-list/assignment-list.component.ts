import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AssignmentStatus } from 'src/app/common/constants/AppEnum';
// import { AssignmentModel } from 'src/app/common/models/AssignmentModel';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.scss',
})
export class AssignmentListComponent {
  displayedColumns: string[] = [
    'no',
    'transaction',
    'patient',
    'medicalTeam',
    'entryDate',
    'visitDate',
    'amount',
    'paymentDate',
    'status',
    'action',
  ];

  showSpinner: any;
  public assignmentStatus = AssignmentStatus;

  public showSpinnner: Boolean = false;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _apiServices: ApiService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchAssignments();
  }

  fetchAssignments() {
    this.showSpinner = true;
    this._apiServices.get(APIConstant.GET_ASSIGNMENTS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
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
    this.router.navigate(['/assignments/add']);
  }

  navigateToEdit(assignmentData: SlotAssignmentMode) {
    this.router.navigate(['/assignments/edit'], {
      state: { assignmentData: assignmentData },
    });
  }
  navigateToView(assignmentData: SlotAssignmentMode) {
    this.router.navigate(['/assignments/view'], {
      state: { No: assignmentData, tabIndex: 0 },
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
