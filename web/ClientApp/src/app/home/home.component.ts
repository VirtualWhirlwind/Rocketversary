import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpaceEventGroup } from '../interfaces/interfaces.component';
import { BASE_URL } from '../injectables/injectables.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public apiURL: string = '';
  public http: HttpClient;
  public spaceEvents: SpaceEventGroup = { };
  public currentDate: Date = new Date();
  public dateFormat: string = 'yyyy-MM-dd';
  public dateFormats: string[];

  constructor(http: HttpClient, @Inject(BASE_URL) baseUrl: string) {
      this.apiURL = baseUrl + 'api/Data/SpaceEventsForDay/';
      this.http = http;

      this.dateFormats = ["yyyy-MM-dd", "MM/dd/yyyy"];

      this.setDate();
      this.getEvents();
  }

  private setDate(withDate?: Date) {
      if (withDate == undefined) {
          this.currentDate = new Date();
      }
      else if (withDate != this.currentDate) { this.currentDate = withDate; }
  }

  private getEvents() {
    this.http.get<SpaceEventGroup>(this.apiURL + ((this.currentDate.getMonth()+1)+'/'+this.currentDate.getDate())).subscribe(result => {
      this.spaceEvents = result;
    }, error => console.error(error));
  }

  public incrementDate() {
      var tmpDate = new Date(this.currentDate);
      tmpDate.setDate(tmpDate.getDate() + 1);
      this.currentDate = tmpDate;

      this.setDate(this.currentDate);
      this.getEvents();
  }

  public decrementDate() {
      var tmpDate = new Date(this.currentDate);
      tmpDate.setDate(tmpDate.getDate() - 1);
      this.currentDate = tmpDate;

      this.setDate(this.currentDate);
      this.getEvents();
  }

  public jumpTo(month: number, day: number) {
      this.setDate(new Date(this.currentDate.getFullYear(), month, day));
      this.getEvents();
  }

  public resetDate() {
      this.setDate();
      this.getEvents();
  }

  public setDateFormat(formatSelection: number) {
      if (formatSelection < 0 || formatSelection >= this.dateFormats.length) { formatSelection = 0; }
      this.dateFormat = this.dateFormats[formatSelection];
      this.getEvents();
  }
}
