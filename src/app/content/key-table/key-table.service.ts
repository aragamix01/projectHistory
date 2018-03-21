import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class KeyTableService {

    constructor(private http: Http) {}

    onSend(data: any) {
        const url = 'http://localhost/project/code/code/insertKeyTable.php';
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
