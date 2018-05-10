import { Injectable } from '@angular/core';
import { ContentService } from './content/content.service';
import { Http, Response } from '@angular/http';
import * as globals from './globals';


@Injectable()
export class AppService {
    tableData = [];
    libraryWord = [];
    searchWord = '';
    startTime;
    EndTime;

    constructor(private ctService: ContentService,
                private http: Http) {}

    getKeywords() {
        return this.libraryWord;
    }

    getSearchWord() {
        return this.searchWord;
    }

    setEndTime(endTime) {
        this.EndTime = endTime;
    }

    getEndTime() {
        return this.EndTime;
    }

    getStartTime() {
        return this.startTime;
    }

    search(search): Promise<void> {
        this.setStatistic(1);
        return this.ctService.getTable().then(
                (value) => {
                    this.startTime = performance.now();
                    if (typeof(search) === 'string') {
                        this.searchWord = search;
                    } else {
                        this.searchWord = search.value;
                    }

                    this.tableData = value;
                    this.libraryWord = [];
                    this.tableData.forEach((data, index) => {
                        if (this.searchWord.includes(data.key)) {
                            if (!this.checkDuplicate(data.key)) {
                                this.libraryWord.push(data.key);
                            }
                            data.ref.forEach(element => {
                                if (!this.checkDuplicate(element)) {
                                    this.libraryWord.push(element);
                                }
                            });
                            this.tableData.splice(index, 1);
                        }
                    });

                    this.tableData.forEach((innerSearch, i) => {
                        innerSearch.ref.forEach(ref => {
                            if (this.searchWord.includes(ref)) {
                                if (!this.checkDuplicate(innerSearch.key)) {
                                    this.libraryWord.push(innerSearch.key);
                                }
                                this.libraryWord = this.reverseInsert(innerSearch.key, this.libraryWord);
                                this.tableData.splice(i, 1);
                            }
                        });
                    });
                }
            );
    }

    checkDuplicate(word: string) {
        let check = false;
        this.libraryWord.forEach(element => {
            if (element === word) {
                check = true;
            }
        });
        return check;
    }

    reverseInsert(key: string, libWord: string[]) {
        this.tableData.forEach(element => {
            if (element.key === key) {
                element.ref.forEach(ref => {
                    if (!this.checkDuplicate(ref)) {
                        libWord.push(ref);
                    }
                });
            }
        });
        return libWord;
    }

    setStatistic(type) {
        const url = globals.home_path + 'setStatistic.php';
        this.http.post(url, type).subscribe();
    }
}
