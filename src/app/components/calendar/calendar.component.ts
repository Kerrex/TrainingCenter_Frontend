import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

declare var $: any;

const calendarTemplate = "<div class='clndr-controls'>" +
"<div class='clndr-control-button'>" +
    "<span class='clndr-previous-button'><i class='material-icons'>navigate_before</i></span>" +
"</div>" +
"<div class='month'><i class='material-icons'>date_range</i> <span class='selected_month'><%= month %> <%= year %></span></div>" +
"<div class='clndr-control-button rightalign'>" +
    "<span class='clndr-next-button'><i class='material-icons'>navigate_next</i></span>" +
"</div>" +
"</div>" +
"<table class='clndr-table' border='0' cellspacing='0' cellpadding='0'>" +
"<thead>" +
    "<tr class='header-days'>" +
    "<% for(var i = 0; i < daysOfTheWeek.length; i++) { %>" +
        "<td class='header-day'><%= daysOfTheWeek[i] %></td>" +
    "<% } %>" +
    "</tr>" +
"</thead>" +
"<tbody>" +
"<% for(var i = 0; i < numberOfRows; i++){ %>" +
    "<tr>" +
    "<% for(var j = 0; j < 7; j++){ %>" +
    "<% var d = j + i * 7; %>" +
        "<td class='<%= days[d].classes %>'>" +
            "<div class='day-contents'><%= days[d].day %></div>" +
        "</td>" +
    "<% } %>" +
    "</tr>" +
"<% } %>" +
"</tbody>" +
"</table>";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendar: any;
  selectedDate: Date

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('.calendar').clndr({
      template: calendarTemplate,
      showAdjacentMonths: true,
      adjacentDaysChangeMonth: false,
      clickEvents: {
        click: (target) => {
            this.setSelectedDate(target.date);
        }
      }
    });

    this.setSelectedDate(moment(new Date()));
  }

  setSelectedDate(date) {
      this.selectedDate = date.toDate();
      let formattedDate = date.format("DD.MM.YYYY");
      $('.selected-date').html(formattedDate);
  }

  showAddExerciseModal() {
      $("#modal").modal();
  }

}
