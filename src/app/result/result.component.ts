import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ResultService } from './result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers: [ResultService]
})

export class ResultComponent implements OnInit {

  listOfKeywords = [];
  listOfObjects = [];
  showObject = [];

  constructor(private appService: AppService,
              private resultService: ResultService) { }

  ngOnInit() {
    this.listOfKeywords = this.appService.getKeywords();
    this.showResult();
  }

  onSearch(search) {
    this.appService.search(search).then(
      () => {
        this.listOfKeywords = this.appService.getKeywords();
        this.showObject = [];
        this.showResult();
      }
    );
  }

  showResult() {
    this.resultService.getObjects().then((data) => {
      this.listOfObjects = data;
      if (this.listOfObjects.length > 0) {
        this.listOfObjects.forEach(object => {
          this.listOfKeywords.forEach(keyword => {
            object.keyword.forEach(objKeyword => {
              if (objKeyword === keyword) {
                object.match++;
              }
            });
          });
        });

        let max = 0;
        let lengthValue = 0;
        let manageIndex = -1;

        this.listOfObjects.length > 10 ? lengthValue = 10 : lengthValue = this.listOfObjects.length;
        for (let index = 0; index < lengthValue; index++) {
          max = 0;
          manageIndex = 0;
          this.listOfObjects.forEach((object, mIndex) => {
            if (object.match > max) {
              max = this.listOfObjects[mIndex].match;
              manageIndex = mIndex;
            }
          });

          if (this.listOfObjects[manageIndex].match > 0) {
            this.showObject.push(this.listOfObjects[manageIndex]);
            this.listOfObjects.splice(manageIndex, 1);
          }
        }
      }
    });
  }
}
