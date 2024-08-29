import { NavLinksModel } from '../models/NavLinksModel';
import { UserTypeConstant } from './UserTypeConstant';

export const NavItemsContant: NavLinksModel[] = [
  // {
  //   label: 'Dashboard',
  //   roles: [
  //     UserTypeConstant.ADMIN,
  //     UserTypeConstant.CUSTOMER,
  //     UserTypeConstant.CUSTOMER_USER,
  //     UserTypeConstant.PROFESSIONAL,
  //   ],
  //   category: '',
  //   subItems: [],
  //   icon: 'home',
  //   url: '/',
  // },
  {
    label: 'User Profile',
    roles: [
      // UserTypeConstant.ADMIN,
      // UserTypeConstant.CUSTOMER,
      // UserTypeConstant.CUSTOMER_USER,
      UserTypeConstant.PROFESSIONAL,
    ],
    category: '',
    subItems: [],
    icon: 'account_circle',
    url: '/medical-team/view',
  },
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
    url: '',
  },
  {
    label: 'Job Post',
    roles: [
      UserTypeConstant.PROFESSIONAL
    ],
    category: '',
    subItems: [
      {
        label: 'All Job Posts',
        roles: [
          UserTypeConstant.PROFESSIONAL
        ],
        icon: '',
        url: 'job-post',
        category: '',
        subItems: [],
      },
      {
        label: 'Add Job Post',
        roles: [
          UserTypeConstant.PROFESSIONAL,
        ],
        icon: '',
        url: 'job-post/add',
        category: '',
        subItems: [],
      },
    ],
    icon: 'event_note',
    url: '',
  },
  {
    label: 'Customers/Companies',
    roles: [
      // UserTypeConstant.ADMIN,
      // UserTypeConstant.CUSTOMER,
      // UserTypeConstant.CUSTOMER_USER,
      UserTypeConstant.PROFESSIONAL,
    ],
    category: '',
    subItems: [],
    icon: 'business',
    url: '/customer',
  },
  {
    label: 'Medical Team',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER_USER,
      UserTypeConstant.CUSTOMER,
      // UserTypeConstant.PROFESSIONAL,
    ],
    category: '',
    subItems: [
      {
        label: 'All Medical Team',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
          // UserTypeConstant.PROFESSIONAL,
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
      {
        label: 'Medical Board',
        roles: [
          UserTypeConstant.ADMIN,
          UserTypeConstant.CUSTOMER,
          UserTypeConstant.CUSTOMER_USER,
        ],
        category: 'directory',
        subItems: [],
        icon: '',
        url: '/team-board',
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
        label: 'Add Patient',
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
    label: 'Assignments',
    roles: [
      UserTypeConstant.PROFESSIONAL,
    ],
    category: '',
    subItems: [],
    icon: 'assignment',
    url: '/assignments',
  },
  {
    label: 'Assignment/Services',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
      // UserTypeConstant.PROFESSIONAL
    ],
    category: '',
    subItems: [
      {
        label: 'All Assignment/Services',
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
        label: 'Add Assignment/Services',
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
    label: 'Driver',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER, UserTypeConstant.CUSTOMER_USER,],
    category: '',
    subItems: [
      {
        label: 'All Drivers',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER,UserTypeConstant.CUSTOMER_USER,],
        category: '',
        subItems: [],
        icon: '',
        url: '/driver',
      },
      {
        label: 'Add Driver',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER, UserTypeConstant.CUSTOMER_USER,],
        category: '',
        subItems: [],
        icon: '',
        url: '/driver/add',
      },
    ],
    icon: 'local_taxi',
    url: '',
  },
  {
    label: 'Chatting Room',
    roles: [
      UserTypeConstant.ADMIN,
      UserTypeConstant.CUSTOMER,
      UserTypeConstant.CUSTOMER_USER,
      UserTypeConstant.PROFESSIONAL,
    ],
    category: '',
    subItems: [],
    icon: 'chat',
    url: '/chat',
  },
  {
    label: 'Job-Portal',
    roles: [UserTypeConstant.PROFESSIONAL],
    category: '',
    subItems: [],
    icon: 'work',
    url: '/job-portal',
  },
  // {
  //   label: 'Manage Activities #',
  //   roles: [
  //     UserTypeConstant.ADMIN
  //   ],
  //   category: '',
  //   subItems: [],
  //   icon: 'task alt',
  //   url: '/',
  // },
  {
    label: 'Ambulance',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER,UserTypeConstant.CUSTOMER_USER,],
    category: 'directory',
    subItems: [
      {
        label: 'All Medtrans Bookings',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER,UserTypeConstant.CUSTOMER_USER,],
        category: 'directory',
        subItems: [],
        icon: '',
        url: '/ambulance',
      },
      {
        label: 'Add Medtrans Booking',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER,UserTypeConstant.CUSTOMER_USER,],
        category: 'directory',
        subItems: [],
        icon: '',
        url: '/ambulance/add',
      },
    ],
    icon: 'local_car_wash',
    url: '/',
  },
  {
    label: 'Medical Facility',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER,UserTypeConstant.CUSTOMER_USER,],
    category: 'directory',
    subItems: [
      {
        label: 'All Medical Facility',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER,UserTypeConstant.CUSTOMER_USER,],
        category: 'directory',
        subItems: [],
        icon: '',
        url: '/medical-facility',
      },
      {
        label: 'Add Medical Facility',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER, UserTypeConstant.CUSTOMER_USER,],
        category: 'directory',
        subItems: [],
        icon: '',
        url: '/medical-facility/add',
      },
      {
        label: 'All Facility Requests',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER, UserTypeConstant.CUSTOMER_USER,],
        category: 'directory',
        subItems: [],
        icon: '',
        url: '/medical-facility/requests',
      },
      {
        label: 'Add Facility Request',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER, UserTypeConstant.CUSTOMER_USER,],
        category: 'directory',
        subItems: [],
        icon: '',
        url: '/medical-facility/request/add',
      },
    ],
    icon: 'local_hospital',
    url: '/',
  },
  {
    label: 'Medical Facility Board',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER,UserTypeConstant.CUSTOMER_USER,],
    category: 'directory',
    subItems: [],
    icon: 'dashboard',
    url: '/medical-facility/board',
  },
  // {
  //   label: 'Job-Portal',
  //   roles: [UserTypeConstant.PROFESSIONAL],
  //   category: 'directory',
  //   subItems: [],
  //   icon: 'directory',
  //   url: '/job-portal',
  // },
  {
    label: 'Field Openings',
    roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER,UserTypeConstant.CUSTOMER_USER,],
    category: 'directory',
    subItems: [
      {
        label: 'All Field Openings',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER,UserTypeConstant.CUSTOMER_USER,],
        category: 'directory',
        subItems: [],
        icon: '',
        url: '/job-portal',
      },
      {
        label: 'Add Field Opening',
        roles: [UserTypeConstant.ADMIN, UserTypeConstant.CUSTOMER,UserTypeConstant.CUSTOMER_USER,],
        category: 'directory',
        subItems: [],
        icon: '',
        url: '/job-portal/add',
      },
    ],
    icon: 'work',
    url: '',
  },
  {
    label: 'Manage Company Category',
    roles: [
      UserTypeConstant.ADMIN,
    ],
    category: 'directory',
    subItems: [],
    icon: 'next_week',
    url: '/manage-permissions',
  },
  {
    label: 'Manage Users',
    roles: [
      UserTypeConstant.CUSTOMER
    ],
    category: 'directory',
    subItems: [],
    icon: 'supervisor_account',
    url: '/manage-users',
  },
];
