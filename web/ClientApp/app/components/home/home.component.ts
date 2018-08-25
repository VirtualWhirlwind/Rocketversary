import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SpaceEventGroup } from '../interfaces/interfaces.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public apiURL: string = '';
    public http: Http;
    public spaceEvents: SpaceEventGroup = { previous=null, previousCount=0, current=null, currentCount=0, next=null, nextCount=0 };
    public currentDate: Date = new Date();
    public currentDateDisplay: string = 'None';
    public dateFormat: string = 'yyyy-MM-dd';
    public dateFormats: string[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
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

        this.currentDateDisplay = this.currentDate;
    }

    private getEvents() {
        this.http.get(this.apiURL + (this.currentDate.getMonth()+'/'+this.currentDate.getDay())).subscribe(result => {
            this.spaceEvents = result.json() as SpaceEventGroup;
        }, error => console.error(error));
    }

    public incrementDate() {
        this.currentDate.setDate(this.currentDate.getDate() + 1);

        this.setDate(this.currentDate);
        this.getEvents();
    }

    public decrementMonth() {
        this.currentDate.setDate(this.currentDate.getDate() - 1);

        this.setDate(this.currentDate);
        this.getEvents();
    }

    public resetMonth() {
        this.setDate();
        this.getEvents();
    }

    public setDateFormat(formatSelection: number) {
        if (formatSelection < 0 || formatSelection >= this.dateFormats.length) { formatSelection = 0; }
        this.dateFormat = this.dateFormats[formatSelection];
        this.getEvents();
    }
}
