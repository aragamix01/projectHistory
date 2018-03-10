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

  constructor(private appService: AppService,
              private resultService: ResultService) { }

  ngOnInit() {
    this.listOfKeywords = this.appService.getKeywords();
    this.resultService.getObjects().then((data) => {
      this.listOfObjects = data;
    });
  }

}
