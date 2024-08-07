import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
// import interactionPlugin from '@fullcalendar/';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-job-post',
  templateUrl: './add-job-post.component.html',
  styleUrls: ['./add-job-post.component.scss'],
})
export class AddJobPostComponent {
  @ViewChild('calendar', { static: true }) calendarComponent!: FullCalendarComponent;
  public showSpinner: boolean = false;
  calendarEvents: EventInput[] = [{ title: 'Meeting', start: new Date() }];
  constructor(public dialog: MatDialog) {}

  // Events: any[] = [
  //   {
  //     title: "Test",
  //     start: "2024-08-08"
  //   }
  // ];
  calendarOptions: CalendarOptions = {
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

  // constructor(private httpClient: HttpClient) {}

  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  handleEventClick(arg: any) {
    alert('Event clicked: ' + arg.event.title);
  }

  handleDateClick(arg: any) {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '400px',
      data: { date: arg.dateStr },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result)
        this.calendarEvents = [
          ...this.calendarEvents,
          { title: result.title, start: result.start },
        ];
        this.calendarOptions.events = this.calendarEvents;
        this.updateCalendar();
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
