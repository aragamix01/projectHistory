import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as globals from '../globals';

@Injectable()
export class ResultService {
    constructor(private http: Http) { }

    getObjects() {
        const url = globals.home_path + 'getObjWithKeyword.php';
        return this.http.get(url)
            .map(res => res.json())
            .map(items => {
                return items;
            }).toPromise();
    }

    setSearchStatistics(searchWord, takeTime, foundObject) {
        const url = globals.home_path + 'setStatistic_detail.php';
        const data = {
            searchWord: searchWord,
            takeTime: takeTime,
            foundObject: foundObject,
        };
        return this.http.post(url, data).map(
            (res: Response) => {
                //
            },
            (error) => {
                console.log('error');
            }
        ).toPromise();
    }
}
