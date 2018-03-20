import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class KeyTableService {

    constructor(private http: Http) {}

    onSend() {
        const sData = {
            key: 'ดินเผา',
            ref: ['แดง', 'ดิน', 'เครื่องปั้น'],
        };
        const url = 'http://localhost/project/code/code/recieve.php';
        return this.http.post(url, sData).map(
            (res: Response) => {
                console.log(res.json());
            },
            (error) => {
                console.log('error');
            }
        ).toPromise();
    }

}
