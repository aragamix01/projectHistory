import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ContentService } from './content.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ContentService]
})
export class ContentComponent implements OnInit, AfterViewInit {

  searchWord = '';
  constructor(private ctService: ContentService,
              private appService: AppService,
              private router: Router) { }

  delayTime = 1000;
  libraryWord = [];

  ngOnInit() {
  }

  onSearch(search) {
    if (this.libraryWord.length > 0) {
      this.appService.onSearch(this.libraryWord).then(
        () => {
          this.router.navigate(['result']);
        }
      );
    }
  }

  ngAfterViewInit() {
    Observable
    .fromEvent(document.getElementById('input'), 'keyup')
    .debounceTime(this.delayTime)
    .distinctUntilChanged()
    .subscribe(
      (formInput: any) => {
        if (formInput.target.value !== null && formInput.target.value !== ''
          && formInput.target.value !== ' ' && !this.libraryWord.includes(formInput.target.value)) {
          this.libraryWord.push(formInput.target.value.trim());
        }
        formInput.target.value = '';
      }
    );
  }

  onDelete(index) {
    this.libraryWord.splice(index, 1);
  }
}
