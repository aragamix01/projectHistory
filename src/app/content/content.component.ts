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
  tableData = [];
  libraryWord = [];

  ngOnInit() {
    this.ctService.getTable().then(
      (data) => {
        this.tableData = data;
      }
    );
  }

  onSearch(search) {
    this.libraryWord = [];
    console.log(search.value);
    this.tableData.forEach(data => {
      if (search.value.includes(data.key) ) {
        data.ref.forEach(element => {
          this.libraryWord.push(element);
        });
      }
    });

    this.tableData.forEach(reversSearch => {
      reversSearch.ref.forEach(element => {
        if (search.value.includes(element)) {
          this.libraryWord.push(reversSearch.key);
        }
      });
    });

    if (this.libraryWord.length > 0) {
      this.libraryWord.forEach(data => {
        this.tableData.forEach(element => {
          if (data === element.key) {
            element.ref.forEach(word => {
              let check = false;
              this.libraryWord.forEach(foundWord => {
                if ( word === foundWord ) {
                  check = true;
                }
              });
              if (!check) {
                this.libraryWord.push(word);
              }
            });
          }
        });
      });
    }
    console.log(this.libraryWord);
    this.appService.setKeywords(this.libraryWord);
    this.router.navigate(['result']);
  }
}
