import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private permissions!: any[];

  constructor(private _authService: AuthService) {}

  getUserPermissions(): Observable<any[]> {
    // This should be replaced with an actual API call in a real app
    if(!this.permissions) {
      this.setUserPermissions();
    }
    return of(this.permissions);
  }

  setUserPermissions() {
    let userData = this._authService.getUserData();
    this.permissions = userData?.permissions || [];
  }

  hasPermission(title: string, action: 'canView' | 'canEdit' | 'canDelete'): Observable<boolean> {
    if(!this.permissions) {
      this.setUserPermissions();
    }
    const permission = this.permissions.find(p => p.title === title);
    return of(permission ? permission[action] === '1' : false);
  }
}
