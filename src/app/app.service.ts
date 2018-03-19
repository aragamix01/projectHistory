import { Injectable } from '@angular/core';
import { ContentService } from './content/content.service';

@Injectable()
export class AppService {
    tableData = [];
    libraryWord = [];

    constructor(private ctService: ContentService) {}

    getKeywords() {
        return this.libraryWord;
    }

    search(search): Promise<void> {
        return this.ctService.getTable().then(
                (value) => {
                    const searchValue = search.value;
                    this.tableData = value;
                    this.libraryWord = [];
                    this.tableData.forEach((data, index) => {
                        if (searchValue.includes(data.key)) {
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
                            if (searchValue.includes(ref)) {
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
}
