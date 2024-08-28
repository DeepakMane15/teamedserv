export enum APIConstant {
  LOGIN = '/login',
  IS_USERNAME_AVAILABLE = 'is-username-available',
  RESET_PASSWORD = 'medical/reset-password',
  UPLOAD_PROFILE_PICTURE = 'medical/update-picture',
  COMMON_DELETE = 'common-delete',
  // customers
  GET_CUSTOMERS = 'customers',
  GET_CUSTOMERS_BY_CATEGORY = 'customers-by-category',
  ADD_CUSTOMER = 'customer/add',
  DELETE_CUSTOMER = 'customer/delete',
  EDIT_CUSTOMER = 'customer/edit',
  GET_TIMEZONE = 'timezones',
  GET_CATEGORY = "customer/get-category-data",
  SAVE_PERMISSIONS = "permission/save",
  GET_PERMISSIONS = "permission/get",
  SAVE_CATEGORY_PERMISSIONS = "category/permission/save",
  GET_CATEGORY_PERMISSIONS = "category/permission/get",
  SAVE_NEW_CATEGORY_PERMISSIONS = "category/new",
  EDIT_CATEGORY_NAME = "category/edit",

  ADV_POST = 'adv',
  POST_MEDICAL_BANNER = 'medical/banner',

  POST_RATING = 'rating/save',
  GET_RATING = 'rating/get',
  POST_MEDICAL_RATING = 'rating/medical/save',
  GET_MEDICAL_RATING = 'rating/medical/get',
  GET_MEDICAL_RATING_BY_ID = 'rating/medical/get-by-id',

  ADD_LIVING_REQUEST = 'living-request/add',
  UPADTE_LIVING_REQUEST = 'living-request/update',
  GET_LIVING_REQUEST = 'living-request/get',
  APPLY_LIVING_REQUEST= 'living-request/apply',


  // medical-teams
  GET_MEDICALTEAMS = 'medical-teams',
  BULK_UPLOAD_MEDICALTEAMS = 'medical-team/bulk-upload',
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
  GET_PATIENT_BY_ID = 'medical/get-patient-by-id',
  ADD_PATIENT = 'patient/add',
  EDIT_PATIENT = 'patient/edit',

  // Assignment
  GET_ASSIGNMENT_INITIAL_DATA = 'assignment/get-initial-data',
  ADD_ASSIGNMENT = 'assignment/add',
  EDIT_ASSIGNMENT = 'assignment/edit',
  GET_ASSIGNMENTS = 'assignment/get',

  // MedTrans
  ADD_MEDTRANS = 'medtrans/add',
  EDIT_MEDTRANS = 'medtrans/edit',
  GET_MEDTRANS = 'medtrans/get',
  GET_MEDTRANS_BY_ID = 'medtrans/get-by-id',

  // Driver
  ADD_DRIVER = 'driver/add',
  EDIT_DRIVER = 'driver/edit',
  GET_DRIVERS = 'driver/get',
  GET_DRIVERS_BY_CUSTOMER = 'driver/get-by-customer',
  GET_DRIVER_BY_ID = 'driver/get-by-id',

  // Job Portal
  ADD_JOB_PORTAL = 'job-portal/add',
  EDIT_JOB_PORTAL = 'job-portal/edit',
  GET_JOB_PORTAL = 'job-portal/get',
  GET_JOB_PORTAL_BY_ID = 'job-portal/get-by-id',
  APPLY_JOB_OPENING = 'job-portal/apply',

  // Professional Job Post
  ADD_OR_EDIT_JOB_POST = 'medical/job-post',
  GET_JOB_POST = 'medical/job-post/get',

  // chat

  GET_PARTICIPANTS = 'medical/getParticipants',

  // living
  GET_ROOMS_MASTER = 'living/get-rooms-master',
  GET_LIVINGS = 'living/get',
  ADD_LIVING = 'living/addLiving',
  EDIT_LIVING = 'living/editLiving',
  SEARCH_LIVING = 'living/search',
  GET_LIVING_BY_ID = 'living/get-by-id',
  GET_ROOM_AMENITY = 'living/get-room-amenity',
  BOOK_LIVING = 'living/book',
}
