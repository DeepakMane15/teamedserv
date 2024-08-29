import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../shared/services/api/api.service';
import { APIConstant } from '../common/constants/APIConstant';
import { UserTypeConstant } from '../common/constants/UserTypeConstant';
import { Router } from '@angular/router';
import { FilterServiceService } from '../shared/services/filter-service/filter-service.service';
import { AuthService } from '../shared/services/auth.service';
import {
  UserRoleConstant,
  UserTypes,
} from '../common/constants/UserRoleConstant';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
})
export class ManageUsersComponent implements OnInit {
  userData = new MatTableDataSource<any>();
  public searchTerm: string = '';
  public filteredDataSource: any = [];

  displayedColumns: string[] = ['id', 'name', 'User name', 'Role', 'Action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public showSpinner: boolean = false;
  public userProfile: any;

  constructor(
    private _apiService: ApiService,
    private _authService: AuthService,
    private router: Router,
    private filterService: FilterServiceService
  ) {}

  ngOnInit() {
    this.userProfile = this._authService.getUserData();
    if(this.userProfile.user_type !== UserTypeConstant.CUSTOMER) {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit() {
    this.userData.paginator = this.paginator;
    this.fetchUsers();
  }

  fetchUsers() {
    let fd = new FormData();
    fd.append('customer_id', this.userProfile.id);
    this.showSpinner = true;
    this._apiService.post(APIConstant.GET_USERS, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.userData = res.data;
          this.filteredDataSource = this.userData.data;
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }
  deleteUser(userId: number) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('user_id', String(userId));
    this._apiService.post(APIConstant.DELETE_USER, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.fetchUsers();
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }
  canDeleteUser(user_type: UserTypeConstant) {
    return user_type !== UserTypeConstant.CUSTOMER;
  }
  navigateToAddUser() {
    this.router.navigate(['/manage-user/add']);
  }
  navigateToEdit(user:any) {
    this.router.navigate(['/manage-user/edit'], {
      state: { userData: user },
    });
  }
  viewUser(user: any) {
    this.router.navigate(['/manage-user/view'], {
      state: { userData: user },
    });
  }
  applyFilter(): void {
    if (this.searchTerm.length > 0) {
      this.userData.data = this.filterService.applyFilter(
        this.filteredDataSource,
        this.searchTerm
      );
    } else {
      this.userData.data = this.filteredDataSource;
    }
  }

  getRole(role: string): string {
    let types = UserTypes;
    let id = parseInt(role) as UserRoleConstant;
    let currentType = types.find((type: any) => type.id === id);
    if (currentType) {
      return currentType.name;
    }
    return '';
  }
}
