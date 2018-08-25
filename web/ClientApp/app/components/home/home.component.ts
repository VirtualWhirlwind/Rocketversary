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
    public spaceEvents: SpaceEventGroup = { };
    public currentDate: Date = new Date();
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
    }

    private getEvents() {
        this.http.get(this.apiURL + ((this.currentDate.getMonth()+1)+'/'+this.currentDate.getDate())).subscribe(result => {
            this.spaceEvents = result.json() as SpaceEventGroup;
        }, error => console.error(error));
    }

    public incrementDate() {
        this.currentDate.setDate(this.currentDate.getDate() + 1);

        this.setDate(this.currentDate);
        this.getEvents();
    }

    public decrementDate() {
        this.currentDate.setDate(this.currentDate.getDate() - 1);

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
