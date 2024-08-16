import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { ApiService } from 'src/app/shared/services/api/api.service';
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss',
})
export class PermissionsComponent implements OnInit {
  public showSpinner: boolean = false;
  public category: any;

  @Input() customerId!: number;
  // @Input() isNewCategory: boolean = false
  public permissions = [
    {
      title: 'Medical Team',
      isEnabled: true,
      canView: true,
      canEdit: true,
      canDelete: true,
    },
    {
      title: 'Patients',
      isEnabled: true,
      canView: true,
      canEdit: true,
      canDelete: true,
    },
    {
      title: 'Assignment',
      isEnabled: true,
      canView: true,
      canEdit: true,
      canDelete: true,
    },
    {
      title: 'Driver',
      isEnabled: true,
      canView: true,
      canEdit: true,
      canDelete: true,
    },
    {
      title: 'Chat',
      isEnabled: true,
      canView: true,
      canEdit: true,
      canDelete: true,
    },
    {
      title: 'Ambulance',
      isEnabled: true,
      canView: true,
      canEdit: true,
      canDelete: true,
    },
    {
      title: 'Medical Facilities',
      isEnabled: true,
      canView: true,
      canEdit: true,
      canDelete: true,
    },
    {
      title: 'Medical Facility Board',
      isEnabled: true,
      canView: true,
      canEdit: true,
      canDelete: true,
    },
    {
      title: 'Field Openings',
      isEnabled: true,
      canView: true,
      canEdit: true,
      canDelete: true,
    },
  ];
  public categoryName: string = '';
  constructor(
    private _apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PermissionsComponent>
  ) {}
  ngOnInit() {
    if (this.data.isNewCategory) this.fetchPermissions();
  }

  public handleSave() {
    // console.log(this.permissions);
    let apiUrl = APIConstant.SAVE_PERMISSIONS;
    const fd = new FormData();
    fd.append('permissions', JSON.stringify(this.permissions));
    if (this.data.isNewCategory) {
      fd.append('categoryName', this.categoryName);
      apiUrl = APIConstant.SAVE_NEW_CATEGORY_PERMISSIONS;
    } else {
      fd.append('customer_id', this.customerId?.toString());
    }
    this._apiService.post(apiUrl, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          if (this.data.isNewCategory) {
            this.dialogRef.close(1);
          } else {
            this.fetchPermissions();
          }
        }
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  fetchPermissions() {
    const fd = new FormData();
    fd.append('customer_id', this.customerId.toString());
    this._apiService.post(APIConstant.GET_PERMISSIONS, fd).subscribe(
      (res: any) => {
        if (res && res.status && res.data.length) {
          res.data.forEach((p: any) => {
            (p.isEnabled = p.isEnabled === '1'),
              (p.canView = p.canView === '1'),
              (p.canEdit = p.canEdit === '1'),
              (p.canDelete = p.canDelete === '1');
          });
          this.permissions = [
            ...res.data.splice(0, 1),
            ...res.data.splice(res.data.length - 1, 1),
            ...res.data.splice(0, 8),
          ];
        }
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  public handlePermissionToggle(event: MatSlideToggleChange, permission: any) {
    if (!event.checked) {
      permission.canView = false;
      permission.canEdit = false;
      permission.canDelete = false;
    }
  }

  // public getCategories() {
  //   this.showSpinner = true;
  //   this._apiService.get(APIConstant.GET_CATEGORY).subscribe(
  //     (res: any) => {
  //       if (res && res.status) {
  //         this.showSpinner = false;
  //         this.category = res.data.category;
  //         // this.subCategory = res.data['sub-category'];
  //         // this.filteredSubCat = res.data['sub-category'];
  //         this.category = res.data['category'];
  //       } else {
  //         console.error('Category fetch failed');
  //       }
  //     },
  //     (error) => {
  //       this.showSpinner = false;
  //       console.error('Category fetch failed', error);
  //     }
  //   );
  // }

  public isDisabled(): boolean {
    if (this.data.isNewCategory) {
      return !this.categoryName || this.categoryName.trim().length === 0;
    }
    return false;
  }
}
