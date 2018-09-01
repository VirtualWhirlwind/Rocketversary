import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpaceEvent } from '../interfaces/interfaces.component';
import { BASE_URL } from '../injectables/injectables.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    public apiURL: string = '';
    public http: HttpClient;
    public spaceEvents: SpaceEvent[] = [];
    public dateFormat: string = 'yyyy-MM-dd';
    public dateFormats: string[];

    constructor(http: HttpClient, @Inject(BASE_URL) baseUrl: string) {
        this.apiURL = baseUrl + 'api/Data/SpaceEventsSearch/';
        this.http = http;

        this.dateFormats = ["yyyy-MM-dd", "MM/dd/yyyy"];
    }

    private getEvents() {

    }

    public setDateFormat(formatSelection: number) {
        if (formatSelection < 0 || formatSelection >= this.dateFormats.length) { formatSelection = 0; }
        this.dateFormat = this.dateFormats[formatSelection];
        this.getEvents();
    }

    public searchNow() {
        
    }
}
