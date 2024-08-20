import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '../shared/authguard/permissions.service';
import { APIConstant } from '../common/constants/APIConstant';
import { ApiService } from '../shared/services/api/api.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { PermissionsComponent } from '../customer/permissions/permissions.component';
import { CategoryRenameComponent } from '../shared/dialog/category-rename/category-rename.component';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrl: './manage-permissions.component.scss',
})
export class ManagePermissionsComponent implements OnInit {
  public showSpinner: boolean = false;
  public category: any = [];
  public permissions: any = [];

  public permissionMaster = [
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
  constructor(private _apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getCategories();
  }

  navigateToAdd() {}

  public getCategories() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_CATEGORY_PERMISSIONS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          if (res && res.status && res.data.length) {
            res.data.forEach((p: any) => {
              p.isEnabled = p.isEnabled === "1",
              p.canView = p.canView === "1",
              p.canEdit = p.canEdit === "1",
              p.canDelete = p.canDelete === "1"
            });
          }
          this.category = this.groupedData(res.data);
          // console.log(this.category);
          [];
          // this.category.map((cat: any) => {
          //   cat.permissions = this.permissionMaster;
          // } )
        } else {
          console.error('Category fetch failed');
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Category fetch failed', error);
      }
    );
  }

  public groupedData(data: any) {
    return data.reduce((acc: any, item: any) => {
      const { category_id, category_title, title, ...permissions } = item;

      // Find the category in the accumulator
      let category = acc.find(
        (group: any) => group.category_title === category_title
      );

      // If category doesn't exist, create a new one
      if (!category) {
        category = { category_id, category_title, permissions: [] };
        acc.push(category);
      }

      // Add the current item's permissions to the category
      category.permissions.push({
        title,
        permissions,
      });

      category.permissions.sort((a: any, b: any) => {
        return parseInt(a.permissions.id, 10) - parseInt(b.permissions.id, 10);
      });

      return acc;
    }, []);
  }


  public handleSave(category: any) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('permissions', JSON.stringify(category.permissions));

    this._apiService.post(APIConstant.SAVE_CATEGORY_PERMISSIONS, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.getCategories();
          this.showSpinner = false;
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

  public addNewCategory() {
    const dialogRef = this.dialog.open(PermissionsComponent, {
      data: {isNewCategory: true}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCategories();
      }
    });
  }

  public renameCategory(category: any, event: MouseEvent) {
    const dialogRef = this.dialog.open(CategoryRenameComponent, {
      data: {category: category},
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCategories();
      }
    });
  }
}
