import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  OnInit,
  HostListener,
} from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { APIConstant } from 'src/app/common/constants/APIConstant';
// import interactionPlugin from '@fullcalendar/';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-job-post',
  templateUrl: './add-job-post.component.html',
  styleUrls: ['./add-job-post.component.scss'],
})
export class AddJobPostComponent implements OnInit {
  @ViewChild('calendar', { static: true })
  calendarComponent!: FullCalendarComponent;
  public showSpinner: boolean = false;
  public calendarEvents: EventInput[] = [];
  public containerHeight: string = '100vh';
  constructor(public dialog: MatDialog, private _apiService: ApiService) {}

  ngOnInit() {
    this.setContainerHeight();
    this.fetchJobPosts();
    // this.showSpinner = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.setContainerHeight();
  }

  setContainerHeight(): void {
    const windowHeight = window.innerHeight;
    const headerHeight = document.querySelector('header')?.clientHeight || 0;
    const footerHeight = document.querySelector('footer')?.clientHeight || 0;
    const calculatedHeight = windowHeight - headerHeight - footerHeight;

    this.containerHeight = `${calculatedHeight}px`;
  }

  public calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    weekends: true,
    events: this.calendarEvents,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  convertToISO8601(dateStr: string): string {
    // Convert to ISO8601 format if dateStr is valid
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString();
    } else {
      console.warn('Invalid date string:', dateStr);
      return ''; // Handle invalid date string cases
    }
  }

  fetchJobPosts() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_JOB_POST).subscribe(
      (res: any) => {
        if (res.status && res.data && res.data.length) {
          const events = res.data.map((event: any) => ({
            title: event.title,
            start: this.convertToISO8601(event.start),
            end: this.convertToISO8601(event.end), // Use 'end' or 'date' based on your needs
            extendedProps: {
              notes: event.notes,
              id: event.id,
            },
          }));
          this.calendarEvents = events;
          this.calendarOptions.events = events;

          this.updateCalendar();
          this.showSpinner = false;
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
        console.error('Operation failed', error);
      }
    );
    this.showSpinner = false;
  }

  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  handleEventClick(arg: any) {
    this.handleDateClick(arg.event);
  }

  handleDateClick(eventData: EventInput | null = null) {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '600px',
      data: eventData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchJobPosts();
      }
    });
  }

  updateCalendar() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.removeAllEvents();
    calendarApi.addEventSource(this.calendarEvents);
  }

  navigateBack() {}
}
