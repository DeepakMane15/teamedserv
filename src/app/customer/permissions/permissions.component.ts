import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
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
  constructor(private _apiService: ApiService) {}
  ngOnInit() {
    this.fetchPermissions()
  }

  public handleSave() {
    // console.log(this.permissions);
    const fd = new FormData();
    fd.append('customer_id', this.customerId.toString());
    fd.append('permissions', JSON.stringify(this.permissions));

    this._apiService.post(APIConstant.SAVE_PERMISSIONS, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.fetchPermissions();
          this.showSpinner = false;
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
            p.isEnabled = p.isEnabled === "1",
            p.canView = p.canView === "1",
            p.canEdit = p.canEdit === "1",
            p.canDelete = p.canDelete === "1"
          });
          this.permissions = res.data;
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
}
