import { Component, OnInit } from '@angular/core';
import { ContentService } from './content.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ContentService]
})
export class ContentComponent implements OnInit {

  searchWord = '';
  constructor(private ctService: ContentService,
              private appService: AppService,
              private router: Router) { }

  TrueTableData = [];
  tableData = [];
  libraryWord = [];

  ngOnInit() {}

  onSearch(search) {
    this.ctService.getTable().then(
      (value) => {
        this.tableData = value;
        this.libraryWord = [];
        this.tableData.forEach((data, index) => {
          if (search.value.includes(data.key)) {
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
            if (search.value.includes(ref)) {
              if (!this.checkDuplicate(innerSearch.key)) {
                this.libraryWord.push(innerSearch.key);
              }
              this.libraryWord = this.reverseInsert(innerSearch.key, this.libraryWord);
              this.tableData.splice(i, 1);
            }
          });
        });

        console.log(this.libraryWord);
        this.appService.setKeywords(this.libraryWord);
        this.router.navigate(['result']);
      }
    );
  }

  checkDuplicate(word: string) {
    let check = false;
    this.libraryWord.forEach(element => {
      if ( element === word ) {
        check = true;
      }
    });
    return check;
  }

  reverseInsert(key: string, libWord: string[]) {
    console.log(key);
    this.tableData.forEach(element => {
      if ( element.key === key ) {
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
