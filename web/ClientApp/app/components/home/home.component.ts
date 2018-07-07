import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SpaceEvent } from '../interfaces/interfaces.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public apiURL: string = '';
    public http: Http;
    public spaceEvents: SpaceEvent[] = [];
    public currentMonth: number = 0;
    public currentMonthName: string = 'None';

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.apiURL = baseUrl + 'api/Data/SpaceEventsForMonth/';
        this.http = http;

        this.setMonth();
        this.getEvents();
    }

    private setMonth(withMonth?: number) {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        if (withMonth == undefined) {
            var now = new Date();
            this.currentMonth = now.getMonth();
        }
        else if (withMonth != this.currentMonth) { this.currentMonth = withMonth; }

        this.currentMonthName = monthNames[this.currentMonth];
    }

    private getEvents() {
        this.http.get(this.apiURL + (this.currentMonth + 1)).subscribe(result => {
            this.spaceEvents = result.json() as SpaceEvent[];
        }, error => console.error(error));
    }

    public incrementMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) { this.currentMonth = 0; }

        this.setMonth(this.currentMonth);
        this.getEvents();
    }

    public decrementMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) { this.currentMonth = 11; }

        this.setMonth(this.currentMonth);
        this.getEvents();
    }

    public resetMonth() {
        this.setMonth();
        this.getEvents();
    }
}
