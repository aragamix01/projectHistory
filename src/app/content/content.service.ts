import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as globals from '../globals';
import 'rxjs/add/operator/map';


@Injectable()
export class ContentService {
    constructor(private http: Http) {}

    getTable() {
        const url = globals.home_path + 'keywordTable.php';
        return this.http.get(url)
            .map(res => res.json())
            .map(items => {
                return items;
            }).toPromise();
    }
}
