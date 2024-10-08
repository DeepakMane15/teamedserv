import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { CustomerModel } from 'src/app/common/models/CustomerModel';
import { DeleteConfirmComponent } from 'src/app/shared/dialog/delete-confirm/delete-confirm.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'User name',
    'Company Name',
    // 'Time Zone',
    'Email',
    'Phone',
    'Action',
  ];
  public showSpinner: Boolean = false;
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;
  public isProf: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private filterService: FilterServiceService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    let userProfile = this.authService.getUserData();
    this.isProf = userProfile.user_type === 'professional';
    this.fetchCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(): void {
    this.filteredDataSource = this.filterService.applyFilter(
      this.dataSource.data,
      this.searchTerm
    );
  }

  fetchCustomers() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_CUSTOMERS).subscribe(
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
    this.router.navigate(['/customer/add']);
  }

  navigateToEdit(customerData: CustomerModel) {
    this.router.navigate(['/customer/edit'], {
      state: { customerData: customerData },
    });
  }
  navigateToView(customerData: CustomerModel) {
    this.router.navigate(['/customer/view'], {
      state: { customerData: customerData, hideEdit: this.isProf, tabIndex: 0 },
    });
  }

  handleDeleteCustomer(customerId: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'Customer' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let fd = new FormData();
        fd.append('customer_id', customerId);
        this.showSpinner = true;
        this._apiService.post(APIConstant.DELETE_CUSTOMER, fd).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              console.log(res.message);
              this.fetchCustomers();
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
}
