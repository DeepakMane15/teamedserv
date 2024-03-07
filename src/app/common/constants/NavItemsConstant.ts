import { NavLinksModel } from '../models/NavLinksModel';
import { UserTypeConstant } from './UserTypeConstant';

export const NavItemsContant: NavLinksModel[] = [
  {
    label: 'Dashboard',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
      UserTypeConstant.PROFESSIONAL,
    ],
    category: '',
    subItems: [],
    icon: 'home',
    url: '/',
  },
  {
    label: 'Medical Team',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER_USER,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.PROFESSIONAL,
    ],
    category: '',
    subItems: [
      {
        label: 'All Medical Team',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
          UserTypeConstant.PROFESSIONAL,
        ],
        icon: '',
        url: 'medical-team',
        category: '',
        subItems: [],
      },
      {
        label: 'Add Medical Team',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        icon: '',
        url: '/medical-team/add',
        category: '',
        subItems: [],
      },
    ],
    icon: 'medication',
    url: '/',
  },
  {
    label: 'Customer/Company',
    roles: [UserTypeConstant.ADMIN],
    category: '',
    subItems: [
      {
        label: 'All Customer/Company',
        roles: [UserTypeConstant.ADMIN],
        icon: '',
        url: '/customer',
        category: '',
        subItems: [],
      },
      {
        label: 'Add Customer/Company',
        roles: [UserTypeConstant.ADMIN],
        icon: '',
        url: '/customer/add',
        category: '',
        subItems: [],
      },
    ],
    icon: 'business',
    url: '/',
  },
  {
    label: 'Patient',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
    ],
    category: '',
    subItems: [
      {
        label: 'All Patient',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        icon: '',
        url: '/patients',
        category: '',
        subItems: [],
      },
      {
        label: 'Add Patient #',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        icon: '',
        url: '/patients/add',
        category: '',
        subItems: [],
      },
    ],
    icon: 'hotel',
    url: '/',
  },
  {
    label: 'Chat',
    roles: [
      UserTypeConstant.ADMIN,  
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.PROFESSIONAL
    ],
    category: '',
    subItems: [
    ],
    icon: 'chat',
    url: '/chat',
  },
  {
    label: 'Assignment/Services #',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
    ],
    category: '',
    subItems: [
      {
        label: 'All Assignment/Services #',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        icon: '',
        url: '/assignments',
        category: '',
        subItems: [],
      },
      {
        label: 'Add Assignment/Services #',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        icon: '',
        url: '/assignments/add',
        category: '',
        subItems: [],
      },
    ],
    icon: 'assignment',
    url: '/',
  },
  {
    label: 'Manage Activities #',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
      UserTypeConstant.PROFESSIONAL,
    ],
    category: '',
    subItems: [],
    icon: 'task alt',
    url: '/',
  },

  {
    label: 'Board',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
    ],
    category: 'directory',
    subItems: [],
    icon: 'group',
    url: '/team-board',
  },
  {
    label: 'Ambulance ##',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
    category: 'directory',
    subItems: [],
    icon: 'local_car_wash',
    url: '/',
  },
  {
    label: 'Living ##',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
    category: 'directory',
    subItems: [],
    icon: 'home',
    url: '/',
  },
  {
    label: 'Job-Portal ##',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER],
    category: 'directory',
    subItems: [],
    icon: 'work',
    url: '/',
  },
];
