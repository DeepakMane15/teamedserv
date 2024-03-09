import { UserTypeConstant } from '../constants/UserTypeConstant';

export interface Card {
  title: string;
  cols: number;
  rows: number;
  icon: string;
}

export class Dashboard2CardsModel {
  public role: UserTypeConstant;
  public cards: {
    setOne: Card[];
  };

  constructor(role: UserTypeConstant) {
    this.role = role;
    this.cards = {
      setOne: role === UserTypeConstant.CUSTOMER ? [
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
        },
      ] : [
        {
          title: 'Employees',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-chart-areaspline widget-two-icon',
        },
        {
          title: 'Customers',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-layers widget-two-icon',
        },
        {
          title: 'Medical Teams',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-access-point-network widget-two-icon',
        },
        {
          title: 'Patients',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-account-convert widget-two-icon',
        },
      ],
    };
  }
}