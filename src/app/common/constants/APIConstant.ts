export enum APIConstant {
  LOGIN = '/login',
  IS_USERNAME_AVAILABLE = 'is-username-available',
  // customers
  GET_CUSTOMERS = 'customers',
  ADD_CUSTOMER = 'customer/add',
  DELETE_CUSTOMER = 'customer/delete',
  EDIT_CUSTOMER = 'customer/edit',
  GET_TIMEZONE = 'timezones',
  // medical-teams
  GET_MEDICALTEAMS = 'medical-teams',
  ADD_MEDICALTEAM = 'medical-team/add',
  DELETE_MEDICALTEAM = 'medical-team/delete',
  EDIT_MEDICALTEAM = 'medical-team/edit',
  APPROVE_MEDICALTEAM = 'medical-team/approve',
  GET_MEDICAL_FIELD_DATA = 'getProfessionalFieldData',
  GET_MEDICALTEAM_BY_ID = 'medical/get-medical-team-by-id',
  SEND_INVITATION = 'medical/invite-medical-team',
  VERIFY_INVITATION = 'medical-team/verify-token',
  ACCEPT_INVITATION = 'medical/change-invitation-status',

  // users
  GET_USERS = 'users',
  ADD_USER = 'user/add',
  EDIT_USER = 'user/edit',
  DELETE_USER = 'user/delete',

  // team-board
  FILTER_MEDICAL_TEAM = 'medical/filter-medical-team',
  SAVE_PAYMENT = 'medical/save-payment',

  // patients
  GET_PATIENTS = 'medical/get-patients',
  GET_ASSIGNMENTS = "GET_ASSIGNMENTS",
  GET_PATIENT_BY_ID = 'medical/get-patient-by-id',

  // Assignment
  GET_ASSIGNMENT_INITIAL_DATA = 'assignment/get-initial-data',
  ADD_ASSIGNMENT = 'assignment/add',
  EDIT_ASSIGNMENT = 'assignment/edit',


}
