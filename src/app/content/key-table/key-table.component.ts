import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';
import { Http, Response } from '@angular/http';
import { KeyTableService } from './key-table.service';

@Component({
  selector: 'app-key-table',
  templateUrl: './key-table.component.html',
  styleUrls: ['./key-table.component.css'],
  providers: [ContentService, KeyTableService],
})
export class KeyTableComponent implements OnInit {

  tableData = [];
  closeResult: string;

  constructor(private ctService: ContentService,
              private kTService: KeyTableService,
              private http: Http,
            ) { }

  ngOnInit() {
    this.ctService.getTable().then(
      (data) => {
        this.tableData = data;
      }
    );
  }

  onSend() {
    this.kTService.onSend();
  }
}
