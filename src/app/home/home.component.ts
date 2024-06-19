import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {
  Card,
  DashboardCardsModel,
} from '../common/models/DashboardCardsModel';
import { DashboardCardsConstant } from '../common/constants/DashboardCardsConstant';
import { UserTypeConstant } from '../common/constants/UserTypeConstant';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { ResponsiveService } from '../shared/services/responsive/responsive.service';
import { ApiService } from '../shared/services/api/api.service';
import { APIConstant } from '../common/constants/APIConstant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  public cards: Card[] | undefined;
  public cardsSet2: Card[] | undefined;
  columns: Boolean = true;
  public userData: any;
  showSpinner: boolean = false;
  cusData!: any[];
  assignments!: any[];

  constructor(
    private responsiveObserver: ResponsiveService,
    private authService: AuthService,
    private _apiService: ApiService
  ) {
    this.responsiveObserver.observeResolution().subscribe((columns) => {
      this.columns = columns;
    });
  }
  ngOnInit() {
    this.authService.userData$.subscribe((userData) => {
      this.userData = userData;
      console.log(userData);
    });
    let role = this.authService.getUserData();
    let allCards = DashboardCardsConstant.find(
      (card) => card.role === (role.user_type === UserTypeConstant.PROFESSIONAL ? UserTypeConstant.PROFESSIONAL : UserTypeConstant.ADMIN)
    )?.cards;
    this.cards = allCards?.setOne;
    this.cardsSet2 = allCards?.setTwo;
    this.fetchCustomers();
    this.fetchAssignments();
  }

  fetchCustomers() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_CUSTOMERS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.cusData = res.data;
          this.cusData = this.cusData.slice(0,5);
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
  fetchAssignments() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_ASSIGNMENTS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.assignments = res.data;
          this.assignments = this.assignments.slice(0,5);
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
}
