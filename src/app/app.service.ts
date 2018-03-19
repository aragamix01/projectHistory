import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
    listKeywords = [];

    setKeywords(listKeywords: string[]) {
        this.listKeywords = listKeywords;
    }

    getKeywords() {
        return this.listKeywords;
    }
}
