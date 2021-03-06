import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppService } from '../app.service';
import * as globals from '../globals';

@Injectable()
export class DashboardService {
    constructor(private http: Http,
                private appService: AppService) {}

    getStatisticDetails() {
        const url = globals.home_path + 'getStatistic_detail.php';
        return this.http.get(url)
            .map(res => res.json())
            .map(items => {
                return items;
            }).toPromise();
    }

    getStatistics() {
        const url = globals.home_path + 'getStatistic.php';
        return this.http.get(url)
            .map(res => res.json())
            .map(items => {
                return items;
            }).toPromise();
    }
}
