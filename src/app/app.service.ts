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

    onSearch(listOfWord: string[]): Promise<void> {
        return this.ctService.getTable().then(
            (value) => {
                this.startTime = performance.now();
                this.libraryWord = [];
                this.tableData = value;
                this.searchWord = listOfWord.join(' ');
                this.tableData.forEach((keyword, index) => {
                    if (listOfWord.includes(keyword.key)) {
                        if (!this.libraryWord.includes(keyword.key)) {
                            this.libraryWord.push(keyword.key);
                        }
                        keyword.ref.forEach(refKey => {
                            if (!this.libraryWord.includes(refKey)) {
                                this.libraryWord.push(refKey);
                            }
                        });
                        // this.tableData.splice(index, 1);
                    }
                });

                this.tableData.forEach((innerSearch, i) => {
                    innerSearch.ref.forEach(innerRef => {
                        if (listOfWord.includes(innerRef)) {
                            if (!this.libraryWord.includes(innerSearch.key)) {
                                this.libraryWord.push(innerSearch.key);
                            }
                            this.libraryWord = this.reverseInsert(innerSearch.key, this.libraryWord);
                            // this.tableData.splice(i, 1);
                        }
                    });
                });
                console.log(this.libraryWord);
            }
        );
    }

    reverseInsert(key: string, libWord: string[]) {
        this.tableData.forEach(element => {
            if (element.key === key) {
                element.ref.forEach(ref => {
                    if (!this.libraryWord.includes(ref)) {
                        libWord.push(ref);
                    }
                });
            }
        });
        return libWord;
    }

    splitWord(word: string) {
        const listOfWord = word.split(' ');
        return listOfWord;
    }

    setStatistic(type) {
        const url = globals.home_path + 'setStatistic.php';
        this.http.post(url, type).subscribe();
    }
}
