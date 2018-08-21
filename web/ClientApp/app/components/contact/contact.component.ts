import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html'
})
export class FetchDataComponent {
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        // http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
        //     this.forecasts = result.json() as WeatherForecast[];
        // }, error => console.error(error));
    }
}
