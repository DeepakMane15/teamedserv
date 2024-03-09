import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment-status-pro',
  templateUrl: './assignment-status-pro.component.html',
  styleUrl: './assignment-status-pro.component.scss'
})
export class AssignmentStatusProComponent {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['s.no.', 'Assig. id', 'date', 'status'];
}
export interface Row {
  sno: number;
  Assignid: number;
  date: Date;
  status : string;
}

const ELEMENT_DATA: Row[] = [
  { sno: 1, Assignid:1001, date: new Date(),  status: 'paid' },
  { sno: 2, Assignid:1002, date: new Date(),  status: 'pending' },
  { sno: 3, Assignid:1009, date: new Date(),  status: 'paid' },
  { sno: 4, Assignid:1029, date: new Date(),  status: 'pending' },
  // Add more orders as needed
];

