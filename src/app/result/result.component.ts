import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { ResultService } from './result.service';
import * as globals from '../globals';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers: [ResultService]
})

export class ResultComponent implements OnInit, AfterViewInit {

  listOfKeywords = [];
  listOfObjects = [];
  showObject = [];
  listOfSearchWords = [];
  isLike = false;
  searchKey;
  usedTime;
  pic_path = globals.pic_path;

  constructor(private appService: AppService,
              private resultService: ResultService) { }

  ngOnInit() {
    this.listOfKeywords = this.appService.getKeywords();
    this.showResult();
  }

  ngAfterViewInit() {
    Observable
    .fromEvent(document.getElementById('input'), 'keyup')
    .debounceTime(1000)
    .distinctUntilChanged()
    .subscribe(
      (formInput: any) => {
        if (formInput.target.value !== null && formInput.target.value !== ''
          && formInput.target.value !== ' ' && !this.listOfSearchWords.includes(formInput.target.value)) {
          this.listOfSearchWords.push(formInput.target.value.trim());
        }
        formInput.target.value = '';
      }
    );
  }

  async onSearch(search) {
    await this.appService.onSearch(this.listOfSearchWords);
    this.listOfKeywords = this.appService.getKeywords();
    this.showResult();
    this.isLike = false;
    this.listOfSearchWords = [];
  }

  showResult() {
    this.showObject = [];
    this.resultService.getObjects().then((data) => {
      this.listOfObjects = data;
      if (this.listOfObjects.length > 0 && this.listOfKeywords.length !== 0) {
        this.listOfObjects.forEach(object => {
          this.listOfKeywords.forEach(keyword => {
            object.keyword.forEach(objKeyword => {
              if (objKeyword === keyword) {
                object.match++;
                object.found.push(keyword);
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
        this.appService.setEndTime(performance.now());
        this.usedTime = (this.appService.getEndTime() - this.appService.getStartTime()).toFixed(0);
        if (this.usedTime != null) {
          this.resultService.setSearchStatistics(
            this.appService.getSearchWord(),
            this.usedTime,
            this.showObject.length,
          );
        }
      }
    });
  }

  setLike() {
    this.appService.setStatistic(0);
    this.isLike = true;
  }

  onDelete(index) {
    this.listOfSearchWords.splice(index, 1);
  }
}
