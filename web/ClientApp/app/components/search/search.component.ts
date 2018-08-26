import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SpaceEvent } from '../interfaces/interfaces.component';

@Component({
    selector: 'search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    public apiURL: string = '';
    public http: Http;
    public spaceEvents: SpaceEvent[] = [];
    public dateFormat: string = 'yyyy-MM-dd';
    public dateFormats: string[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.apiURL = baseUrl + 'api/Data/SpaceEventsSearch/';
        this.http = http;

        this.dateFormats = ["yyyy-MM-dd", "MM/dd/yyyy"];
    }

    private getEvents() {
        /*this.http.get(this.apiURL + (this.currentMonth + 1)).subscribe(result => {
            this.spaceEvents = result.json() as SpaceEvent[];
        }, error => console.error(error));*/
    }

    public setDateFormat(formatSelection: number) {
        if (formatSelection < 0 || formatSelection >= this.dateFormats.length) { formatSelection = 0; }
        this.dateFormat = this.dateFormats[formatSelection];
        this.getEvents();
    }

    public searchNow() {
        
    }
}
