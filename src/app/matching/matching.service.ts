import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class MatchingService {

    dataObject = [];

    constructor(private http: Http) {}

    getObject() {
        const url = 'http://localhost/project/code/code/getObjectLeftKey.php';
        return this.http.get(url)
            .map(res => res.json())
            .map(items => {
                return items;
            }).toPromise();
    }

    sendObject(data: any) {
        const url = 'http://localhost/project/code/code/matchingKeyword.php';
        return this.http.post(url, data).map(
            (res: Response) => {
                console.log(res);
            },
            (error) => {
                console.log('error');
            }
        ).toPromise();
    }

    setDataObject(data) {
        this.dataObject = data;
    }

    getDataObject() {
        return this.dataObject;
    }
}
