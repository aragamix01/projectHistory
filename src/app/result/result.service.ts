import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ResultService {
    constructor(private http: Http) { }

    url = 'http://localhost/project/code/code/obj.php';
    getObjects() {
        return this.http.get(this.url)
            .map(res => res.json())
            .map(items => {
                return items;
            }).toPromise();
    }
}
