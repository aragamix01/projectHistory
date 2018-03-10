import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
    listKeywords = [];

    setKeywords(listKeywords: string[]) {
        this.listKeywords = listKeywords;
        console.log(this.listKeywords);
    }

    getKeywords() {
        return this.listKeywords;
    }
}
