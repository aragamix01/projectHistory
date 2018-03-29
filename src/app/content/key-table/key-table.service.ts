import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class KeyTableService {

    id: number;
    data = [];
    constructor(private http: Http) {}

    onInsert(data: any) {
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

    onDelete(id: number) {
        const url = 'http://localhost/project/code/code/deleteKeyTable.php';
        return this.http.post(url, id).map(
            (res: Response) => {
                console.log(res);
            },
            (error) => {
                console.log('error');
            }
        ).toPromise();
    }

    setValueToEdit(id: number, data: any) {
        this.id = id;
        this.data = data;
    }

    getValueToEdit() {
        return this.data[this.id];
    }
}
