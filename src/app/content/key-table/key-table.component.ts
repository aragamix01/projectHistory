import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-key-table',
  templateUrl: './key-table.component.html',
  styleUrls: ['./key-table.component.css'],
  providers: [ContentService]
})
export class KeyTableComponent implements OnInit {

  tableData = [];

  constructor(private ctService: ContentService) { }

  ngOnInit() {
    this.ctService.getTable().then(
      (data) => {
        this.tableData = data;
      }
    );
  }

}
