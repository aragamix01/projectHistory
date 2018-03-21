import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContentService {
    constructor(private http: Http) {}

    url = 'http://localhost/project/code/code/keywordTable.php?get=getKeywordTable';
    getTable() {
        return this.http.get(this.url)
            .map(res => res.json())
            .map(items => {
                return items;
            }).toPromise();
    }

    getTable2(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.url)
                .subscribe(
                    (res: Response) => {
                        resolve(res.json());
                    }
                );
        });
    }
}
