import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItemsContant } from './common/constants/NavItemsConstant';
import { NavLinksModel } from './common/models/NavLinksModel';
import { UserTypeConstant } from './common/constants/UserTypeConstant';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { AuthService } from './shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '250px', // Adjust this width as needed
        })
      ),
      state(
        'closed',
        style({
          width: '72px', // Adjust this width as needed
        })
      ),
      transition('open <=> closed', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  public title = 'ProfMedServices';
  public showSpinner = false;
  public userProfile: any;
  public isInvitationPage: boolean = false;
  public rid!: number;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const type = params['type'];
      this.rid = params['rid'];
      console.log(type);
      if (type && type === 'invitation') this.isInvitationPage = true;
    });
  }

  public handleLogOut() {
    this.authService.logout();
  }
  public openDocument() {
    this.router.navigate(['/document']);
  }
  public opendashboard() {
    this.router.navigate(['/dashboard2'])
  }
  public checkIsValid() {
    if (this.isInvitationPage) return true;
    this.userProfile = this.authService.getUserData();
    return !!this.userProfile && Object.keys(this.userProfile).length !== 0; // Assuming userData exists if the user is logged in
  }
  public canAccessCompany() {
    if (!this.userProfile) this.userProfile = this.authService.getUserData();
    return (
      this.userProfile.user_type === UserTypeConstant.ADMIN ||
      this.userProfile.user_type === UserTypeConstant.CUSTOMER
    );
  }
  public canAccessAccount() {
    if (!this.userProfile) this.userProfile = this.authService.getUserData();
    return this.userProfile.user_type === UserTypeConstant.PROFESSIONAL;
  }
  public onNodeClicked(node: NavLinksModel) {
    this.router.navigate([node.url]);
  }
}