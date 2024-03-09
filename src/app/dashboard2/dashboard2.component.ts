import { Component, inject, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { Dashboard2CardsModel, Card } from '../common/models/Dashboard2CardsModel';
import { UserTypeConstant } from '../common/constants/UserTypeConstant';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})
export class Dashboard2Component implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  public dashboardModel: Dashboard2CardsModel | undefined;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe((userData) => {
      const userRole: UserTypeConstant | undefined = userData?.role;
      this.dashboardModel = new Dashboard2CardsModel(userRole || UserTypeConstant.PROFESSIONAL);
      this.populateCards();
    });
  }

  populateCards() {
    if (this.dashboardModel) {
      this.dashboardModel.cards.setOne = []; // Clear existing cards
      if (this.dashboardModel.role !== UserTypeConstant.CUSTOMER) {~
        this.dashboardModel.cards.setOne.push(
          {
            title: 'Assignment completed',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-chart-areaspline widget-two-icon',
          },
          {
            title: 'No. of Comp. Enrolled',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-layers widget-two-icon',
          },
          {
            title: 'Job Openings',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-access-point-network widget-two-icon',
          },
          {
            title: 'Payments',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-account-convert widget-two-icon',
          }
        );
      } else if (this.dashboardModel.role === UserTypeConstant.CUSTOMER) {
        this.dashboardModel.cards.setOne.push(
          {
            title: 'Customers Assignment',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-chart-areaspline widget-two-icon',
          },
          {
            title: 'Orders',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-layers widget-two-icon',
          },
          {
            title: 'Products',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-access-point-network widget-two-icon',
          },
          {
            title: 'Payments',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-account-convert widget-two-icon',
          }
        );
      }
    }
  }

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
          table2: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 2, rows: 2 },
        table2: { cols: 2, rows: 2 },
      };
    })
  );
}