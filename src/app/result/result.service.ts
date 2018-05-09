import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ResultService {
    constructor(private http: Http) { }

    getObjects() {
        const url = 'http://localhost/project/code/code/getObjWithKeyword.php';
        return this.http.get(url)
            .map(res => res.json())
            .map(items => {
                return items;
            }).toPromise();
    }

    setSearchStatistics(searchWord, takeTime, foundObject) {
        const url = 'http://localhost/project/code/code/setStatistic_detail.php';
        const data = {
            searchWord: searchWord,
            takeTime: takeTime,
            foundObject: foundObject,
        };
        console.log(data);
        return this.http.post(url, data).map(
            (res: Response) => {
                console.log(res);
            },
            (error) => {
                console.log('error');
            }
        ).toPromise();
    }
}
